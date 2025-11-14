import { apiClient } from "./client";
import { ApiResponse } from "@/types/events";

export const fetchEvents = (): Promise<ApiResponse> => {
  return apiClient<ApiResponse>("/mock.json");
};
