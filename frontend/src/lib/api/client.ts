const BASE_URL = "https://ipronto.onrender.com/api";

export async function apiClient<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  console.log("API Response Status:", res);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
