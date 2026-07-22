import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Tashkent Law School cookie policy — how we use cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20" style={{ color: "#D7D7D7", fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}>Cookie Policy</h1>
      <div className="space-y-4 leading-relaxed">
        <p>Last updated: July 2026</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help us improve your browsing experience.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>How We Use Cookies</h2>
        <p>We use essential cookies for site functionality and analytics cookies to understand usage patterns. We do not use tracking cookies for advertising.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Managing Cookies</h2>
        <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Contact</h2>
        <p>For questions about our cookie policy, contact us at info@tashkentlawschool.uz.</p>
      </div>
    </div>
  );
}
