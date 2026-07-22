"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Youtube, Linkedin, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApiSingle } from "@/hooks/useApiData";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { C } from "@/lib/constants";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { sendToTelegram, formatDate } from "@/lib/telegram";

interface Settings {
  id: number;
  phone: string;
  email: string;
  address_uz: string;
  address_ru: string;
  address_en: string;
  working_hours_uz: string;
  working_hours_ru: string;
  working_hours_en: string;
  logo?: string | null;
}

export function Contact() {
  const { lang, t } = useLanguage();
  const { data: settings } = useApiSingle<Settings>("/api/settings");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const contactInfo = useMemo(() => {
    if (!settings) return [];
    return [
      { icon: <MapPin size={18} />, label: "Address", value: (settings as any)[`address_${lang.toLowerCase()}`] || "" },
      { icon: <Phone size={18} />, label: "Phone", value: settings.phone || "" },
      { icon: <Mail size={18} />, label: "Email", value: settings.email || "" },
      { icon: <Clock size={18} />, label: "Working Hours", value: (settings as any)[`working_hours_${lang}`] || "" },
    ];
  }, [settings, lang]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSending(true);
    const dateStr = formatDate();
    const text = `<b>📬 Yangi xabar — Kontakt formasi</b>\n━━━━━━━━━━━━━━━━━━━\n\n👤 <b>Ism:</b>  ${name.trim()}\n📞 <b>Telefon:</b>  ${phone.trim()}\n💬 <b>Xabar:</b>  ${message.trim() || "—"}\n\n━━━━━━━━━━━━━━━━━━━\n📅 ${dateStr}`;
    const result = await sendToTelegram(text);
    if (result.success) {
      setSent(true);
      setName("");
      setPhone("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    }
    setSending(false);
  };

  const socials = [
    { icon: <MessageCircle size={15} />, label: "Telegram", color: "#229ED9", href: "https://t.me/tashkentlawschool" },
    { icon: <Instagram size={15} />, label: "Instagram", color: "#E1306C", href: "#" },
    { icon: <Facebook size={15} />, label: "Facebook", color: "#1877F2", href: "#" },
    { icon: <Youtube size={15} />, label: "YouTube", color: "#FF0000", href: "#" },
    { icon: <Linkedin size={15} />, label: "LinkedIn", color: "#0077B5", href: "#" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-10 md:py-16 section-glass" style={{ background: "rgba(13,13,13,0.5)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: C.sectionGlow }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <SectionLabel>{t.contact_label}</SectionLabel>
          <AnimatedText
            text={t.contact_title}
            as="h2"
            className="text-2xl md:text-5xl font-bold font-serif"
            style={{ color: C.white }}
            type="words"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
          <div>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 rounded-2xl"
                  style={{ background: C.card, border: `1px solid ${C.border}` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(112,38,32,0.3)", color: C.gold }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: C.gold, fontFamily: "'Inter', sans-serif" }}>
                      {item.label}
                    </div>
                    <div className="text-sm" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0.5"
                  style={{
                    background: `${s.color}18`,
                    color: s.color,
                    border: `1px solid ${s.color}28`,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl"
            style={{ background: C.card, border: `1px solid ${C.border}` }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: C.white }}>
              Send us a message
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                  {t.name}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.border}`,
                    color: C.white,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(236,198,103,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                  {t.phone}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 000 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.border}`,
                    color: C.white,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(236,198,103,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: C.secondary, fontFamily: "'Inter', sans-serif" }}>
                  Message
                </label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${C.border}`,
                    color: C.white,
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(236,198,103,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
              <button
                type="submit"
                disabled={sending || sent}
                className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                style={{
                  background: sent ? "#22c55e" : C.btnGrad,
                  color: C.bg,
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: C.btnShadow,
                }}
              >
                {sent ? (
                  <><CheckCircle size={15} /> Sent!</>
                ) : sending ? (
                  <><Loader2 size={15} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={15} /> Send Message</>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ height: "340px", border: `1px solid ${C.border}` }}>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=69.2%2C41.28%2C69.35%2C41.35&layer=mapnik&marker=41.31%2C69.27"
            className="w-full h-full"
            title="Tashkent Law School Location"
            style={{ filter: "grayscale(100%) invert(92%) contrast(75%) sepia(10%)", border: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
