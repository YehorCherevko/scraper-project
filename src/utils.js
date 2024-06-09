const fs = require('fs');

// Function to save catalogue information to a JSON file
function saveCatalogueInfo(catalogueInfo, filename) {
  const jsonData = JSON.stringify(catalogueInfo, null, 2);
  fs.writeFileSync(filename, jsonData);
}

module.exports = { saveCatalogueInfo };
