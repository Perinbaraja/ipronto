import { supabase } from "../utils/supabaseClient";

export const searchMasterEventsQuery = async (params: any) => {
  let query = supabase
    .from("event_listings")
    .select("*", { count: "exact" });

  // Search
  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,address.ilike.%${params.search}%,categories.ilike.%${params.search}%`
    );
  }

  // Categories
  if (params.categories?.length > 0) {
    query = query.filter("category_ids", "cs", params.categories);
  }

  // Price range
  if (params.priceRange.length === 2) {
    query = query
      .gte("min_cost", params.priceRange[0])
      .lte("max_cost", params.priceRange[1]);
  }

  // Date range
  if (params.fromDate && params.toDate) {
    query = query
      .gte("start_time", params.fromDate)
      .lte("start_time", params.toDate);
  }

  // Destination ID
  if (params.destinationId) {
    query = query.eq("destination_id", params.destinationId);
  }

  // Geo filter — ST_DWithin via RPC
  if (params.location?.lat && params.location?.lng) {
    const { data, error } = await supabase.rpc("events_nearby", {
      lat: params.location.lat,
      lng: params.location.lng,
      radius: 50 * 1609.34, // 50 miles for now
      offset: params.offset,
      limit: params.limit
    });

    if (error) throw error;
    return data;
  }

  // Pagination
  query = query
    .order("start_time", { ascending: true })
    .range(params.offset, params.offset + params.limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  return { rows: data, total: count };
};
