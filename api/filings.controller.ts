import fetch from "node-fetch";
import cheerio from "cheerio";
import { EDGAR_BASE_URL } from "./constants";
import {
  createFilingsResponse,
  parseQueryParams,
  createQueryString
} from "./filings.service";

export async function filingsController(req, res) {
  if (!req.query.tickerSymbol)
    return res.status(400).send("Ticker symbol is required.");

  const { tickerSymbol, page, count } = parseQueryParams(req);

  const response = await fetch(
    `${EDGAR_BASE_URL}${createQueryString(tickerSymbol, page, count)}`
  );

  if (response.status !== 200) return res.status(response.status).end();

  const body = await response.text();
  const $ = cheerio.load(body);

  const noMatchingTickerSymbol = $("center > h1").text();
  if (noMatchingTickerSymbol)
    return res.json({
      success: false,
      message: `No matches found for ticker symbol ${tickerSymbol}`
    });

  const filingTypeTds = $('table[summary="Results"] tbody tr td:nth-child(1)');
  const filingsResponse = Object.assign(
    createFilingsResponse($, filingTypeTds),
    { page, count }
  );

  res.json(filingsResponse);
}
