"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function Tree({ growth = 0 }) {
  const normalizedGrowth = Math.min(Math.max(growth, 0), 1);

  const smoothGrowth = useSpring(normalizedGrowth, {
    stiffness: 80,
    damping: 15,
    mass: 0.5,
  });

  const scaleY = useTransform(smoothGrowth, [0, 1], [0.3, 1]);
  const scaleX = useTransform(smoothGrowth, [0, 1], [0.4, 1]);
  const sway = useTransform(smoothGrowth, [0, 1], [2, 0]);

  useEffect(() => {
    smoothGrowth.set(normalizedGrowth);
  }, [normalizedGrowth, smoothGrowth]);

  return (
    <motion.div
      className="flex justify-center items-end h-full relative"
      style={{
        scaleY,
        scaleX,
        rotate: sway,
      }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
    >
      <motion.div
        animate={{
          rotate: [0, 1.5, -1.5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/tree.png"
          alt="Tree"
          width={350}
          height={450}
          priority
          className="pointer-events-none select-none"
        />
      </motion.div>
    </motion.div>
  );
}
