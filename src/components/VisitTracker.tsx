'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

let visitId: number | null = null;

export function VisitTracker() {
  const pathname = usePathname();
  const tracked = useRef<string>('');

  useEffect(() => {
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    const payload: any = {
      page: pathname,
      referrer: document.referrer || undefined,
      user_agent: navigator.userAgent,
    };

    fetch('/api/visits/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json().then((d) => { visitId = d.id; }).catch(() => {}))
      .catch(() => {});

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (visitId) {
            fetch(`/api/visits/${visitId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                latitude: pos.coords.latitude.toString(),
                longitude: pos.coords.longitude.toString(),
              }),
            }).catch(() => {});
          }
        },
        () => {},
        { timeout: 10000, enableHighAccuracy: false },
      );
    }
  }, [pathname]);

  return null;
}
