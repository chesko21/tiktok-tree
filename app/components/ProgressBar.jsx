"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ progress = 0 }) {

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="relative w-full max-w-md h-6 bg-gray-800 rounded-full border border-gray-600 overflow-hidden mt-6 shadow-inner">
  
      <motion.div
        className="h-full bg-gradient-to-r from-green-400 to-lime-500 shadow-lg"
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white drop-shadow-md">
        {clampedProgress.toFixed(1)}%
      </div>
    </div>
  );
}
