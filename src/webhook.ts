import { EmbedBuilder, WebhookClient } from "discord.js";
import { config } from "dotenv";

config();

export const sendDiscordMessage = () => {
  const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL });

  webhookClient.send({
    username: "Epic Free Games",
    avatarURL: "https://i.imgur.com/Ow2zdgV.png",
    files: [
      {
        attachment: "output/screenshot.png",
        name: "screenshot.png",
      },
    ],
  });
};
