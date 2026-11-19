
import { SEED_ENDPOINTS } from "./endpoints";

const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || "https://b.tashkentlawschool.uz").replace(/\/$/, "");

/**
 * Fetches the public site content on the server so pages arrive with data already in the HTML
 * (no loading flashes, good SEO). Cached for 60 s — admin edits appear within a minute.
 * Any endpoint that fails or times out is simply left out and fetched in the browser instead.
 */
export async function getInitialData(): Promise<Record<string, unknown>> {
  const entries = await Promise.all(
    SEED_ENDPOINTS.map(async (ep) => {
      try {
        const r = await fetch(`${API_ORIGIN}${ep}`, {
          next: { revalidate: 60 },
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(3500),
        });
        if (!r.ok) return [ep, null] as const;
        return [ep, await r.json()] as const;
      } catch {
        return [ep, null] as const;
      }
    }),
  );
  return Object.fromEntries(entries.filter(([, v]) => v !== null));
}
