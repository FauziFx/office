import React from "react";
import Chart from "react-apexcharts";

export function AreaChart({ series = [], labels = [] }) {
  const areaChartData = {
    series: series,
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      labels: labels,
      legend: {
        horizontalAlign: "left",
      },
    },
  };
  return (
    <Chart
      options={areaChartData.options}
      series={areaChartData.series}
      type="area"
      height={280}
    />
  );
}

export default AreaChart;
