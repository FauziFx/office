import React from "react";
import Chart from "react-apexcharts";

export function DonutChart({ series, labels }) {
  const donutChartData = {
    series: [44, 55, 13, 33],
    options: {
      chart: {
        type: "pie",
        height: 350,
      },
      colors: [
        "#422ad5", // Primary
        "#f43098", // Secondary
        "#00d3bb", // Accent
        "#09090b", // Neutral
        "#00bafe", // Info
        "#00d390", // Success
        "#fcb700", // Warning
        "#ff637d", // Error
      ],
      legend: {
        position: "right",
        offsetY: 0,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <Chart
      options={donutChartData.options}
      series={donutChartData.series}
      type="pie"
      height={300}
    />
  );
}

export default DonutChart;
