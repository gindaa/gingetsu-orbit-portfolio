const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Capture console logs
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:5173');
  
  // Wait for the universe button and click it
  await page.waitForSelector('#global-mode-universe');
  await page.click('#global-mode-universe');
  
  // Wait for canvas to be visible
  await page.waitForTimeout(1000);
  
  // Expose a function to get zoom level
  // Since camera is scoped inside DOMContentLoaded, we need to hack it to read it.
  // Wait, I can just modify universe.js to attach camera to window!
  
  await browser.close();
})();
