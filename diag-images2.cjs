const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  const figureBox = await page.locator('figure').first().boundingBox();
  console.log('figure box:', JSON.stringify(figureBox));
  await page.evaluate((y) => window.scrollTo(0, y - 100), figureBox.y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/akash/AppData/Local/Temp/diag-beforeafter2.png', fullPage: false });
  await browser.close();
})();
