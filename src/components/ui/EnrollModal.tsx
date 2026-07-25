"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { C } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiData } from "@/hooks/useApiData";
import { sendToTelegram, formatDate } from "@/lib/telegram";

interface EnrollModalProps {
  course?: string | null;
  onClose: () => void;
}

interface CourseData {
  id: number;
  title_uz: string;
  title_ru: string;
  title_en: string;
  description_uz: string;
  description_ru: string;
  description_en: string;
  price: string;
  duration: string;
  level: string;
  image: string;
  order: number;
}

export function EnrollModal({ course: initialCourse, onClose }: EnrollModalProps) {
  const { lang, t } = useLanguage();
  const { data: courses, loading: coursesLoading } = useApiData<CourseData>('/api/courses/offers?is_active=true');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [course, setCourse] = useState(initialCourse || "");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      setCourse(initialCourse);
    }
  }, [initialCourse]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [handleEscape]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) return;

    const selectedCourse = courses.find((c) => String(c.id) === course);
    const l = lang.toLowerCase();
    const courseName = selectedCourse
      ? (selectedCourse as unknown as Record<string, string>)[`title_${l}`] || selectedCourse.title_en
      : course;

    setSending(true);
    const dateStr = formatDate();
    const text = `<b>🎓 Yangi ariza — Kursga yozilish</b>\n━━━━━━━━━━━━━━━━━━━\n\n👤 <b>Ism:</b>  ${firstName.trim()}\n👤 <b>Familiya:</b>  ${lastName.trim()}\n📞 <b>Telefon:</b>  ${phone.trim()}\n📍 <b>Manzil:</b>  ${address.trim() || "—"}\n📚 <b>Kurs:</b>  ${courseName}\n\n━━━━━━━━━━━━━━━━━━━\n📅 ${dateStr}`;
    const result = await sendToTelegram(text);
    if (result.success) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 1500);
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-3xl p-6 md:p-8 animate-fade-in-up my-4"
          style={{
            background: C.card,
            border: "1px solid rgba(236,198,103,0.3)",
          }}
        >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full transition-colors duration-200 hover:opacity-70"
          style={{ color: C.muted }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mb-4">
            <img src="/images/logo.png" alt="TLS" className="w-full h-full object-contain" />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{ fontFamily: "'Playfair Display', serif", color: C.white }}
          >
            {t.enroll_title || "Apply for Course"}
          </h2>
          <p style={{ color: C.muted, fontSize: "0.875rem" }}>
            {t.enroll_subtitle || "Fill in the form below and we will contact you shortly"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>
                {t.firstname || "First Name"}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
                style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>
                {t.lastname || "Last Name"}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
                style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>
              {t.phone || "Phone Number"}
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+998 XX XXX XX XX"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>
              {t.address || "Address"}
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Tashkent, ..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5 font-sans" style={{ color: C.secondary }}>
              {t.course_select || "Preferred Course"}
            </label>
            <select
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 font-sans appearance-none cursor-pointer"
              style={{ background: "#141414", border: `1px solid ${C.border}`, color: C.white }}
              onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.boxShadow = `0 0 0 3px rgba(236,198,103,0.1)`; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            >
              <option value="" disabled style={{ background: C.card, color: C.muted }}>
                {coursesLoading ? "Loading..." : (t.course_select || "Select a course...")}
              </option>
              {courses.map((c) => {
                const l = lang.toLowerCase();
                const courseTitle = (c as unknown as Record<string, string>)[`title_${l}`] || c.title_en;
                return (
                  <option key={c.id} value={String(c.id)} style={{ background: C.card, color: C.white }}>
                    {courseTitle}
                  </option>
                );
              })}
            </select>
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm font-sans transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: sent ? "#22c55e" : C.btnGrad, color: C.bg, boxShadow: C.btnShadow }}
          >
            {sent ? (
              <><CheckCircle className="w-4 h-4" />{t.application_sent || "Application received!"}</>
            ) : sending ? (
              <><Loader2 className="w-4 h-4 animate-spin" />{t.sending_text || "Sending..."}</>
            ) : (
              <><Send className="w-4 h-4" />{t.submit_enroll || "Submit Application"}</>
            )}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
