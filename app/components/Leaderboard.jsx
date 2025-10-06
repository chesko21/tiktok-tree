"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "../utils/socket";

export default function Leaderboard() {
  const leaderboard = useGameStore((state) => state.leaderboard);
  const [scale, setScale] = useState(1);

  if (!leaderboard.length) return null;

  const medals = [
    { icon: "👑", color: "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" },
    { icon: "🥈", color: "text-gray-300 drop-shadow-[0_0_6px_rgba(180,180,180,0.8)]" },
    { icon: "🥉", color: "text-amber-700 drop-shadow-[0_0_6px_rgba(205,127,50,0.8)]" },
  ];

  return (
    <motion.div
      className="absolute top-1/3 right-6 bg-black/60 backdrop-blur-lg rounded-2xl p-4 text-sm shadow-xl border border-white/10 cursor-grab active:cursor-grabbing origin-bottom-right"
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.25}
      dragMomentum={false}
      style={{ scale }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold mb-3 text-yellow-300 text-center text-lg tracking-wide">
        🏆 Top Penyiram Pohon 🌳
      </h3>

      <div className="flex justify-center gap-2 mb-3 text-xs text-gray-300">
        <button
          onClick={() => setScale((s) => Math.max(0.8, s - 0.1))}
          className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
        >
          ➖
        </button>
        <button
          onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
          className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 transition"
        >
          ➕
        </button>
      </div>

      {leaderboard.map((item, i) => {
        const medal = medals[i] || null;
        const avatarUrl = item.avatar && item.avatar.startsWith("http") ? item.avatar : null;

        return (
          <motion.div
            key={i}
            className={`flex items-center gap-3 py-1.5 px-2 rounded-lg overflow-hidden ${
              i === 0
                ? "bg-gradient-to-r from-yellow-600/30 to-yellow-300/10"
                : i === 1
                ? "bg-gradient-to-r from-gray-500/20 to-gray-300/5"
                : i === 2
                ? "bg-gradient-to-r from-amber-700/20 to-amber-500/5"
                : "bg-transparent"
            }`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* 🖼️ Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={item.user || "User"}
                width={90}
                height={90}
                className="rounded-full border-4 border-blue-400 shadow-[0_0_20px_rgba(0,150,255,0.6)]"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-lg shadow-md">
                💧
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{item.user}</p>
              <p className="text-blue-300 text-xs font-medium">{item.score}💧</p>
            </div>

            <span className={`text-xl font-bold ${medal ? medal.color : "text-white/60"}`}>
              {medal ? medal.icon : `${i + 1}.`}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
