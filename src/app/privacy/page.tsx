import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Tashkent Law School privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20" style={{ color: "#D7D7D7", fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}>Privacy Policy</h1>
      <div className="space-y-4 leading-relaxed">
        <p>Last updated: July 2026</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Information We Collect</h2>
        <p>We collect information you provide directly: name, email address, phone number, and educational background when you apply for courses or contact us.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>How We Use Your Information</h2>
        <p>We use your information to process applications, communicate about courses, improve our services, and send relevant updates with your consent.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Data Protection</h2>
        <p>We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Contact</h2>
        <p>For privacy-related inquiries, contact us at info@tashkentlawschool.uz.</p>
      </div>
    </div>
  );
}
