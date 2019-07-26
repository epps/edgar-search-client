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
    <div className="pure-g">
      <div className="pure-u-1-3">
        <form
          onSubmit={e => {
            e.preventDefault();
            getFilings();
          }}
          className="pure-form pure-form-aligned"
        >
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="tickerSymbol">Ticker Symbol</label>
              <input
                id="tickerSymbol"
                value={tickerSymbol}
                placeholder="Ticker Symbol"
                onChange={e => setTickerSymbol(e.target.value)}
                type="text"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="count">Count</label>
              <select
                id="count"
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
            <div className="pure-controls">
              <button
                type="submit"
                className="pure-button pure-button-primary"
                disabled={!tickerSymbol}
              >
                Search
              </button>
              {filings.length === 0 ? (
                ""
              ) : (
                <div className="pure-button-group" role="group">
                  <button
                    className="pure-button"
                    onClick={e => {
                      setPage(page - 1);
                      getFilings();
                    }}
                    hidden={page === 1}
                  >
                    <span>
                      <i className="fas fa-angle-left"></i>
                    </span>
                    Previous Page
                  </button>
                  <button
                    className="pure-button"
                    onClick={e => {
                      setPage(page + 1);
                      getFilings();
                    }}
                  >
                    Next Page
                    <span>
                      <i className="fas fa-angle-right"></i>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </fieldset>
        </form>
      </div>
      <div className="pure-u-2-3">
        {filings.length === 0 ? (
          <h2>No Results</h2>
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
