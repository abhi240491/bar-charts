import { stateMappings } from "./constants";

export const arrangeDataByState = (data) => {
    const results = {};
  
    data.forEach((result) => {
      const state = stateMappings[result.state] || result.state; // Use the mapped state name if available
      if (!results[state]) {
        results[state] = {
          "new cases": 0,
          recoveries: 0,
          deaths: 0,
          state,
        };
      }
      results[state]["new cases"] += result["new cases"];
      results[state].recoveries += result.recoveries;
      results[state].deaths += result.deaths;
    });
  
    // Fill in default values for states with no data available
    const allStateNames = Object.values(results).map((result) => result.state);
    const uniqueStateNames = [...new Set(allStateNames)];
    uniqueStateNames.forEach((stateName) => {
      if (!results[stateName]) {
        results[stateName] = {
          "new cases": 0,
          recoveries: 0,
          deaths: 0,
          state: stateName,
        };
      }
    });
  
    return Object.values(results);
  };

  export const calculateTotals = (data) => {
    let totalNewCases = 0;
    let totalRecoveries = 0;
    let totalDeaths = 0;
  
    data.forEach(({ "new cases": newCases, recoveries, deaths }) => {
      totalNewCases += newCases;
      totalRecoveries += recoveries;
      totalDeaths += deaths;
    });
  
    return {
      "Total New Cases": totalNewCases,
      "Total Recoveries": totalRecoveries,
      "Total Deaths": totalDeaths,
    };
  };

  export const getProperStateName = (state) => {
    const properState = stateMappings[state];
    if (properState) {
      return properState;
    } else {
      const stateNames = Object.values(stateMappings);
      const matchedState = stateNames.find((name) => name.toLowerCase().includes(state.toLowerCase()));
      if (matchedState) {
        return matchedState;
      } else {
        let longestMatch = '';
        stateNames.forEach((name) => {
          if (state.toLowerCase().includes(name.toLowerCase())) {
            if (name.length > longestMatch.length) {
              longestMatch = name;
            }
          }
        });
        return longestMatch || state;
      }
    }
  };