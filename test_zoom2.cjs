const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => {
     if (msg.text().includes('progress')) console.log(msg.text());
  });
  await page.goto('http://localhost:5173');
  await page.evaluate(() => {
    // Inject console log in the loop
    const originalMathMin = Math.min;
    Math.min = function(...args) {
      if (args[1] > 0 && args[1] < 2 && args.length === 2 && args[0] === 1) {
         console.log('progress =', args[1]);
      }
      return originalMathMin.apply(this, args);
    }
  });
  // ...
