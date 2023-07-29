import React from "react";
import { Bar } from "react-chartjs-2";
import {Title,
    Tooltip,
    Legend,CategoryScale, BarElement,LinearScale, Chart } from "chart.js";
Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const CaseChart = ({ displayMode, data }) => {
    console.log('chartDAta',displayMode,data)
  const chartData = {
    labels: displayMode=='stateWise'?data?.map((result) => result?.state):Object.keys(data),
    datasets: displayMode=='stateWise'?[
      {
        label: "New Cases",
        data: data?.map((result) => result["new cases"]),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Recoveries",
        data: data?.map((result) => result?.recoveries),
        backgroundColor: "rgba(192, 75, 192, 0.2)",
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Deaths",
        data: data.map((result) => result.deaths),
        backgroundColor: "rgba(192, 192, 75, 0.2)",
        borderColor: "rgba(192, 192, 75, 1)",
        borderWidth: 1,
      },
    ]:[
        { label: "Cases",
          data: Object.values(data),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },],
  };

  
  const legendOptions = {
    display: false,
    position: "top",
    align: "center",
    labels: {
      usePointStyle: true, // To use point style for legend labels
    },
  };

  return chartData ? (
    <Bar data={chartData} options={{
        
        scales: {
          y: { beginAtZero: true },
        },
        
          legend: legendOptions,
        
      }} />
  ) : null;
};

export default CaseChart;
