"use client";

import { useState } from "react";
import { ArrowRight, Banknote, Briefcase, CheckCircle2, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, isActive, pick, useList, type Vacancy } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Modal } from "@/components/ui/Modal";
import { sendLead } from "@/lib/telegram";

function typeLabel(type: string, t: ReturnType<typeof useLanguage>["t"]) {
  const k = type?.toLowerCase();
  if (k === "full_time") return t.vac_full_time;
  if (k === "part_time") return t.vac_part_time;
  if (k === "remote") return t.vac_remote;
  if (k === "contract") return t.vac_contract;
  return type;
}

export function Vacancies() {
  const { lang, t } = useLanguage();
  const { data } = useList<Vacancy>(API.vacancies);
  const list = data.filter(isActive);
  const [sel, setSel] = useState<Vacancy | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", exp: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  if (!list.length) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sel || form.name.trim().length < 2 || form.phone.replace(/\D/g, "").length < 9) return;
    setStatus("sending");
    const r = await sendLead({
      kind: "vacancy",
      name: form.name.trim(),
      phone: form.phone.trim(),
      position: pick(sel, "title", "UZ"),
      experience: form.exp.trim(),
      source: "vacancy",
      lang,
    });
    setStatus(r.success ? "ok" : "error");
    if (r.success) window.setTimeout(() => { setSel(null); setStatus("idle"); setForm({ name: "", phone: "", exp: "" }); }, 2000);
  };

  return (
    <section id="vacancies" className="section">
      <div className="shell">
        <SectionHeading eyebrow={t.vac_eyebrow} title={t.vac_title} sub={t.vac_sub} />
        <Stagger className="grid gap-4 md:grid-cols-2">
          {list.map((v) => (
            <StaggerItem key={v.id}>
              <div className="card card-hover spot flex h-full flex-col p-5 sm:p-6">
                <div className="relative z-[2] flex items-start gap-4">
                  <span className="icon-tile h-12 w-12"><Briefcase className="relative h-5 w-5" /></span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">{pick(v, "title", lang)}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold">
                      {v.type && <span className="rounded-full bg-wine-500/20 px-3 py-1 text-wine-400">{typeLabel(v.type, t)}</span>}
                      {v.salary && <span className="inline-flex items-center gap-1 rounded-full bg-gold-400/15 px-3 py-1 text-gold-300"><Banknote className="h-3.5 w-3.5" />{v.salary}</span>}
                    </div>
                  </div>
                </div>
                {pick(v, "description", lang) && <p className="relative z-[2] mt-5 whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">{pick(v, "description", lang)}</p>}
                {pick(v, "requirements", lang) && (
                  <div className="relative z-[2] mt-4 rounded-2xl bg-white/[.05] p-4 text-sm">
                    <p className="font-bold text-white">{t.vac_requirements}</p>
                    <p className="mt-1 whitespace-pre-line text-ink-soft">{pick(v, "requirements", lang)}</p>
                  </div>
                )}
                <button type="button" onClick={() => setSel(v)} className="btn btn-wine btn-sm relative z-[2] mt-6 self-start">
                  {t.vac_apply}<ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Modal open={!!sel} onClose={() => { setSel(null); setStatus("idle"); }} label={t.vac_apply}>
        {sel && (
          <div className="p-7 sm:p-9">
            <span className="eyebrow">{t.vac_apply}</span>
            <h3 className="mt-4 pr-10 font-display text-2xl font-semibold">{pick(sel, "title", lang)}</h3>
            {status === "ok" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-14 w-14 text-gold-500" />
                <p className="mt-4 font-display text-xl font-semibold">{t.form_success_title}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div><label className="field-label" htmlFor="vac-name">{t.form_name}</label><input id="vac-name" className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="field-label" htmlFor="vac-phone">{t.form_phone}</label><input id="vac-phone" type="tel" className="input" required placeholder="+998" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                <div><label className="field-label" htmlFor="vac-exp">{t.vac_experience}</label><textarea id="vac-exp" rows={4} className="input resize-none" placeholder={t.vac_experience_ph} value={form.exp} onChange={(e) => setForm({ ...form, exp: e.target.value })} /></div>
                {status === "error" && <p className="rounded-xl bg-wine-500/15 px-4 py-3 text-sm font-medium text-wine-400">{t.form_error}</p>}
                <button type="submit" disabled={status === "sending"} className="btn btn-gold w-full">
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {status === "sending" ? t.form_sending : t.form_submit}
                </button>
              </form>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
