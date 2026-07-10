const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:5173');
  await page.waitForSelector('#global-mode-universe');
  await page.click('#global-mode-universe');
  
  const getZoom = async () => page.evaluate(() => window.test_camera ? window.test_camera.zoom : -1);
  
  await page.evaluate(() => {
    const engageBtn = document.getElementById('engage-warp-btn');
    if (engageBtn) engageBtn.click();
  });
  
  await new Promise(r => setTimeout(r, 1200));
  console.log("Zoom after hyperjump:", await getZoom());
  
  await new Promise(r => setTimeout(r, 800)); // wait for bridge
  console.log("Zoom before triggerReturn:", await getZoom());
  
  await page.evaluate(() => {
    window.test_vars.triggerReturn();
  });
  console.log("Triggered return directly via script!");
  
  await new Promise(r => setTimeout(r, 500));
  console.log("Zoom at 500ms:", await getZoom());
  
  await new Promise(r => setTimeout(r, 600));
  console.log("Zoom at 1100ms:", await getZoom());
  
  await browser.close();
})();
