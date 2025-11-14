import { apiClient } from "./client";
import { CategoriesResponse } from "@/types/categories";

export const fetchCategories = (): Promise<CategoriesResponse> => {
  return apiClient<CategoriesResponse>("/categories.json");
};
