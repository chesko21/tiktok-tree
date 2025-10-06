"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WaterSplash({ trigger, username, avatar }) {
  const [visible, setVisible] = useState(false);
  const [drops, setDrops] = useState([]);
  const [splashes, setSplashes] = useState([]);

  // 🎵 Suara air
  useEffect(() => {
    if (trigger) {
      const audio = new Audio("/water-splash.mp3");
      audio.volume = 0.8;
      audio.play().catch(() => { });
    }
  }, [trigger]);

  // 💧 Animasi cipratan
  useEffect(() => {
    if (!trigger) return;
    setVisible(true);

    setDrops(
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 160,
        delay: Math.random() * 0.3,
      }))
    );

    setSplashes(
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 120,
        delay: i * 0.05,
      }))
    );

    const timeout = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-visible">
      {/* Avatar + Nama */}
      <motion.div
        className="absolute z-20 flex flex-col items-center"
        initial={{ y: -100, opacity: 0, scale: 0.6 }}
        animate={{ y: [0, 50, -30], opacity: 1, scale: [0.6, 1, 1] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        {avatar && avatar.startsWith("http") ? (
          <img
            src={avatar}
            alt={username || "User"}
            width={90}
            height={90}
            className="rounded-full border-4 border-blue-400 shadow-[0_0_20px_rgba(0,150,255,0.6)]"
          />
        ) : (
          <div className="w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(0,150,255,0.6)]">
            💧
          </div>
        )}

        <p className="mt-2 text-white font-bold drop-shadow-lg">{username}</p>
      </motion.div>

      {/* 💦 Drops */}
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-blue-400/70 backdrop-blur-sm shadow-[0_0_10px_rgba(0,150,255,0.8)]"
          style={{
            width: `${Math.random() * 10 + 4}px`,
            height: `${Math.random() * 10 + 4}px`,
            left: `calc(50% + ${d.x}px)`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, 120 + Math.random() * 80, 200],
            opacity: [0, 1, 0],
            scale: [1, 0.9, 1.2],
          }}
          transition={{
            duration: 1.5 + Math.random() * 0.5,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 💥 Splashes */}
      {splashes.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-blue-300/60 backdrop-blur-md"
          style={{
            width: `${20 + Math.random() * 20}px`,
            height: `${6 + Math.random() * 4}px`,
            left: `calc(50% + ${s.x}px)`,
            bottom: "40px",
          }}
          initial={{ scaleX: 0.4, scaleY: 0.4, opacity: 0 }}
          animate={{
            scaleX: [0.4, 1.4, 0.6],
            scaleY: [0.4, 0.8, 0.3],
            y: [-40 - Math.random() * 30, -60],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1,
            delay: s.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
