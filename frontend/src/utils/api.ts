import { CategoriesResponse } from "@/types/categories";
import { ApiResponse } from "@/types/events";

export async function fetchEvents(): Promise<ApiResponse> {
  const res = await fetch("/mock.json");

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  const data: ApiResponse = await res.json();
  return data;
}


export async function fetchCategories():Promise<CategoriesResponse>{
  const res = await fetch("/categories.json");

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }
  const data: CategoriesResponse = await res.json();
  return data;
}