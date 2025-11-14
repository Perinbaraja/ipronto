export async function apiClient<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
