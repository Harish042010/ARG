/**
 * api.ts
 * Central API client for ARG Academy.
 * All requests go through here so the base URL is configured in one place.
 *
 * LOCAL:  VITE_API_URL is not set → falls back to http://localhost:5000/api
 * RENDER: Set VITE_API_URL=https://your-server.onrender.com/api in Render env vars
 */

const BASE = (import.meta.env.VITE_API_URL as string) || 'https://argtest.onrender.com';

/** Helper: get auth token from sessionStorage */
const getToken = (): string | null =>
  sessionStorage.getItem('adminToken') || sessionStorage.getItem('parentToken');

/** Generic fetch wrapper with JSON handling */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'API Error');
  }
  return res.json();
}

export const api = {
  get:    <T>(ep: string)              => request<T>(ep),
  post:   <T>(ep: string, body: unknown) => request<T>(ep, { method: 'POST',   body: JSON.stringify(body) }),
  put:    <T>(ep: string, body: unknown) => request<T>(ep, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: <T>(ep: string)              => request<T>(ep, { method: 'DELETE' }),
};

export default api;
