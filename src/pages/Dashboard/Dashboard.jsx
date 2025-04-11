import React, { useState } from "react";
import Chart from "react-apexcharts";
import {
  Book,
  BookPlus,
  Box,
  ChartNoAxesCombined,
  Eye,
  Package,
  Receipt,
  ShoppingBag,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";
import api from "@/utils/api";
import useSWR from "swr";
import {
  LoadingDashboard,
  DonutChart,
  LoadingTable,
  AreaChart,
  BarChart,
  ColumnChart,
} from "../../components";
import dayjs from "dayjs"; // Core Day.js
import utc from "dayjs/plugin/utc"; // Plugin UTC
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone
import { Link } from "react-router-dom";

// Extend plugins ke Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

export function Dashboard() {
  // const [patient6Month, setPatient6Month] = useState(true);
  // const [medicalRecord6Month, setMedicalRecord6Month] = useState(true);

  // const fetcher = async (url) => {
  //   try {
  //     const response = await api.get(url);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const { data, error, isLoading } = useSWR(`/dashboard/summary`, fetcher, {
  //   revalidateOnFocus: false,
  // });
  // const {
  //   data: dataPatient,
  //   error: errorPatient,
  //   isLoading: isLoadingPatient,
  // } = useSWR(`/patient?limit=5`, fetcher, { revalidateOnFocus: false });

  // if (error || errorPatient) return <p>Error loading data.</p>;
  // if (isLoading) return <LoadingDashboard />;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-primary text-primary-content p-4 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-md font-semibold mb-2">Revenue</h3>
            <p className="text-xl font-bold">
              Rp 1.500.000 <span className="text-xs font-normal">(Today)</span>
            </p>
            <p className="text-sm font-normal">
              Rp 1.500.000 <span className="text-xs font-normal">(Month)</span>
            </p>
          </div>
          <TrendingUp className="w-8 h-8 opacity-75" />
        </div>
        <div className="bg-secondary text-secondary-content p-2 px-4 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-md font-semibold mb-2">Avg. Sale Value</h3>
            <p className="text-xl font-bold">
              Rp 1.500.000 <span className="text-xs font-normal"></span>
            </p>
            <p>&nbsp;</p>
          </div>
          <ChartNoAxesCombined className="w-8 h-8 opacity-75" />
        </div>
        <div className="bg-accent text-accent-content p-2 px-4 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-md font-semibold mb-2">Total Item Sold</h3>
            <p className="text-xl font-bold">100</p>
            <p className="text-xs pt-1 font-normal">Today</p>
          </div>
          <Box className="w-8 h-8 opacity-75" />
        </div>
        <div className="bg-neutral text-neutral-content p-2 px-4 shadow-md flex justify-between items-center rounded-xl">
          <div>
            <h3 className="text-md font-semibold mb-2">Total Transaction</h3>
            <p className="text-xl font-bold">100</p>
            <p className="text-xs pt-1 font-normal">Today</p>
          </div>
          <Receipt className="w-8 h-8 opacity-75" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
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
      </div>
    </div>
    // <LoadingDashboard />
  );
}

export default Dashboard;
