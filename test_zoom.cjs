const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:5173');
  
  // Wait for the universe button and click it
  await page.waitForSelector('#global-mode-universe');
  await page.click('#global-mode-universe');
  
  // Wait for animation loop to start
  await new Promise(r => setTimeout(r, 1000));
  
  // Get camera zoom from window.test_camera if we expose it
  const getZoom = async () => {
    return await page.evaluate(() => {
      return window.test_camera ? window.test_camera.zoom : -1;
    });
  };
  
  console.log("Initial zoom:", await getZoom());
  
  // We need to trigger hyperjump.
  // Instead of clicking the moon on canvas, let's just trigger the button.
  // Is the button visible? It's inside a tooltip. We can just evaluate it.
  await page.evaluate(() => {
    const engageBtn = document.getElementById('engage-warp-btn');
    if (engageBtn) engageBtn.click();
  });
  
  console.log("Clicked engage!");
  await new Promise(r => setTimeout(r, 500));
  console.log("Zoom after 500ms:", await getZoom());
  
  await new Promise(r => setTimeout(r, 700));
  console.log("Zoom after 1200ms:", await getZoom());
  
  // Wait for bridge to show (at 1800ms)
  await new Promise(r => setTimeout(r, 1000));
  
  console.log("Zoom before returning:", await getZoom());
  
  // Click return
  await page.evaluate(() => {
    const btn = document.getElementById('bridge-close-btn');
    if (btn) btn.click();
  });
  
  console.log("Clicked return!");
  
  await new Promise(r => setTimeout(r, 500));
  console.log("Zoom at 500ms return:", await getZoom());
  
  await new Promise(r => setTimeout(r, 600));
  console.log("Zoom at 1100ms return:", await getZoom());
  
  await browser.close();
})();
