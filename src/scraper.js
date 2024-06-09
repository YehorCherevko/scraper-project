const puppeteer = require('puppeteer');

async function scrapeCatalogues(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  // Wait for the '.card' element to be rendered
  await page.waitForSelector('.card');

  // Extract catalogue information from the page
  const catalogueInfo = await page.evaluate(() => {
    // Select all elements with class 'card.card-catalogue'
    const cards = document.querySelectorAll('.card.card-catalogue');
    const catalogueInfoArray = [];

    // Iterate over each card element
    cards.forEach((card) => {
      // Extract name, endDate, and pdfLink from each card
      const name = card.querySelector('h3 a').innerText.trim();
      const endDate = card.querySelector('time:last-child').getAttribute('datetime');
      const pdfLink = card.querySelector('.link-icon.solid.pdf').getAttribute('href');

      catalogueInfoArray.push({ name, endDate, pdfLink });
    });

    return catalogueInfoArray;
  });

  await browser.close();

  return catalogueInfo;
}

module.exports = { scrapeCatalogues };
