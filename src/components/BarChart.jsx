import React from "react";
import Chart from "react-apexcharts";

export function BarChart({ series, labels }) {
  const barChartData = {
    series: [
      {
        name: "",
        data: series,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      legend: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          distributed: true,
          borderRadiusApplication: "end",
          horizontal: true,
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
      xaxis: {
        categories: labels,
      },
    },
  };
  return (
    <Chart
      options={barChartData.options}
      series={barChartData.series}
      type="bar"
      height={280}
    />
  );
}

export default BarChart;
