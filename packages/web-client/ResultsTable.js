import React from "react";

const ResultsTable = ({ companyDetails, filings, page }) => {
  return (
    <div>
      <div className="results">
        <h2>
          Company:{" "}
          <span className="text-muted">
            {companyDetails && companyDetails.name}
          </span>
        </h2>
        <h3>
          CIK:{" "}
          <span className="text-muted">
            {companyDetails && companyDetails.cik}
          </span>
        </h3>
        <h5>Page {page}</h5>
      </div>
      <table className="table tabel-borderless table-hover">
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
