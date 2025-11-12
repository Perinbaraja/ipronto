// types/events.ts

export interface Category {
  category_id: string;
  name: string;
  image: string;
  color_code: string;
  dev_image: string;
  event_count: number;
  counts: number;
}

export interface Personalised {
  category_id: string;
  name: string;
  image: string;
  dev_image: string;
  counts: number;
}

export interface CategoriesResponse {
  outing_count: number;
  destination_count: number;
  experience_count: number;
  event_count: number;
  categories: Category[];
  personalised: Personalised[];
}
