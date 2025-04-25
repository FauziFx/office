import React, { useState } from "react";
import { Box, ChartNoAxesCombined, Receipt, TrendingUp } from "lucide-react";
import api from "@/utils/api";
import {
  LoadingDashboard,
  DonutChart,
  AreaChart,
  BarChart,
  ColumnChart,
} from "../../components";
import dayjs from "dayjs"; // Core Day.js
import utc from "dayjs/plugin/utc"; // Plugin UTC
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone
import { Link } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import useSWR, { useSWRConfig } from "swr";

// Extend plugins ke Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

export function Dashboard() {
  const { mutate } = useSWRConfig();
  const today = dayjs();
  const [dateFilter, setDateFilter] = useState("last7days");
  const [startDate, setStartDate] = useState(
    today.subtract(6, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(today.format("YYYY-MM-DD"));

  const handleDateFilter = (e) => {
    const value = e.target.value;
    setDateFilter(value);

    switch (value) {
      case "today":
        setStartDate(today.format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        break;
      case "yesterday":
        const yesterday = today.subtract(1, "day");
        setStartDate(yesterday.format("YYYY-MM-DD"));
        setEndDate(yesterday.format("YYYY-MM-DD"));
        break;
      case "last7days":
        setStartDate(today.subtract(6, "day").format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        break;
      case "thismonth":
        setStartDate(today.startOf("month").format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        break;
      default:
        break;
    }
  };

  function formatCurrency(amount, locale = "id-ID", currency = "IDR") {
    const validAmount = amount ?? 0;
    return validAmount.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  }

  const query = new URLSearchParams({});
  if (startDate) query.append("startDate", startDate);
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
  const finalEndDate = adjustedEndDate.toISOString().split("T")[0];
  if (endDate) query.append("endDate", finalEndDate);

  const getStatisticCard = async (url) => {
    try {
      const response = await api.get(`/reports${url}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: dataCard,
    error: errCard,
    isLoading: isLoadCard,
  } = useSWR(`/summary?${query.toString()}`, getStatisticCard, {
    revalidateOnFocus: false,
  });

  if (errCard) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-2 md:items-center mb-4 rounded-md shadow-md bg-white p-4">
        <select
          className="select select-sm w-full md:w-1/4 mb-2 md:mb-0"
          value={dateFilter}
          onChange={(e) => handleDateFilter(e)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="thismonth">This Month</option>
        </select>
        <div className="w-full md:w-1/2 items-center text-xs">
          <span>
            {dayjs(startDate).tz("Asia/Jakarta").format("DD MMM YYYY")}
          </span>
          <span className=" text-gray-700"> - </span>
          <span>{dayjs(endDate).tz("Asia/Jakarta").format("DD MMM YYYY")}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary text-primary-content p-4 py-6 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-sm font-semibold mb-2">Revenue</h3>
            <p className="text-lg font-bold">
              {isLoadCard ? "Rp 0,00" : formatCurrency(dataCard.totalRevenue)}
            </p>
          </div>
          <TrendingUp className="w-5 h-5 opacity-75" />
        </div>
        <div className="bg-secondary text-secondary-content p-4 py-6 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-sm font-semibold mb-2">Avg. Sale Value</h3>
            <p className="text-lg font-bold">
              {isLoadCard ? "Rp 0,00" : formatCurrency(dataCard.average)}
            </p>
          </div>
          <ChartNoAxesCombined className="w-5 h-5 opacity-75" />
        </div>
        <div className="bg-accent text-accent-content p-4 py-6 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-sm font-semibold mb-2">Total Item Sold</h3>
            <p className="text-lg font-bold">
              {(isLoadCard ? "0" : dataCard.totalItemSold) || "0"}
            </p>
          </div>
          <Box className="w-5 h-5 opacity-75" />
        </div>
        <div className="bg-neutral text-neutral-content p-4 py-6 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-sm font-semibold mb-2">Total Transaction</h3>
            <p className="text-lg font-bold">
              {(isLoadCard ? "0" : dataCard.totalTransaction) || "0"}
            </p>
          </div>
          <Receipt className="w-5 h-5 opacity-75" />
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
        <div className="mb-4 bg-white border border-gray-300 rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-2">Transaction Trend</h2>
            <label className="swap swap-rotate bg-primary text-white p-4 py-1 rounded">
              <input
                type="checkbox"
                // checked={!patient6Month} // Jika "checked", berarti 12 bulan
                // onChange={() => setPatient6Month(!patient6Month)}
              />
              <div className="text-xs swap-on">Last 30 Days</div>
              <div className="text-xs swap-off">Last 7 Days</div>
            </label>
          </div>
          <AreaChart />
        </div>

        <div className="mb-4 bg-white border border-gray-300 rounded-xl shadow-md p-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold mb-2">Top Selling Products</h2>
            <label className="swap swap-rotate bg-primary text-white p-4 py-1 rounded">
              <input
                type="checkbox"
                // checked={!medicalRecord6Month} // Jika "checked", berarti 12 bulan
                // onChange={() => setMedicalRecord6Month(!medicalRecord6Month)}
              />
              <div className="text-xs swap-on">Last 30 Days</div>
              <div className="text-xs swap-off">Last 7 Days</div>
            </label>
          </div>
          <BarChart />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="mb-4 bg-white border border-gray-300 rounded-xl shadow-md p-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <ColumnChart />
        </div>
        <div className="mb-4 bg-white border border-gray-300 rounded-xl shadow-md p-4">
          <h2 className="font-semibold mb-2">Sales by Category</h2>
          <div className="flex justify-center items-center">
            <DonutChart />
          </div>
        </div>
      </div> */}
    </div>
    // <LoadingDashboard />
  );
}

export default Dashboard;
