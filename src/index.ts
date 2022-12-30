import schedule from "node-schedule";

import { screenshot } from "./screenshot.js";
import { sendMessage } from "./webhook.js";

// schedule.scheduleJob("37 17 * * *", async () => {
//   await screenshot();
// });

sendMessage();

console.log("ran successfully");
