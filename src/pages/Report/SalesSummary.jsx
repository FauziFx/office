import React, { useState } from "react";
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWRImmutable from "swr/immutable";
import { CheckCircle } from "lucide-react";
import { useSWRConfig } from "swr";
import dayjs from "dayjs";

export function SalesSummary() {
  const { mutate } = useSWRConfig();
  const [dateFilter, setDateFilter] = useState("");
  const [typeId, setTypeId] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Query string berdasarkan filter
  const query = new URLSearchParams({});
  if (typeId) query.append("typeId", typeId);
  if (startDate) query.append("startDate", startDate);
  const adjustedEndDate = new Date(endDate);
  adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
  const finalEndDate = adjustedEndDate.toISOString().split("T")[0];
  if (endDate) query.append("endDate", finalEndDate);

  const handleDateFilter = (e) => {
    const value = e.target.value;
    const today = dayjs();
    setDateFilter(value);

    switch (value) {
      case "today":
        setStartDate(today.format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        mutate(
          `/reports/summary?startDate=${today.format(
            "YYYY-MM-DD"
          )}&endDate=${today.format("YYYY-MM-DD")}`
        );
        break;
      case "yesterday":
        const yesterday = today.subtract(1, "day");
        setStartDate(yesterday.format("YYYY-MM-DD"));
        setEndDate(yesterday.format("YYYY-MM-DD"));
        mutate(
          `/reports/summary?startDate=${yesterday.format(
            "YYYY-MM-DD"
          )}&endDate=${yesterday.format("YYYY-MM-DD")}`
        );
        break;
      case "last7days":
        setStartDate(today.subtract(6, "day").format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        mutate(
          `/reports/summary?startDate=${today
            .subtract(6, "day")
            .format("YYYY-MM-DD")}&endDate=${today.format("YYYY-MM-DD")}`
        );
        break;
      case "thismonth":
        setStartDate(today.startOf("month").format("YYYY-MM-DD"));
        setEndDate(today.format("YYYY-MM-DD"));
        mutate(
          `/reports/summary?startDate=${today
            .startOf("month")
            .format("YYYY-MM-DD")}&endDate=${today.format("YYYY-MM-DD")}`
        );
        break;
      default:
        break;
    }
  };

  const revenueKey = `/reports/summary?${query.toString()}`;
  const customerKey = `/reports/top-customers?${query.toString()}`;
  const typeKey = `/transaction-types`;

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  function formatCurrency(amount, locale = "id-ID", currency = "IDR") {
    const validAmount = amount ?? 0;
    return validAmount.toLocaleString(locale, {
      style: "currency",
      currency: currency,
    });
  }

  const {
    data: dataRevenue,
    error: errRevenue,
    isLoading: isLoadRevenue,
  } = useSWRImmutable(revenueKey, fetcher);

  const {
    data: dataCustomer,
    error: errCustomer,
    isLoading: isLoadCustomer,
  } = useSWRImmutable(customerKey, fetcher);

  const {
    data: dataType,
    error: errType,
    isLoading: isLoadType,
  } = useSWRImmutable(typeKey, fetcher);

  if (errRevenue || errCustomer || errType) return <p>Error loading data.</p>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales Summary</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <select
            className="select select-sm w-full md:w-1/4"
            value={dateFilter}
            onChange={(e) => handleDateFilter(e)}
          >
            <option value="">Custom</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="thismonth">This Month</option>
          </select>
          <div className="flex gap-1 items-center w-full md:w-1/3">
            <fieldset className="fieldset w-full py-0 md:w-1/2">
              <legend className="fieldset-legend font-normal md:hidden py-1">
                From
              </legend>
              <label className="join shadow">
                <button className="join-item btn btn-sm font-normal hidden md:block">
                  From
                </button>
                <input
                  type="date"
                  className="join-item rounded-l md:rounded-l-none md:rounded-r input input-sm"
                  value={startDate || ""}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setDateFilter("");
                  }}
                />
              </label>
            </fieldset>
            <span className="pt-4 md:pt-0">-</span>
            <fieldset className="fieldset w-full py-0 md:w-1/2">
              <legend className="fieldset-legend font-normal md:hidden py-1">
                To
              </legend>
              <label className="join shadow">
                <button className="join-item btn btn-sm font-normal hidden md:block">
                  To
                </button>
                <input
                  type="date"
                  className="join-item rounded-l md:rounded-l-none md:rounded-r input input-sm"
                  value={endDate || ""}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setDateFilter("");
                  }}
                />
              </label>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="card bg-white shadow-md mt-4 p-2 pb-6">
        <div className="bg-white shadow-md rounded-xl p-4 md:p-6 mb-2">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="text-xl md:text-2xl font-semibold text-green-600">
            {isLoadRevenue
              ? "0"
              : formatCurrency(
                  dataRevenue?.totalRevenue + dataRevenue?.totalRetail
                ) || 0}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex flex-row w-full md:w-1/3 rounded-box border border-base-content/5 bg-base-100">
            <table className="table w-full table-sm table-zebra">
              <tbody>
                <tr>
                  <td className="font-bold text-lg">Revenue</td>
                  <td className="font-bold text-lg">
                    {isLoadRevenue
                      ? "0"
                      : formatCurrency(
                          dataRevenue?.totalRevenue + dataRevenue?.totalRetail
                        ) || 0}
                  </td>
                </tr>
                {isLoadRevenue
                  ? ""
                  : dataRevenue?.customerIncludeRevenue.map(
                      ({ customer, total_amount }, index) => (
                        <tr key={index}>
                          <td className="font-medium">{customer.name}</td>
                          <td>{formatCurrency(parseInt(total_amount))}</td>
                        </tr>
                      )
                    )}
                <tr>
                  <td className="font-medium">Retails / Eceran</td>
                  <td>
                    {isLoadRevenue
                      ? "0"
                      : formatCurrency(
                          parseInt(dataRevenue?.totalRetail || "0")
                        )}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Total Items Sold</td>
                  <td>
                    {isLoadRevenue ? "0" : dataRevenue?.totalItemSold || "0"}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Total Transactions</td>
                  <td>
                    {isLoadRevenue ? "0" : dataRevenue?.totalTransaction || "0"}
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Avg. Transaction</td>
                  <td>
                    {isLoadRevenue
                      ? "0"
                      : formatCurrency(dataRevenue?.average) || "0"}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td className="font-bold text-lg" colSpan={2}>
                    Sales By Payment Method{" "}
                    <span className="text-xs font-normal text-gray-500">
                      (Include Revenue)
                    </span>
                  </td>
                </tr>
                {isLoadRevenue
                  ? ""
                  : dataRevenue?.salesByPaymentMethod.map(
                      ({ payment_method, total_amount }, index) => (
                        <tr key={index}>
                          <td className="font-medium capitalize">
                            {payment_method}
                          </td>
                          <td>{formatCurrency(parseInt(total_amount))}</td>
                        </tr>
                      )
                    )}
                <tr>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td className="font-bold text-lg" colSpan={2}>
                    Sales By Transaction Type
                  </td>
                </tr>
                {isLoadRevenue
                  ? ""
                  : dataRevenue?.salesByTransactionType.map(
                      ({ transactionType, total_amount }, index) => (
                        <tr key={index}>
                          <td className="font-medium">
                            {transactionType.name}
                          </td>
                          <td>{formatCurrency(parseInt(total_amount))}</td>
                        </tr>
                      )
                    )}
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-2/3 rounded-box border border-base-content/5 bg-base-100">
            <div className="p-2 flex justify-between">
              <h2 className="text-lg font-bold w-full">Top Customers</h2>
              <select
                className="select select-sm"
                value={typeId}
                onChange={(e) => {
                  setTypeId(e.target.value);
                  mutate(customerKey);
                }}
              >
                <option value="">All</option>
                {!isLoadType &&
                  dataType.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <table className="table w-full table-sm table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Store</th>
                  <th>Type</th>
                  <th className="text-center">Include Revenue</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {isLoadCustomer ? (
                  <LoadingTable row="5" colspan="5" />
                ) : (
                  dataCustomer?.map(
                    (
                      { name, include_revenue, transactionType, total_amount },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="font-medium">{name}</td>
                        <td>
                          <div className="badge badge-soft badge-neutral badge-xs">
                            {transactionType.name}
                          </div>
                        </td>
                        <td>
                          {include_revenue === 1 ? (
                            <CheckCircle className="h-4 w-4 text-success mx-auto" />
                          ) : (
                            ""
                          )}
                        </td>
                        <td>{formatCurrency(parseInt(total_amount))}</td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesSummary;
