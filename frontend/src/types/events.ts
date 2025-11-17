export interface PickupPointPriceRange {
  minpickupprice: string | number;
  maxpickupprice: string | number;
}

export interface Timezone {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
}

export interface ApiEvent {
  id: string;
  eventNumber: string;
  stadium: string | null;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
  vanityUrl: string;
  web_url: string | null;
  tripCount: number;
  currency: string;
  initial_currency: string;
  source: string;
  isFavourite: boolean;
  isGoing: boolean;
  supplier_vanity_url: string | null;
  supplier_id: string | null;
  supplier_company_name: string | null;
  images: string[];
  categories: string[];
  categoriesTags: any[];
  category_ids: string[];
  destination_name: string[];
  pickupPointPriceRange: PickupPointPriceRange;
  address: string;
  locationLatLng: string[];
  timezone: string | null | Timezone;
  is_liked: number;
  is_select: number;
}

export interface CategoriesData {
  searchResult: ApiEvent[];
  minAndMaxDate: any[];
  categoryInfo: string;
}

export interface ApiResponse {
  categories: CategoriesData;
}

export interface SearchAllPayload{
  city?: string;
  location?: string;
  nearBy?: string;
  searchText?: string;
  fromDate?: string;
  landingPage?: string;
  categories?: string[]; 
  destinationId?: string;
  limit?: number;
  page?: number;
  bounds?: string;
  priceRange?: string;
  createdSince?: string;
  upcomingEvents?: number;
}