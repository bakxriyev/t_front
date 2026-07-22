import axios from 'axios';

const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(`API Error: ${err.config?.url}`, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export async function fetchData<T>(endpoint: string): Promise<T[]> {
  const res = await api.get(endpoint);
  const data = res.data.data || res.data;
  return Array.isArray(data) ? data : [];
}

export async function fetchSingle<T>(endpoint: string): Promise<T | null> {
  const res = await api.get(endpoint);
  return res.data.data || res.data || null;
}

export async function getImageUrl(path?: string | null): Promise<string> {
  if (!path) return '/images/placeholder.svg';
  if (path.startsWith('http')) return path;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';
  return `${baseUrl}${path}`;
}

export default api;
