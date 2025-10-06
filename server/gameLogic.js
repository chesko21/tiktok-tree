import fs from "fs";

let giftList = {};
try {
  if (fs.existsSync("./giftList.json")) {
    giftList = JSON.parse(fs.readFileSync("./giftList.json", "utf8"));
  }
} catch (err) {
  console.error("⚠️ Gagal membaca giftList.json:", err);
}

let totalWater = 0;
let growth = 0; 
let leaderboard = {};

const WATER_GOAL = 5000;

function diamondsToWater(diamondCount, giftName = "") {
  if (!diamondCount || diamondCount === 0) {
    const saved = giftList[giftName];
    diamondCount = saved && saved > 0 ? saved : 1;
  }

  return diamondCount;
}

function handleGift(username, giftName, diamonds) {
  const ember = diamondsToWater(diamonds, giftName);

  totalWater += ember;
  growth = Math.min(totalWater / WATER_GOAL, 1);

  if (!leaderboard[username]) leaderboard[username] = 0;
  leaderboard[username] += ember;

  const sorted = Object.entries(leaderboard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([user, score]) => ({ user, score }));

  return {
    totalWater,
    growth,
    ember,
    giftName,
    username,
    leaderboard: sorted,
  };
}

function resetGame() {
  totalWater = 0;
  growth = 0;
  leaderboard = {};
}

export { handleGift, resetGame, totalWater, growth, leaderboard };
