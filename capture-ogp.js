const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

    console.log('Navigating to preview page...');
    await page.goto('http://localhost:3000/og-preview', { waitUntil: 'networkidle0', timeout: 30000 });

    // Webフォント等の読み込み待ちを考慮して少し待つ
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Taking screenshot...');
    await page.screenshot({ path: 'public/og-image.png' });

    await browser.close();
    console.log('Success: Saved to public/og-image.png');
  } catch (err) {
    console.error('Error during capture:', err);
    process.exit(1);
  }
})();
