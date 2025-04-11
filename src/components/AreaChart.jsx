import React from "react";
import Chart from "react-apexcharts";

export function AreaChart({ series, labels }) {
  const areaChartData = {
    series: [
      {
        name: "Grosir",
        data: [1000, 1231, 2342, 2349, 3121],
      },
      {
        name: "MA Grup",
        data: [2343, 2342, 1231, 3121, 2349],
      },
    ],
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
      labels: ["01-01", "02-01", "03-01", "04-01", "05-01"],
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
    />
  );
}

export default AreaChart;
