import puppeteer from "puppeteer";
import userAgent from "user-agents";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function screenshot() {
  try {
    const url = "https://store.epicgames.com/en-US/free-games";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setUserAgent(new userAgent().random().toString());
    await page.goto(url, { waitUntil: ["load", "domcontentloaded"] });
    await delay(10000);

    const cookie = await page.waitForSelector("#onetrust-accept-btn-handler", {
      visible: true,
    });
    await cookie.click();

    const element = await page.waitForSelector(
      "#dieselReactWrapper > div > div.css-1vplx76 > main > div.css-1ktypff > div > div > div > div > div:nth-child(4)",
      {
        visible: true,
      }
    );
    await element.screenshot({ path: "output/screenshot.png", type: "png" });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}
