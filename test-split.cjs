const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('file:///Users/Gin/Documents/GingetsuOrbit/index.html');
  
  // Wait for the timeline items to be rendered by main.js
  await page.waitForSelector('.timeline-item');
  
  // Get initial state
  const wrapperClassInitial = await page.$eval('#experience-wrapper', el => el.className);
  console.log('Initial wrapper class:', wrapperClassInitial);
  
  const timelineWidthInitial = await page.$eval('#experience-timeline', el => el.getBoundingClientRect().width);
  const panelWidthInitial = await page.$eval('#exp-details', el => el.getBoundingClientRect().width);
  console.log('Initial Timeline Width:', timelineWidthInitial);
  console.log('Initial Panel Width:', panelWidthInitial);
  
  // Click the first timeline item
  const items = await page.$$('.timeline-item');
  await items[0].click();
  
  // Wait a bit for the CSS transition
  await new Promise(r => setTimeout(r, 800));
  
  const wrapperClassAfter = await page.$eval('#experience-wrapper', el => el.className);
  console.log('After click wrapper class:', wrapperClassAfter);
  
  const timelineWidthAfter = await page.$eval('#experience-timeline', el => el.getBoundingClientRect().width);
  const panelWidthAfter = await page.$eval('#exp-details', el => el.getBoundingClientRect().width);
  console.log('After click Timeline Width:', timelineWidthAfter);
  console.log('After click Panel Width:', panelWidthAfter);
  
  // Click close button
  await page.click('#exp-details-close');
  
  // Wait for transition
  await new Promise(r => setTimeout(r, 800));
  const wrapperClassClosed = await page.$eval('#experience-wrapper', el => el.className);
  console.log('After close wrapper class:', wrapperClassClosed);
  
  await browser.close();
})();
