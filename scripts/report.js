const Excel = require('exceljs');

function generateExcelReport(pages) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Link Report');

  worksheet.columns = [
    { header: 'Page URL', key: 'url', width: 50 },
    { header: 'Number of Links', key: 'hits', width: 15 },
  ];

  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    worksheet.addRow({ url, hits });
  }

  const filename = 'link_report.xlsx';
  return workbook.xlsx.writeFile(filename);
}

function printReport(pages) {
  console.log("========");
  console.log("REPORT");
  console.log("========");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    console.log(`Found ${hits} links to page ${url}`);
  }
  console.log("========");
  console.log("END REPORT");
  console.log("========");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  printReport,
  generateExcelReport,
  sortPages,
};