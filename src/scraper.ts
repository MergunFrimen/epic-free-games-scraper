import puppeteer from "puppeteer";
import userAgent from "user-agents";

export const checkForNewGame = async (lastTitle: string) => {
  const url = "https://store.epicgames.com/en-US/free-games";
  const browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();

  await page.setUserAgent(new userAgent().random().toString());
  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  await acceptCookies(page);

  const element = await page.waitForSelector(
    "#dieselReactWrapper > div > div.css-1vplx76 > main > div.css-1ktypff > div > div > div > div > div:nth-child(4)",
    { visible: true }
  );

  const newTitle = await getLatestFreeGames(element);

  if (newTitle !== lastTitle) {
    await sleep(5000); // wait for images to load
    await element.screenshot({ path: "output/screenshot.png", type: "png" });
    lastTitle = newTitle;
  }

  await browser.close();
  return lastTitle;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const acceptCookies = async (page: puppeteer.Page) => {
  const cookie = await page.waitForSelector("#onetrust-accept-btn-handler", {
    visible: true,
  });
  await cookie.click();
};

const getLatestFreeGames = async (
  element: puppeteer.ElementHandle
): Promise<string> => {
  const elem = await element.waitForSelector(".css-1h2ruwl");
  return await elem.evaluate((el) => el.textContent, elem);
};
