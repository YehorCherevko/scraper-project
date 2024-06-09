const { scrapeCatalogues } = require('./scraper');
const { downloadPDFs } = require('./downloader');
const { saveCatalogueInfo } = require('./utils');

// Define the URL
const catalogueUrl = 'https://www.tus.si/#s2';

(async () => {
  try {
    const catalogueInfo = await scrapeCatalogues(catalogueUrl);
    saveCatalogueInfo(catalogueInfo, 'catalogueInfo.json');
    await downloadPDFs(catalogueInfo, './pdfs');
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
