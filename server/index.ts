import { config } from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

// Configure Environmental Variables
config();

const app = express();
const port = process.env.PORT || 3000;
const EDGAR_BASE_URL = 'http://www.sec.gov/cgi-bin/browse-edgar';

app.get('/filings', async (req, res) => {
  if (!req.query.tickerSymbol) return res.status(400).send('Ticker symbol is required.');
  const tickerSymbol = req.query.tickerSymbol.toLowerCase();

  const response = await fetch(`${EDGAR_BASE_URL}?CIK=${tickerSymbol}&action=getcompany`);

  if (response.status !== 200) return res.status(response.status).end();

  const body = await response.text();

  const $ = cheerio.load(body);

  const [_, companyName, cik] = $('span.companyName')
    .text()
    .match(/(.+) CIK#: (\d+)/) || [null, null, null];

  const filingTypeTds = $('table[summary="Results"] tbody tr td:nth-child(1)');
  const filings = [] as Array<{ type: string; url: string; description: string }>;

  filingTypeTds.each(function(i, element) {
    const type = $(this).text();

    const url = `https://www.sec.gov/${$(this)
      .next('td')
      .children('a')
      .attr('href')}`;

    const description = $(this)
      .siblings('td.small')
      .text();

    filings.push({ type, url, description });
  });

  res.json({
    companyName,
    cik,
    filings
  });
});

app.listen(port, () => console.log(`Server listening on port ${port} ...`));
