    export interface MapApiResponse {
  total: number;
  all: {
    searchResult: MapItems[];
  };
}

export interface MapItems {
  eventId: string;
  destinationId: string;
  destinationName: string;
  destinationAddress: string;
  name: string;
  description: string;
  eventTime: string;
  eventEndTime: string;
  eventDate: string;
  address: string;
  locationLatLng: [string, string]; // [lat, lng]
  timezone: string;

  categories: string[];
  category_ids: string[];
  categoriesTags: string[];

  color_code: string; // comma-separated like "#1809ad,#ff0000,#ff00ff"
  svg_img: string;    // comma-separated URLs
}
