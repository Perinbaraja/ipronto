// src/responses/SearchMasterEventsResponse.ts

export interface EventRecord {
  event_master_id: number;
  event_number: string;
  stadium: string;
  name: string;
  start_time: string;
  end_time: string;
  date: string;
  vanity_url: string;
  web_url: string;
  trip_count: number;
  currency: string;
  source: string;

  isfavorites?: number;
  isgoing?: number;
  is_liked?: number;
  is_select?: number;

  event_images: string | null;
  categories: string;
  category_ids: string;
  destination_name: string;

  min_cost: number;
  max_cost: number;

  city: string | null;
  state: string | null;
  country: string | null;

  location_lat_long: string;
  timezone: string | null;
}

export class SearchMasterEventsResponse {
  searchResult: any[] = [];
  minAndMaxDate: any[] = [];
  categoryInfo: string | number = "";

  constructor(masterEvents: EventRecord[] | null, categoryInfo: string | number = "") {
    this.categoryInfo = categoryInfo;
    // console.log("Category Info:", this.categoryInfo);
    // Handle case where masterEvents might be wrapped in an object
    let events: EventRecord[] = [];
    let minAndMaxDate: any = null;

    if (masterEvents) {
      if (Array.isArray(masterEvents)) {
        events = masterEvents;
        minAndMaxDate = (masterEvents as any)["minAndMaxDate"];
      } else if (typeof masterEvents === "object" && !Array.isArray(masterEvents)) {
        // Try common response wrapper keys
        events = (masterEvents as any).rows || (masterEvents as any).data || (masterEvents as any).events || [];
        minAndMaxDate = (masterEvents as any).minAndMaxDate;
      }
    }

    if (!events || events.length === 0) return;

    // helpers
    const pad = (n: number) => String(n).padStart(2, "0");
    const normalizeDateTime = (val: any) => {
      if (val == null || val === "") return null;
      if (typeof val === "string") {
        // convert '2025-11-13T16:00:00' -> '2025-11-13 16:00:00'
        const m = val.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?)/);
        if (m) {
          let time = m[2];
          if (time.split(":").length === 2) time += ":00";
          return `${m[1]} ${time}`;
        }
        const d = new Date(val);
        if (!isNaN(d.getTime())) {
          const y = d.getFullYear(),
            mo = pad(d.getMonth() + 1),
            day = pad(d.getDate()),
            hh = pad(d.getHours()),
            mm = pad(d.getMinutes()),
            ss = pad(d.getSeconds());
          return `${y}-${mo}-${day} ${hh}:${mm}:${ss}`;
        }
        return val;
      }
      if (val instanceof Date) {
        const y = val.getFullYear(), mo = pad(val.getMonth() + 1), day = pad(val.getDate()),
          hh = pad(val.getHours()), mm = pad(val.getMinutes()), ss = pad(val.getSeconds());
        return `${y}-${mo}-${day} ${hh}:${mm}:${ss}`;
      }
      return String(val);
    };

    const normalizeDateOnly = (val: any) => {
      const dt = normalizeDateTime(val);
      if (!dt) return null;
      const m = dt.match(/^(\d{4}-\d{2}-\d{2})/);
      return m ? m[1] : dt.split(" ")[0];
    };

    const normalizeTimezone = (tz: any) => {
      if (!tz) return null;
      if (typeof tz === "string") {
        if (tz === "null" || tz === "{}" || tz.trim() === "") return null;
        try { const parsed = JSON.parse(tz); if (typeof parsed === "object" && Object.keys(parsed).length === 0) return null; } catch {}
        return tz;
      }
      if (typeof tz === "object") return Object.keys(tz).length === 0 ? null : tz;
      return tz;
    };

    const mapEvent = (event: any) => {
      const imagesRaw = event.event_images ?? event.images ?? event.image ?? [];
      const images = Array.isArray(imagesRaw)
        ? imagesRaw.map((i: any) => (i === "null" ? null : i))
        : typeof imagesRaw === "string" && imagesRaw !== ""
        ? imagesRaw.split?.(",").filter(Boolean)
        : imagesRaw ? [imagesRaw] : [];

      const cats = event.categories ? (Array.isArray(event.categories) ? event.categories : String(event.categories).split(",").filter(Boolean)) : [];
      const catIds = event.category_ids ? (Array.isArray(event.category_ids) ? event.category_ids : String(event.category_ids).split(",").filter(Boolean)) : [];
      const destNames = event.destination_name ? (Array.isArray(event.destination_name) ? event.destination_name : String(event.destination_name).split(",").filter(Boolean)) : [];

      const startRaw = event.start_time ?? event.startTime ?? event.startTimeLocal ?? event.startTimeISO;
      const endRaw = event.end_time ?? event.endTime ?? event.endTimeISO;

      const item: any = {
        id: event.id ?? event.event_master_id ?? event.event_id ?? null,
        eventNumber: event.event_number ?? event.eventNumber ?? null,
        stadium: event.stadium ?? null,
        name: event.name ?? null,
        startTime: normalizeDateTime(startRaw),
        endTime: normalizeDateTime(endRaw),
        date: normalizeDateOnly(startRaw) ?? event.date ?? null,
        vanityUrl: event.vanity_url ?? event.vanityUrl ?? null,
        web_url: event.web_url ?? event.webUrl ?? null,
        tripCount: event.trip_count ?? event.tripCount ?? 1,
        currency: event.currency ?? null,
        initial_currency: (event as any).initial_currency ?? null,
        source: event.source ?? null,
        isFavourite: Boolean(event.isfavorites || event.is_favourite),
        isGoing: Boolean(event.isgoing || event.is_going),
        supplier_vanity_url: (event as any).supplier_vanity_url ?? null,
        supplier_id: (event as any).supplier_id ?? null,
        supplier_company_name: (event as any).supplier_company_name ?? null,
        images,
        categories: cats,
        categoriesTags: event.categoriesTags ?? [],
        category_ids: catIds,
        destination_name: destNames,
        pickupPointPriceRange: event.pickupPointPriceRange ?? {
          minpickupprice: event.min_cost ?? event.minpickupprice ?? null,
          maxpickupprice: event.max_cost ?? event.maxpickupprice ?? null
        },
        address: event.address ?? null,
        locationLatLng: event.location_lat_long ? (String(event.location_lat_long).split(",").map((s: string)=>s.trim())) : (event.locationLatLng ?? []),
        timezone: normalizeTimezone(event.timezone ?? event.tz ?? null),
        is_liked: event.is_liked && event.is_liked > 0 ? 1 : 0,
        is_select: event.is_select && event.is_select > 0 ? 1 : 0
      };
      return item;
    };

    // Prepare input variants
    let eventsInput: any = masterEvents;
    if (!eventsInput) return;

    // If input already grouped (has minAndMaxDate and other category keys)
    const isGroupedInput = typeof eventsInput === "object" && !Array.isArray(eventsInput) && ("minAndMaxDate" in eventsInput || Object.keys(eventsInput).some(k=>k !== "searchResult" && k !== "minAndMaxDate" && k !== "categoryInfo"));
    if (isGroupedInput) {
      // map each category key
      Object.keys(eventsInput).forEach((k) => {
        if (k === "minAndMaxDate") return;
        // keep counters like whatsnew_count/upcomingEvents_count on top-level
        if (k.endsWith("_count")) {
          (this as any)[k] = eventsInput[k];
          return;
        }
        const grp = eventsInput[k];
        console.log("Mapping group for key:", grp);
        if (!grp || !grp.searchResult) return;
        const mapped = (grp.searchResult || []).map(mapEvent);
        (this as any)[k] = {
          searchResult: mapped,
          minAndMaxDate: grp.minAndMaxDate ?? [],
          categoryInfo: grp.categoryInfo ?? grp.category_info ?? grp.category ?? k
        };
      });
      // Remove top-level container props so only category keys remain
      delete (this as any).searchResult;
      delete (this as any).minAndMaxDate;
      delete (this as any).categoryInfo;
      return;
    }

    // fallback: array of events -> produce grouped output (top-level minAndMaxDate + per-category keys)
    // compute date list (we won't keep it at top-level)
    const allDates: string[] = [];
    events.forEach((ev: any) => {
      const d = normalizeDateOnly(ev.start_time ?? ev.startTime ?? ev.date);
      if (d) allDates.push(d);
    });

    // group by first category label (fallback to category_id or 'unknown')
    const groups: Record<string, { label: string; rows: any[] }> = {};
    const slugFor = (label: string) =>
      String(label || "unknown").toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "") || "unknown";
const labelFor = (event: any) => {
  const categoryIds = event.category_ids;

  // If it's an array → return the first one
  if (Array.isArray(categoryIds) && categoryIds.length > 0) {
    return String(categoryIds[0]).trim();
  }

  // If it's a comma-separated string → return the first one
  if (typeof categoryIds === "string" && categoryIds.trim() !== "") {
    return categoryIds.split(",")[0].trim();
  }

  return "unknown";
};

    events.forEach((ev: any) => {
      const mapped = mapEvent(ev);
      const label = labelFor(ev);
      const slug = slugFor(label);
      if (!groups[slug]) groups[slug] = { label: label || slug, rows: [] };
      groups[slug].rows.push(mapped);
    });

    // attach each group as top-level key
    Object.keys(groups).forEach((slug) => {
      console.log("Processing group slug:", slug);
      const g = groups[slug];
      (this as any)[slug] = {
        searchResult: g.rows,
        minAndMaxDate: [],
        categoryInfo: g.label
      };
        const countKey = `${slug}_count`;
  (this as any)[countKey] = g.rows.length;
    });

    
    // Remove top-level container props so only category keys remain
    delete (this as any).searchResult;
    delete (this as any).minAndMaxDate;
    delete (this as any).categoryInfo;
  }
}
