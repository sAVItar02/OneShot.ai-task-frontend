import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./pieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const url = `https://oneshotai-task.herokuapp.com/api/v1/colleges/stats/sates`;

  const getData = async () => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const newChartData = {
          labels: result.data.states.map((item) => item._id),
          datasets: [
            {
              label: "Number of colleges in a state",
              data: result.data.states.map((item) => item.count),
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        };
        setChartData(newChartData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="chartSection" id="chart">
      <h2>State wise College Distribution</h2>
      <div className="chartContainer">
        <Doughnut data={chartData} />
      </div>
    </section>
  );
};

export default PieChart;
