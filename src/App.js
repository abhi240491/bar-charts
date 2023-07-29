import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  arrangeDataByState,
  calculateTotals,
  getProperStateName,
} from "./utilities";
import CaseChart from "./chart";
import DataTable from "./data-table";

const extractData = (line) => {
  const parts = line?.split(/\s+in\s+/);
  if (parts.length !== 2) {
    return null;
  }

  const state = parts[1].trim();
  const countsString = parts[0];

  const newCasesMatch = countsString.match(/(\d+)\s+new\s+case(?:s)?/i);
  const recoveriesMatch = countsString.match(/(\d+)\s+recover(?:ies)?/i);
  const deathsMatch = countsString.match(/(\d+)\s+death(?:s)?/i);

  const newCases = newCasesMatch ? parseInt(newCasesMatch[1]) : 0;
  const recoveries = recoveriesMatch ? parseInt(recoveriesMatch[1]) : 0;
  const deaths = deathsMatch ? parseInt(deathsMatch[1]) : 0;

  return {
    "new cases": newCases,
    recoveries,
    deaths,
    state: getProperStateName(state),
  };
};

function App() {
  const [allCases, setAllCases] = useState([]);
  const [casesByStates, setCasesByStates] = useState([]);
  const [displayMode, setDisplayMode] = useState("");
  const [displayData, setDisplayData] = useState({});
  const [totCases, setTotCases] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const resp = await axios.get(
        "https://mocki.io/v1/b2ac46d3-385d-448a-a77a-9bc2c5b5dcbc"
      );
      if (resp.data != null) {
        const results = resp?.data?.data
          ?.flatMap((line) => line?.update?.split("\n")) // Split lines with '\n' and flatten the result
          .map(extractData)
          .filter((result) => result !== null);
        setAllCases(results);
        setDisplayMode("stateWise");
        setDisplayData({ stateWise: arrangeDataByState(results) });
        setCasesByStates(arrangeDataByState(results));
        const totalData = calculateTotals(results);
        setTotCases(totalData);
        console.log(totalData);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const handleDisplayModeChange = (event) => {
    const display = event.target.value;
    setDisplayMode(display);
    if (display == "stateWise") {
      setDisplayData({ [display]: casesByStates });
    } else {
      setDisplayData({ [display]: totCases });
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <main className="main-component">
        <select value={displayMode} onChange={handleDisplayModeChange}>
          <option value="totalCases">Total Cases</option>
          <option value="stateWise">State-wise Data</option>
        </select>
        
        {          
        displayMode && displayData[displayMode]!=null&&Object.keys(displayData[displayMode]).length > 0 && (
          <>
            <div className={"chart-container"}>
              <CaseChart
                displayMode={displayMode}
                data={displayData[displayMode]}
              />
            </div>
             <div className={"table-container"}>
              <DataTable
                displayMode={displayMode}
                data={displayData[displayMode]}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
