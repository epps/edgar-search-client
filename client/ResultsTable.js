import React from "react";

const ResultsTable = ({ companyDetails, filings, page }) => {
  return (
    <div>
      <div>
        <h2>{companyDetails && companyDetails.name}</h2>
        <h2>{companyDetails && companyDetails.cik}</h2>
        <h3>Page {page}</h3>
      </div>
      <table className="pure-table pure-table-horizontal pure-table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>View</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filings.map(({ type, url, date }) => (
            <tr key={url}>
              <td>{type}</td>
              <td>
                <a href={url} target="_blank">
                  View Filing
                </a>
              </td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
