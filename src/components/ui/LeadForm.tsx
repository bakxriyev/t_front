"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, User, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { API, pick, postJSON, tr, useList, type Course } from "@/lib/content";
import { BRANCHES } from "@/lib/constants";
import { sendLead } from "@/lib/telegram";

/**
 * Formats the local part of an Uzbek number as "XX XXX XX XX".
 * "+998" is a fixed prefix shown outside the input, so the caret can never land
 * in front of it. A pasted full number (+998…, 998…) is accepted as well.
 */
function formatLocal(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length > 9 && d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(" ");
}

export function LeadForm({
  dark = false,
  initialCourseId,
  withQuestion = false,
  minimal = false,
  onDone,
  source = "website",
}: {
  dark?: boolean;
  initialCourseId?: string | number | null;
  withQuestion?: boolean;
  /** name + phone only (Instagram landing page) */
  minimal?: boolean;
  onDone?: () => void;
  source?: string;
}) {
  const { lang, t } = useLanguage();
  const { data: courses } = useList<Course>(API.courses);
  const [name, setName] = useState("");
  const [local, setLocal] = useState(""); // "90 123 45 67"
  const phone = `+998 ${local}`.trim();
  const [courseId, setCourseId] = useState(initialCourseId ? String(initialCourseId) : "");
  const [branch, setBranch] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [phoneError, setPhoneError] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    if (initialCourseId) setCourseId(String(initialCourseId));
  }, [initialCourseId]);

  const input = dark ? "input-dark" : "input";
  // Compact landing-page mode: placeholders only (labels stay for screen readers)
  const label = minimal ? "sr-only" : "field-label";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (local.replace(/\D/g, "").length !== 9) { setPhoneError(true); return; }
    if (name.trim().length < 2) return;
    setStatus("sending");

    const course = courses.find((c) => String(c.id) === courseId);
    const courseName = course ? pick(course, "title", "UZ") : "Konsultatsiya";
    const br = BRANCHES.find((b) => b.id === branch);
    const branchName = br ? tr(br.name, "UZ") : "";
    const notes = [branchName && `Filial: ${branchName}`, question.trim() && `Savol: ${question.trim()}`, `Manba: ${source}`, `Til: ${lang}`]
      .filter(Boolean)
      .join(" | ");

    // Save to the admin panel (backend) and post to the Telegram leads channel in parallel.
    const [savedToBackend, tg] = await Promise.all([
      postJSON("/api/courses", {
        full_name: name.trim(),
        phone,
        course_name: courseName.length >= 2 ? courseName : "Konsultatsiya",
        notes,
      }),
      sendLead({
        kind: "lead",
        name: name.trim(),
        phone,
        course: course ? courseName : undefined,
        branch: branchName || undefined,
        question: question.trim() || undefined,
        source,
        lang,
        website: honeypot,
      }),
    ]);

    if (savedToBackend || tg.success) {
      setStatus("ok");
      setName(""); setLocal(""); setQuestion(""); setBranch("");
      if (onDone) window.setTimeout(onDone, 2200);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`flex flex-col items-center text-center ${minimal ? "py-4" : "py-10"}`}
          >
            <span className="relative mb-5 flex h-20 w-20 items-center justify-center">
              <span className="absolute inset-0 animate-pulsering rounded-full bg-gold-400/40" />
              <span className="icon-tile-gold h-20 w-20 rounded-full"><CheckCircle2 className="relative h-9 w-9" strokeWidth={1.8} /></span>
            </span>
            <h3 className="font-display text-3xl font-semibold text-white">{t.form_success_title}</h3>
            <p className="mt-2 max-w-xs text-sm text-ink-soft">{t.form_success_text}</p>
            {!onDone && (
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-glass btn-sm mt-6">
                OK
              </button>
            )}
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={minimal ? "space-y-3" : "space-y-4"} noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" />
            <div className="relative">
              <label className={label} htmlFor={`lf-name-${source}`}>{t.form_name}</label>
              {minimal && <User className="pointer-events-none absolute left-4 top-[30px] z-[1] h-5 w-5 -translate-y-1/2 text-gold-300" />}
              <input id={`lf-name-${source}`} className={minimal ? "input-3d" : input} required minLength={2} autoComplete="name" placeholder={t.form_name_ph} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className={label} htmlFor={`lf-phone-${source}`}>{t.form_phone}</label>
              <div className="relative">
                {minimal && <Phone className="pointer-events-none absolute left-4 top-1/2 z-[1] h-5 w-5 -translate-y-1/2 text-gold-300" />}
                <span className={`pointer-events-none absolute top-1/2 z-[1] -translate-y-1/2 font-semibold text-white ${minimal ? "left-[3.25rem] text-[18px]" : "left-4 text-[15px]"}`}>+998</span>
                <input
                  id={`lf-phone-${source}`}
                  className={`${minimal ? "input-3d" : input} ${phoneError ? "!border-wine-500" : ""}`}
                  style={{ paddingLeft: minimal ? "6.6rem" : "4.4rem" }}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  value={local}
                  onChange={(e) => { setLocal(formatLocal(e.target.value)); setPhoneError(false); }}
                  placeholder="90 123 45 67"
                />
              </div>
              {phoneError && <p className="mt-1.5 text-xs font-medium text-wine-400">{t.form_invalid_phone}</p>}
            </div>
            {!minimal && <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor={`lf-course-${source}`}>{t.form_course}</label>
                <select id={`lf-course-${source}`} className={input} value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  <option value="">{t.form_course_ph}</option>
                  {courses.map((c) => (
                    <option key={c.id} value={String(c.id)}>{pick(c, "title", lang)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label} htmlFor={`lf-branch-${source}`}>{t.form_branch}</label>
                <select id={`lf-branch-${source}`} className={input} value={branch} onChange={(e) => setBranch(e.target.value)}>
                  <option value="">{t.form_branch_ph}</option>
                  {BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>{tr(b.name, lang)}</option>
                  ))}
                </select>
              </div>
            </div>}
            {withQuestion && (
              <div>
                <label className={label} htmlFor={`lf-q-${source}`}>{t.form_question}</label>
                <textarea id={`lf-q-${source}`} rows={3} className={`${input} resize-none`} placeholder={t.form_question_ph} value={question} onChange={(e) => setQuestion(e.target.value)} />
              </div>
            )}
            {status === "error" && (
              <p className="rounded-xl bg-wine-500/15 px-4 py-3 text-sm font-medium text-wine-400">{t.form_error}</p>
            )}
            <button type="submit" disabled={status === "sending"} className={minimal ? "btn-3d !mt-5" : "btn btn-gold btn-lg w-full"}>
              {status === "sending" ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {status === "sending" ? t.form_sending : t.form_submit}
              {status !== "sending" && <ArrowRight className="h-5 w-5" />}
            </button>
            {!minimal && <p className="text-center text-xs text-ink-muted">{t.form_privacy}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
