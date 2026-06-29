const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failed = [];
  page.on('requestfailed', req => failed.push({ url: req.url(), error: req.failure()?.errorText }));
  page.on('response', async res => {
    if (res.url().includes('before-after') || res.url().includes('before-dig') || res.url().includes('chatbot-avatar')) {
      console.log('RESPONSE', res.status(), res.url());
    }
  });
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text()); });
  page.on('pageerror', e => console.log('PAGEERROR:', e.message));

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await page.waitForTimeout(1500);

  const imgInfo = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).filter(i => i.src.includes('before') );
    return imgs.map(i => ({ src: i.src, naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight, complete: i.complete, currentSrc: i.currentSrc }));
  });
  console.log('img elements:', JSON.stringify(imgInfo, null, 2));
  console.log('failed requests:', JSON.stringify(failed, null, 2));

  await page.screenshot({ path: 'C:/Users/akash/AppData/Local/Temp/diag-beforeafter.png', clip: { x: 0, y: 300, width: 1440, height: 700 } });
  await browser.close();
})();
