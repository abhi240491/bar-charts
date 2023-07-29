import React from "react";

const DataTable = ({ displayMode,data }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "70%" }}>
      <thead>
        {displayMode=='stateWise'?
        <tr>
          <th style={{ border: "1px solid black", textAlign: "left", padding: "8px" }}>State</th>
          <th style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>New Cases</th>
          <th style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>Recoveries</th>
          <th style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>Deaths</th>
        </tr>:
        <tr>
        {Object.keys(data).map((e,i)=><th key={i} style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>{e}</th>)}      </tr>}
      </thead>
      {displayMode=='stateWise'?<tbody>
        {data.map((result) => (
          <tr key={result.state}>
            <td style={{ border: "1px solid black", textAlign: "left", padding: "8px" }}>{result.state}</td>
            <td style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>{result["new cases"]}</td>
            <td style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>{result.recoveries}</td>
            <td style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>{result.deaths}</td>
          </tr>
        ))}
      </tbody>:
      <tbody>
        <tr>
        {Object.values(data).map((e,i)=><td key={i} style={{ border: "1px solid black", textAlign: "center", padding: "8px" }}>{e}</td>)}
        </tr>
        </tbody>}
    </table>
  );
};

export default DataTable;
