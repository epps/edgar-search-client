interface IFilingsResponse {
  success: boolean;
  companyName: string;
  cik: string;
  filings: Array<IFilings>;
  page: number;
  count: number;
  message?: string;
}

interface IFilings {
  type: string;
  url: string;
  description: string;
  date: string;
}
