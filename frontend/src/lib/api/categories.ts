import { apiClient } from "./client";
import { CategoriesResponse } from "@/types/categories";

// export const fetchCategories = (): Promise<CategoriesResponse> => {
//   return apiClient<CategoriesResponse>("/categories.json");
// };

export const fetchCategories = (): Promise<CategoriesResponse> => {
  const res = fetch("/categories.json");
  return res.then((response) => response.json());
}