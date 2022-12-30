import fetch from "node-fetch";

const url =
  "https://discord.com/api/webhooks/1058426274424574022/6Ncl0Vofyp9XgbGB7chKZhZ3MFEbk-7_e0zXOHwjdkaQ00wO_vHL5RG_9tLukPEl17IY";

export const sendMessage = () => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Bot",
      content: "Hello there!",
    }),
  });
};
