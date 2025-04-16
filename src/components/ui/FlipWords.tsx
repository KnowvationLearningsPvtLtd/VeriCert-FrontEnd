"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Color pairs for Veri & Cert flipping
const colorCombos = [
  { veri: "text-[#A0522D]", cert: "text-[#5C4033]" }, // sienna and dark brown
  { veri: "text-[#5C4033]", cert: "text-[#A0522D]" }, // reverse
  { veri: "text-[#DEB887]", cert: "text-[#8B4513]" }, // burlywood and saddle brown
  { veri: "text-[#8B4513]", cert: "text-[#DEB887]" }, // reverse
  { veri: "text-[#D2B48C]", cert: "text-black" },     // tan and black
  { veri: "text-black", cert: "text-[#D2B48C]" },     // reverse
];

// FlipWords Component (flip animation in block)
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentWord}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
        }}
        className={cn(
          "inline-block px-4 py-2 rounded-md shadow-md bg-[#f9f5f1] dark:bg-[#2a1f18] text-[#3a2d25] font-semibold text-lg",
          className
        )}
      >
        {currentWord}
      </motion.div>
    </AnimatePresence>
  );
};

// HeroText Section (VeriCert + FlipWords)
const HeroText = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorCombos.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const currentColors = colorCombos[colorIndex];

  return (
    <div className="text-2xl md:text-3xl font-semibold flex flex-wrap items-center justify-center gap-3 text-center">
      <div className="flex gap-1 font-bold">
        <span className={cn("transition-colors duration-700", currentColors.veri)}>Veri</span>
        <span className={cn("transition-colors duration-700", currentColors.cert)}>Cert</span>
      </div>
      <FlipWords words={["manage", "issue", "verify"]} duration={3000} />
      <span className="text-neutral-700 dark:text-neutral-300">
        certificates with real-time insights and trust.
      </span>
    </div>
  );
};

export default HeroText;
