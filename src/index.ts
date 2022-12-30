import schedule from "node-schedule";

import { checkForNewGame } from "./scraper.js";
import { sendDiscordMessage } from "./webhook.js";

let lastTitle = "";

const main = async () => {
  const title = await checkForNewGame(lastTitle);
  if (title !== lastTitle) sendDiscordMessage();
  lastTitle = title;
};

schedule.scheduleJob("0 17 * * *", main);
