/**
 * Client helper: leads are sent through the server route /api/lead,
 * which formats the message and posts it to the Telegram leads channel.
 * The bot token never reaches the browser.
 */
export type LeadPayload = {
  kind?: "lead" | "vacancy";
  name: string;
  phone: string;
  course?: string;
  branch?: string;
  question?: string;
  position?: string;
  experience?: string;
  source?: string;
  lang?: string;
  website?: string;
};

export async function sendLead(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return data.ok ? { success: true } : { success: false, error: data.error || `HTTP ${r.status}` };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
