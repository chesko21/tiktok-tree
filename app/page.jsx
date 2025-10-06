"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { shallow } from "zustand/shallow";
import { initSocket } from "./utils/socket";
import { useClientGameStore } from "./utils/useClientGameStore";

const Tree = dynamic(() => import("./components/Tree"), { ssr: false });
const WaterSplash = dynamic(() => import("./components/WaterSplash"), { ssr: false });
const ProgressBar = dynamic(() => import("./components/ProgressBar"), { ssr: false });
const Leaderboard = dynamic(() => import("./components/Leaderboard"), { ssr: false });

export default function Page() {
  const { water, growth, lastGift = {}, lastTrigger } = useClientGameStore(
    (s) => ({
      water: s.water,
      growth: s.growth,
      lastGift: s.lastGift || {},
      lastTrigger: s.lastTrigger,
    }),
    shallow
  );

  useEffect(() => {
    if (!window.socketInitialized) {
      initSocket();
      window.socketInitialized = true;
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-white bg-gradient-to-b from-green-800 to-black overflow-hidden">

      {/* 🌿 Header animasi ajakan */}
      <motion.div
        className="absolute top-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-green-300 drop-shadow-[0_0_10px_rgba(0,255,128,0.6)]"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 10px rgba(0,255,128,0.7)",
              "0 0 20px rgba(0,255,128,1)",
              "0 0 10px rgba(0,255,128,0.7)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          🌱 Sirami Pohon Ini dengan Gift-mu!
        </motion.h1>

        <p className="mt-3 text-sm md:text-base text-green-200 opacity-90">
          Setiap gift menambah <span className="font-semibold text-blue-300">air kehidupan</span> 🌊  
          — bantu pohon ini tumbuh makin besar!
        </p>
      </motion.div>
      <Tree growth={growth} />
      <ProgressBar progress={growth * 100} />
      <p className="mt-4 text-sm opacity-80">💧 Total Air: {water}</p>
      <WaterSplash
        trigger={lastTrigger}
        username={lastGift.username || "Unknown"}
        avatar={lastGift.avatar || null}
      />
      <Leaderboard />
    </div>
  );
}
