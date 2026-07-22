'use client';

import { useState, useEffect } from 'react';
import { fetchData, fetchSingle } from '@/lib/api-client';

export function useApiData<T>(endpoint: string | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    fetchData<T>(endpoint)
      .then((res) => { if (!cancelled) setData(res); })
      .catch(() => { if (!cancelled) setData([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading };
}

export function useApiSingle<T>(endpoint: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) { setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    fetchSingle<T>(endpoint)
      .then((res) => { if (!cancelled) setData(res); })
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading };
}
