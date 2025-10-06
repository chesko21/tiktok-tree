import { WebcastPushConnection } from "tiktok-live-connector";
import { handleGift } from "./gameLogic.js";
import fs from "fs";

const giftLogPath = "./giftList.json";

function logNewGift(giftName, diamondValue) {
  if (!fs.existsSync(giftLogPath)) fs.writeFileSync(giftLogPath, "{}", "utf8");

  const existing = JSON.parse(fs.readFileSync(giftLogPath, "utf8"));
  if (!existing[giftName]) {
    existing[giftName] = diamondValue;
    fs.writeFileSync(giftLogPath, JSON.stringify(existing, null, 2), "utf8");
    console.log(`🆕 Gift baru terdeteksi: ${giftName} (${diamondValue}💎)`);
  }
}

export function startTikTokHandler(
  wsServer,
  username = "the.null.object"
) {
  const tiktokConnection = new WebcastPushConnection(username);

  tiktokConnection
    .connect()
    .then((state) =>
      console.log(`✅ Connected to TikTok Live: ${state.roomId}`)
    )
    .catch((err) => console.error("❌ Gagal connect ke TikTok:", err));

  tiktokConnection.on("gift", (data) => {
    {
      /* 
    console.log("📦 RAW GIFT EVENT:", {
      user: data.uniqueId,
      gift: data.giftName,
      diamond: data.diamondCount,
      repeatEnd: data.repeatEnd,
      repeatCount: data.repeatCount,
      avatar: data.profilePictureUrl || "❌ Tidak ada foto",
    });
*/
    }
    const giftName = data.giftName || "Unknown";
    const diamondValue = data.diamondCount || 0;
    const repeatCount = data.repeatCount || 1;

    if (!data.repeatEnd && data.repeatCount > 1) return;

    const totalDiamonds = diamondValue * repeatCount;
    logNewGift(giftName, diamondValue);

    const update = handleGift(data.uniqueId, giftName, totalDiamonds);
    const avatar = data.profilePictureUrl || null;

    console.log(
      `🎁 ${data.uniqueId} kirim ${giftName} (${totalDiamonds}💎 → +${update.ember} ember)`
    );
    // console.log(`🖼️ Foto profil: ${avatar || "❌ Tidak tersedia"}`);

    wsServer.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "update",
            ...update,
            avatar,
          })
        );
      }
    });
  });
}
