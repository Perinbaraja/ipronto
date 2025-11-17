import { apiClient } from "./client";
import { ApiResponse, SearchAllPayload } from "@/types/events";

export const fetchEvents = (payload: SearchAllPayload): Promise<ApiResponse> => {
  const query = new URLSearchParams(
    Object.entries(payload).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  return apiClient<ApiResponse>(`/v3/events/searchAll?${query}`);
};
