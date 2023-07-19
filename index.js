const express = require('express');
const app = express();
const path = require('path');
const { crawlPage, generateExcelReport } = require('./crawl');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate-report', async (req, res) => {
  const baseURL = req.body.link;
  const pages = await crawlPage(baseURL, baseURL, {});
  generateExcelReport(pages)
    .then(() => {
      const filename = 'link_report.xlsx';
      res.download(filename, () => {
        // Cleanup: remove the generated Excel file after download
        const fs = require('fs');
        fs.unlinkSync(filename);
      });
    })
    .catch((err) => {
      res.status(500).send('Error generating Excel report.');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});