import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Tashkent Law School terms of service — rules and guidelines for using our educational services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20" style={{ color: "#D7D7D7", fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#FFFFFF" }}>Terms of Service</h1>
      <div className="space-y-4 leading-relaxed">
        <p>Last updated: July 2026</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Enrollment</h2>
        <p>By enrolling in our courses, you agree to provide accurate information and comply with our academic policies and payment terms.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Payment</h2>
        <p>Course fees must be paid according to the selected payment plan. Refund policies are outlined in the enrollment agreement.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Conduct</h2>
        <p>Students are expected to maintain professional conduct, respect intellectual property, and adhere to academic integrity standards.</p>
        <h2 className="text-xl font-semibold mt-8" style={{ color: "#D4AF37" }}>Contact</h2>
        <p>For questions about these terms, contact us at info@tashkentlawschool.uz.</p>
      </div>
    </div>
  );
}
