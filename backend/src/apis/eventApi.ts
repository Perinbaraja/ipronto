import { formatDateTime } from "../utils/formatDate";
import { supabase } from "../utils/supabaseClient";

export const searchMasterEventsQuery = async (params: any, getAllEvents = false) => {
  try {
    if (params.grouped) {
      const groupsRequested: { key: string; label?: string }[] =
        params.groupCategories?.map((k: any) => (typeof k === "string" ? { key: k, label: k } : k)) ??
        (params.categories ? params.categories.map((c: any) => ({ key: c, label: c })) : [
        ]);

      const result: any = {};
      const allDates: string[] = [];

      // helper to fetch a group by overriding params and disabling grouped mode
      const fetchGroup = async (override: any) => {
        const groupRows = await searchMasterEventsQuery({ ...params, ...override, grouped: false }, true);
        // collect date strings for min/max calculation
        (groupRows || []).forEach((r: any) => {
          const d = r.start_time ?? r.startTime ?? r.date;
          if (d) {
            const isoDate = String(d).split(" ")[0]; // assume mapper normalizes; keep YYYY-MM-DD prefix
            allDates.push(isoDate);
          }
        });
        // Limit to 20 results per group
        return (groupRows || []).slice(0, 20);
      };

      // fetch category groups
      for (const g of groupsRequested) {
        const rows = await fetchGroup({ categories: [g.key] });
        const slug = String(g.key).toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "") || String(g.key);
        result[slug] = {
          searchResult: rows,
          minAndMaxDate: [],
          categoryInfo: g.label ?? g.key
        };
      }

      // optional special groups
      if (params.includeUpcoming || params.includeGroups?.includes?.("upcomingEvents")) {
        const upcomingDays = params.upcomingDays ?? params.upcomingEvents ?? 7;
        const rows = await fetchGroup({ upcomingEvents: upcomingDays });
        result["upcomingEvents"] = { searchResult: rows, minAndMaxDate: [], categoryInfo: "upcomingEvents" };
        result["upcomingEvents_count"] = (rows || []).length;
      }

      if (params.includeWhatsnew || params.includeGroups?.includes?.("whatsnew")) {
        // requires params.whatsnew date or fallback to 30 days ago
        const whatsnewSince = params.whatsnew ?? new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
        const rows = await fetchGroup({ whatsnew: whatsnewSince });
        result["whatsnew"] = { searchResult: rows, minAndMaxDate: [], categoryInfo: "whatsnew" };
        result["whatsnew_count"] = (rows || []).length;
      }

      if (params.includeLiked || params.includeGroups?.includes?.("liked")) {
        if (!params.userId) {
          // cannot fetch liked without userId; return empty group
          result["liked"] = { searchResult: [], minAndMaxDate: [], categoryInfo: "liked" };
        } else {
          const rows = await fetchGroup({ tag: "liked", userId: params.userId });
          result["liked"] = { searchResult: rows, minAndMaxDate: [], categoryInfo: "liked" };
        }
      }

      // compute global min/max date (YYYY-MM-DD) if we collected any dates
      if (allDates.length) {
        allDates.sort();
        result.minAndMaxDate = [{ min: allDates[0], max: allDates[allDates.length - 1] }];
      } else {
        result.minAndMaxDate = [];
      }

      return result;
    }

    // base query
    let query = supabase.from("event_listings").select("*");

    // supplierName -> resolve supplier id if possible
    if (params.supplierName) {
      const { data: supplierData } = await supabase
        .from("suppliers")
        .select("id")
        .eq("supplier_vanity_url", params.supplierName)
        .limit(1);
      if (supplierData?.[0]?.id) {
        query = query.eq("supplier_id", supplierData[0].id);
      }
    }

    // source
    if (params.source) query = query.eq("source", params.source);

    // currentLocation / bounds -> prefer RPC for radius, fallback to lat/lng bounds
    if (params.currentLocation?.lat && params.currentLocation?.lng) {
      // use RPC to get nearby events (server-side geospatial)
      const { data, error } = await supabase.rpc("events_nearby", {
        lat: params.currentLocation.lat,
        lng: params.currentLocation.lng,
        radius: (params.radius || 50) * 1609.34,
        offset: params.offset || 0,
        limit: getAllEvents ? 1000 : params.limit || 20
      });
      if (error) throw error;
      return data || [];
    }

    if (params.bounds) {
      try {
        const b = typeof params.bounds === "string" ? JSON.parse(params.bounds) : params.bounds;
        const boundZoom = b.boundZoom || 0;
        if (boundZoom > 1 && b.lngW != null && b.lngE != null && b.latS != null && b.latN != null) {
          let minLan = parseFloat(b.lngW);
          let maxLan = parseFloat(b.lngE);
          let minLat = parseFloat(b.latS);
          let maxLat = parseFloat(b.latN);
          if (minLat > maxLat) {
            const t = minLat; minLat = maxLat; maxLat = t;
          }
          query = query.gte("latitude", minLat).lte("latitude", maxLat);
          if (minLan > maxLan) {
            // crosses antimeridian -> notBetween
            // supabase/PostgREST doesn't have whereNotBetween helper, emulate via or: longitude <= maxLan OR longitude >= minLan
            query = query.or(`longitude.lte.${maxLan},longitude.gte.${minLan}`);
          } else {
            query = query.gte("longitude", minLan).lte("longitude", maxLan);
          }
        }
      } catch (e) {
        // ignore malformed bounds
      }
    }

    // categories
    if (params.categories && Array.isArray(params.categories) && params.categories.length > 0) {
      if (params.categories.length === 1) {
        query = query.ilike("category_ids", `%${params.categories[0]}%`);
      } else {
        // approximate multi-category by OR ilike clauses
        const orClauses = params.categories.map((c: string) => `category_ids.ilike.%${c}%`).join(",");
        query = query.or(orClauses);
      }
    }

    // tag / landingPage -> filter by category_tags via join approximation using event_master_category_tags table
    if (params.tag || params.landingPage || params.subCategory) {
      if (Array.isArray(params.tag)) {
        const { data: emIds } = await supabase
          .from("event_master_category_tags")
          .select("event_master_id")
          .in("category_tag_id", params.tag);
        const ids = emIds?.map((r: any) => r.event_master_id) ?? [];
        if (ids.length) query = query.in("event_master_id", ids);
        else return [];
      } else if (params.tag && (params.tag === "liked" || params.tag === "selected")) {
        // will handle later with user likes/selects filter
      } else if (params.landingPage || params.subCategory) {
        const tagId = params.landingPage ?? params.subCategory;
        const { data: emIds } = await supabase
          .from("event_master_category_tags")
          .select("event_master_id")
          .eq("category_tag_id", tagId);
        const ids = emIds?.map((r: any) => r.event_master_id) ?? [];
        if (ids.length) query = query.in("event_master_id", ids);
        else return [];
      }
    }

    // search textual fields
    if (params.search) {
      const q = params.search.replace(/'/g, "''");
      query = query.or(
        `name.ilike.%${q}%,address.ilike.%${q}%,taxonomy.ilike.%${q}%,categories.ilike.%${q}%,category_tags.ilike.%${q}%,performer_name.ilike.%${q}%`
      );
    }

    // tourOperator
    if (params.tourOperator) query = query.eq("supplier_vanity_url", params.tourOperator);

    // whatsnew -> filter by event_master created_at (requires join to event_master)
    if (params.whatsnew) {
      // get event_master ids created after whatsnew timestamp
      const { data: masters } = await supabase
        .from("event_master")
        .select("id")
        .gt("created_at", params.whatsnew);
      const ids = masters?.map((m: any) => m.id) ?? [];
      if (ids.length) query = query.in("event_master_id", ids);
      else return [];
    }

    // upcomingEvents -> apply when param is present and non-empty (accept numbers or numeric strings, e.g. 7 or "7")
    // if (params.upcomingEvents !== undefined && params.upcomingEvents !== null && String(params.upcomingEvents).trim() !== "") {
    //   const days = Number(params.upcomingEvents);
    //   if (!isNaN(days) && days >= 0) {
    //     const now = new Date();
    //     const then = new Date(now);
    //     then.setDate(now.getDate() + days);
    //     query = query.gte("start_time", now.toISOString()).lte("end_time", then.toISOString());
    //   }
    // }
    
    // fromDate/toDate
    if (params.fromDate) {
      console.log("Applying fromDate/toDate filter:", formatDateTime(params.fromDate), formatDateTime(params.toDate));
      query = query.gte("start_time", formatDateTime(params.fromDate)).lte("end_time", formatDateTime(params.toDate));
    }

    // destinationId, eventMasterId, eventDate
    if (params.destinationId) query = query.eq("destination_id", params.destinationId);
    if (params.eventMasterId) query = query.eq("id", params.eventMasterId);
    if (params.eventDate) {
      // PostgREST doesn't provide whereDate; filter by start_time date range of that day
      const d = new Date(params.eventDate);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
      query = query.gte("start_time", start).lt("end_time", end);
    }

    // priceRange: emulate PHP logic by checking overlapping ranges
    if (params.priceRange && Array.isArray(params.priceRange) && params.priceRange.length === 2) {
      const min = Number(params.priceRange[0]);
      const max = Number(params.priceRange[1]);
      // Due to limitation of single whereRaw in supabase client, use or of three clauses
      query = query.or(
        `and(min_cost.lte.${min},max_cost.gte.${max}),and(min_cost.gte.${min},min_cost.lte.${max}),and(max_cost.gte.${min},max_cost.lte.${max})`
      );
    }

    // tag filters liked/selected -> filter by user_likes/user_selects presence
    // if (params.tag === "liked" && params.userId) {
    //   const { data: likes } = await supabase
    //     .from("user_likes")
    //     .select("event_master_id")
    //     .eq("user_id", params.userId);
    //   const likedIds = likes?.map((l: any) => l.event_master_id) ?? [];
    //   if (likedIds.length) query = query.in("event_master_id", likedIds);
    //   else return [];
    // } else if (params.tag === "selected" && params.userId) {
    //   const { data: selects } = await supabase
    //     .from("user_selects")
    //     .select("event_master_id")
    //     .eq("user_id", params.userId);
    //   const selIds = selects?.map((s: any) => s.event_master_id) ?? [];
    //   if (selIds.length) query = query.in("event_master_id", selIds);
    //   else return [];
    // }

    // ensure min_cost > 0 per PHP
    query = query.gt("min_cost", 0);

    // ordering and pagination
    query = query.order("start_time", { ascending: true });
    if (!getAllEvents) {
      const offset = params.offset || 0;
      const limit = 200;
      query = query.range(offset, offset + limit - 1);
    } else {
      query = query.limit(2000);
    }
console.log("Executing query :", query);
    const { data, error } = await query;
    if (error) throw error;
    console.log("Final data:", data);
    return data || [];
  } catch (error) {
    console.error("searchMasterEventsQuery error:", error);
    throw error;
  }
};
