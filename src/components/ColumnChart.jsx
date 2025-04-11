import React from "react";
import Chart from "react-apexcharts";

export function ColumnChart({ series, labels }) {
  const columnChartData = {
    series: [
      {
        name: "Payment Method",
        data: [44, 34, 56, 23],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 5,
          borderRadiusApplication: "end", // 'around', 'end'
          borderRadiusWhenStacked: "last", // 'all', 'last'
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
      xaxis: {
        type: "text",
        categories: ["Cash", "Transfer", "Qris", "EDC"],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  };
  return (
    <Chart
      options={columnChartData.options}
      series={columnChartData.series}
      type="bar"
      height={220}
    />
  );
}

export default ColumnChart;
