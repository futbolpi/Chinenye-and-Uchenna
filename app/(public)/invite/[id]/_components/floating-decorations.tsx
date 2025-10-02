"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10"
        style={{ color: "var(--color-muted)" }}
      >
        <Sparkles className="h-6 w-6" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-32 right-16"
        style={{ color: "var(--color-muted)" }}
      >
        <Heart className="h-4 w-4" />
      </motion.div>
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 left-20"
        style={{ color: "var(--color-muted)" }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.div>
    </div>
  );
}
