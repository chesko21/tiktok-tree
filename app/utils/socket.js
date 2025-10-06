"use client";
import { create } from "zustand";

export const useGameStore = create((set) => ({
  water: 0,
  growth: 0,
  leaderboard: [],
  lastGift: null,
  lastUsername: null,
  lastTrigger: false,

  updateFromServer: (data) =>
    set((state) => ({
      water: data.totalWater,
      growth: data.growth,
      leaderboard: data.leaderboard || [],
      lastGift: {
        username: data.username || "Unknown",
        giftName: data.giftName || "Gift",
        avatar: data.avatar || null,
      },
      lastTrigger: !state.lastTrigger,
    })),
  
}));

export function initSocket() {
  if (typeof window === "undefined") return null;
  if (window._ws && window._ws.readyState === 1) return window._ws;

  const ws = new WebSocket("ws://localhost:3001");

  ws.onopen = () => console.log("🌐 WebSocket connected to backend");
  ws.onclose = () => console.warn("⚠️ WebSocket disconnected");
  ws.onerror = (err) => console.error("❌ WebSocket error:", err);

  ws.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);
      if (data.type === "update") {
        useGameStore.getState().updateFromServer(data);
      }
    } catch (err) {
      console.error("Error parsing WebSocket message:", err);
    }
  };

  window._ws = ws;
  return ws;
}
