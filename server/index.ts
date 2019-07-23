import { config } from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

// Configure Environmental Variables
config();

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  if (!req.query.tradingSymbol) {
    res.send('Please, provide a trading symbol');
    return;
  }

  const tradingSymbol = req.query.tradingSymbol.toLowerCase();

  const response = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${tradingSymbol}&apikey=${
      process.env.ALPHA_VANTAGE_API_KEY
    }`
  );

  if (response.status === 200) {
    const responseBody = await response.json();
    res.json(responseBody);
  } else {
    res.send(`No results found for trading symbol ${tradingSymbol}`);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port} ...`));
