'use client';

import { motion } from "framer-motion";
import { useMemo } from "react";

interface AnimatedTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  type?: "words" | "chars" | "typing";
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export function AnimatedText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  type = "words",
  delay = 0,
  duration = 0.5,
  stagger = 0.06,
  once = true,
}: AnimatedTextProps) {
  const words = useMemo(() => text.split(" "), [text]);
  const chars = useMemo(() => text.split(""), [text]);

  const wordVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * stagger,
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.4,
        ease: "easeOut" as "easeOut",
      },
    }),
  };

  if (type === "chars") {
    return (
      <motion.div
        key={text}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        style={{ display: "inline", ...style }}
        className={className}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={charVariants}
            custom={i}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      style={{ display: "inline", ...style }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {i > 0 && <span className="word-space"> </span>}
          <motion.span
            custom={i}
            variants={wordVariants}
            style={{ display: "inline" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedText;
