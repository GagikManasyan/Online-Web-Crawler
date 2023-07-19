const { crawlPage } = require('./crawl.js');
const { generateExcelReport } = require('./report.js');

async function main() {
  if (process.argv.length !== 3) {
    console.log("incorrect website format");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl of ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  generateExcelReport(pages)
    .then(() => {
      console.log('Excel report generated successfully.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error generating Excel report:', err);
      process.exit(1);
    });
}

main();