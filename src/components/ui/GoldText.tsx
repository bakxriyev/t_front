'use client';

import React from "react";
import { motion } from "framer-motion";
import { C } from "@/lib/constants";

interface GoldTextProps {
  children: React.ReactNode;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p";
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  delay?: number;
}

export function GoldText({
  children,
  as: Tag = "span",
  className = "",
  style,
  animate = true,
  delay = 0,
}: GoldTextProps) {
  const content = (
    <Tag
      className={className}
      style={{
        background: C.goldGrad,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </Tag>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: "inline" }}
    >
      {content}
    </motion.div>
  );
}

export default GoldText;
