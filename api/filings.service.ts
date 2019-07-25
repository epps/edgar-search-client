import { DEFAULT_COUNT } from './constants';

export function createFilingsResponse($: CheerioStatic, filingTypeTds: Cheerio) {
  const filings = [] as Array<IFilings>;

  filingTypeTds.each(function(i, element) {
    const type = $(element).text();

    const url = `https://www.sec.gov/${$(element)
      .next('td')
      .children('a')
      .attr('href')}`;

    const description = $(element)
      .siblings('td.small')
      .text();

    const date = $(element)
      .siblings('td:nth-child(4)')
      .text();

    filings.push({ type, url, description, date });
  });

  const [_, companyName, cik] = $('span.companyName')
    .text()
    .match(/(.+) CIK#: (\d+)/) || [null, null, null];

  return {
    success: true,
    companyName,
    cik,
    filings
  };
}

export function parseQueryParams({ query }) {
  const { tickerSymbol, page: pageString, count: countString } = query;
  const page = pageString ? parseInt(pageString, 10) : 1;
  const count = countString ? parseInt(countString, 10) : DEFAULT_COUNT;

  return { page, count, tickerSymbol };
}

export function createQueryString(tickerSymbol: string, page: number, count: number) {
  const start = page > 1 ? --page * count : '';

  return `?CIK=${tickerSymbol.toLowerCase()}&action=getcompany&count=${count}&start=${start}`;
}
