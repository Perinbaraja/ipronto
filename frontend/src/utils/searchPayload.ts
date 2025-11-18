import { SearchAllPayload } from "@/types/events";

const buildSearchPayload = (params: any): SearchAllPayload => ({
  city: params.city || "",
  searchText: params.searchText || "",
  location: "",
  nearBy: "",
  fromDate: "",
  toDate: "",
  landingPage: "",
  categories: [],
  destinationId: "",
  limit: 20,
  page: 0,
  bounds: "",
  priceRange: "",
  createdSince: "",
  upcomingEvents: 7,
});

const buildQueryString = (params: SearchAllPayload) => {
  const query = new URLSearchParams({
    city: params.city || "",
    searchText: params.searchText || "",
    nearBy: params.nearBy || "",
    fromDate: params.fromDate || "",
    toDate: params.toDate || "",
    landingPage: params.landingPage || "",
    categories: "",
    destinationId: params.destinationId || "",
    limit: String(params.limit ?? ""),
    page: String(params.page ?? ""),
    bounds: params.bounds || "",
    priceRange: params.priceRange || "",
    createdSince: params.createdSince || "",
    upcomingEvents: String(params.upcomingEvents ?? ""),
  });

  return `/?${query.toString()}`;
};
export { buildSearchPayload, buildQueryString };