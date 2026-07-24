"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Courses } from "@/components/sections/Courses";
import { Stats } from "@/components/sections/Stats";
import { EnrollModal } from "@/components/ui/EnrollModal";

export default function CoursesClient() {
  const [enrollCourse, setEnrollCourse] = useState<string | null>(null);
  const [showEnroll, setShowEnroll] = useState(false);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Courses onEnroll={(c) => { setShowEnroll(true); setEnrollCourse(c); }} />
        <Stats />
      </div>
      <Footer />
      {showEnroll && (
        <EnrollModal course={enrollCourse} onClose={() => { setShowEnroll(false); setEnrollCourse(null); }} />
      )}
    </div>
  );
}
