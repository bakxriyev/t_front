"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Courses } from "@/components/sections/Courses";
import { Stats } from "@/components/sections/Stats";
import { EnrollModal } from "@/components/ui/EnrollModal";
import { COURSES } from "@/lib/constants";

export default function CoursesClient() {
  const [enrollCourse, setEnrollCourse] = useState<string | null>(null);

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "90px" }}>
        <Courses onEnroll={(c) => setEnrollCourse(c)} />
        <Stats />
      </div>
      <Footer />
      {enrollCourse && (
        <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />
      )}
    </div>
  );
}
