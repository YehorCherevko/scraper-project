const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadPDFs(catalogueInfo, directory) {
  //Create directory if doesn't exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  // Iterate through catalogue information
  for (const catalogue of catalogueInfo) {
    const pdfURL = catalogue.pdfLink;
    const pdfPath = path.join(directory, `${catalogue.name}.pdf`);

    try {
      // Download PDF using axios
      const response = await axios({
        method: 'GET',
        url: pdfURL,
        responseType: 'stream',
      });

      // Write pdf to file
      const pdfWriter = fs.createWriteStream(pdfPath);
      response.data.pipe(pdfWriter);

      // Wait for PDF to finish writing
      await new Promise((resolve, reject) => {
        pdfWriter.on('finish', resolve);
        pdfWriter.on('error', reject);
      });

      console.log(`Downloaded: ${catalogue.name}`);
    } catch (error) {
      console.error(`Failed to download ${catalogue.name}:`, error);
    }
  }
}

module.exports = { downloadPDFs };
