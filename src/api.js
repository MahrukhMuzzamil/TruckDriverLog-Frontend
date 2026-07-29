import axios from "axios";

// Same-origin `/api` by default (Vite dev proxy + nginx in Docker Compose).
// On Vercel, VITE_API_URL points at the deployed backend.
const baseURL = import.meta.env.VITE_API_URL || "/api";

const client = axios.create({ baseURL, timeout: 60000 });

export async function planTrip(payload) {
  const { data } = await client.post("/trips/", payload);
  return data;
}

export async function suggestLocations(query) {
  const { data } = await client.get("/geocode/suggest/", { params: { q: query } });
  return data.results || [];
}

export function extractErrorMessage(error) {
  const data = error?.response?.data;
  if (data?.detail) return data.detail;
  if (data && typeof data === "object") {
    const first = Object.values(data)[0];
    if (Array.isArray(first)) return first[0];
    if (typeof first === "string") return first;
  }
  if (error?.code === "ECONNABORTED") return "The request timed out. Please try again.";
  return "Could not reach the server. Please try again.";
}
