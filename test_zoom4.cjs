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
  
  await new Promise(r => setTimeout(r, 2000));
  console.log("Zoom before btn click:", await getZoom());
  
  await page.evaluate(() => {
    const btn = document.getElementById('bridge-close-btn');
    if (btn) {
       console.log("Found btn! Class:", btn.className);
       btn.click();
    } else {
       console.log("Btn not found!");
    }
  });
  
  await new Promise(r => setTimeout(r, 500));
  console.log("Zoom at 500ms:", await getZoom());
  
  await new Promise(r => setTimeout(r, 600));
  console.log("Zoom at 1100ms:", await getZoom());
  
  await browser.close();
})();
