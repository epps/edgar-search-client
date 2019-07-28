import React, { useState } from "react";
import ResultsTable from "./ResultsTable";
import { RESULT_COUNTS } from "./constants";

const FilingsSearch = () => {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [count, setCount] = useState(RESULT_COUNTS[0]);
  const [page, setPage] = useState(1);
  const [filings, setFilings] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);

  async function getFilings() {
    fetch(
      `http://localhost:3000/filings?tickerSymbol=${tickerSymbol}&count=${count}&page=${page}`
    )
      .then(async response => {
        const { cik, companyName: name, filings } = await response.json();
        setFilings(filings);
        setCompanyDetails({ cik, name });
      })
      .catch(console.error);
  }

  return (
    <div className="row">
      <div className="col-4">
        <form
          onSubmit={e => {
            e.preventDefault();
            getFilings();
          }}
          className=""
        >
          <div className="form-group">
            <label htmlFor="tickerSymbol">Ticker Symbol</label>
            <input
              id="tickerSymbol"
              className="form-control"
              value={tickerSymbol}
              placeholder="Ticker Symbol"
              onChange={e => setTickerSymbol(e.target.value)}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="count">Count</label>
            <select
              id="count"
              className="form-control"
              value={count}
              onChange={e => setCount(e.target.value)}
              onBlur={e => setCount(e.target.value)}
            >
              {RESULT_COUNTS.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!tickerSymbol}
            >
              Search
            </button>
          </div>
          {filings.length === 0 ? (
            ""
          ) : (
            <div className="text-right">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={e => {
                    setPage(page - 1);
                    getFilings();
                  }}
                  hidden={page === 1}
                >
                  Previous Page
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={e => {
                    setPage(page + 1);
                    getFilings();
                  }}
                >
                  Next Page
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="col-8">
        {filings.length === 0 ? (
          <div className="text-center">
            <h2>No Results</h2>
            <p className="text-muted">
              Enter company's ticker symbol to search for filings
            </p>
          </div>
        ) : (
          <ResultsTable
            companyDetails={companyDetails}
            filings={filings}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default FilingsSearch;
