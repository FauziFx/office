import {
  Banknote,
  CircleMinus,
  CirclePlus,
  CreditCard,
  QrCode,
  Repeat,
  Settings,
} from "lucide-react";
import React, { useState } from "react";
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWR from "swr";
import dayjs from "dayjs"; // Core Day.js
import utc from "dayjs/plugin/utc"; // Plugin UTC
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone
// Extend plugins ke Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

export function SalesHistory() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };

  const [search, setSearch] = useState("");
  const [typeId, setTypeId] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [detail, setDetail] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15

  // Query string berdasarkan filter
  const query = new URLSearchParams({ page, limit, detail });
  if (search) query.append("search", search);
  if (typeId) query.append("typeId", typeId);
  if (startDate) query.append("startDate", startDate);
  if (endDate) query.append("endDate", endDate);

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const dataType = await api.get("/transaction-types");

      const data = {
        dataType: dataType.data.data,
        dataTransaction: response.data.data,
        totalData: response.data.totalData,
        totalPages: response.data.totalPages,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/transactions?${query.toString()}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales History</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by Invoice"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">All</option>
            {!isLoading &&
              data.dataType.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div className="flex gap-1 items-center w-full md:w-1/2">
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
                  onChange={(e) => setStartDate(e.target.value)}
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
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[768px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "",
                "Date & Time",
                "Receipt No",
                "Total",
                "Payment",
                "Type",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-2 text-left"
                >
                  <p
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    {el}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {isLoading ? (
              <LoadingTable row="10" colspan="6" />
            ) : (
              data.dataTransaction.map(
                (
                  {
                    id,
                    date,
                    receipt_no,
                    total_amount,
                    payment_method,
                    transactionType,
                    details,
                  },
                  index
                ) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="border-b border-gray-200" width="1%">
                        <button
                          className="btn btn-xs btn-ghost btn-circle my-1"
                          onClick={() => toggleRow(id)}
                        >
                          {openRow === id ? (
                            <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                          ) : (
                            <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                          )}
                        </button>
                      </td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs font-semibold capitalize">
                          {dayjs(date).tz("Asia/Jakarta").format("DD MMM YYYY")}
                        </p>
                        <p className="text-xs text-gray-500 font-light">
                          {dayjs(date).tz("Asia/Jakarta").format("hh:mm")}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">{receipt_no}</td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs font-semibold capitalize">
                          Rp {total_amount}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">
                        {payment_method == "cash" ? (
                          <div className="badge badge-soft badge-neutral badge-xs">
                            <Banknote className="h-3 w-3" />
                            Cash
                          </div>
                        ) : payment_method == "qris" ? (
                          <div className="badge badge-soft badge-neutral badge-xs">
                            <QrCode className="h-3 w-3" />
                            QRIS
                          </div>
                        ) : payment_method == "edc" ? (
                          <div className="badge badge-soft badge-neutral badge-xs">
                            <CreditCard className="h-3 w-3" />
                            EDC
                          </div>
                        ) : (
                          <div className="badge badge-soft badge-neutral badge-xs">
                            <Repeat className="h-3 w-3" />
                            Transfer
                          </div>
                        )}
                      </td>
                      <td className="border-b border-gray-200">
                        <div className="badge badge-xs badge-soft badge-neutral">
                          {transactionType.name}
                        </div>
                      </td>
                    </tr>
                    {openRow === id && (
                      <tr className="bg-gray-100">
                        <td
                          className="border border-gray-300 px-6 py-2"
                          colSpan={6}
                        >
                          <table>
                            <tbody>
                              {details.map(
                                (
                                  { productName, variantName, qty, subtotal },
                                  index
                                ) => (
                                  <tr key={index}>
                                    <td className="py-0">
                                      <p className="text-xs capitalize">
                                        {productName}
                                      </p>
                                      <p className="text-xs text-gray-500 font-light">
                                        {variantName}
                                      </p>
                                    </td>
                                    <td className="py-0">
                                      <span className="text-xs text-gray-500 font-light">
                                        x{qty}
                                      </span>
                                    </td>
                                    <td className="py-0">
                                      <span className="text-xs">
                                        Rp {subtotal}
                                      </span>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              )
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-col justify-center items-center mt-4">
        <div className="join">
          <button
            className="join-item btn btn-sm bg-white"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            « Prev
          </button>
          <button className="join-item btn btn-sm bg-white font-normal">
            Page {page} of {!isLoading && data.totalPages}
          </button>
          <button
            className="join-item btn btn-sm bg-white"
            disabled={page >= (!isLoading && data.totalPages)}
            onClick={() => setPage(page + 1)}
          >
            Next »
          </button>
        </div>
        <div className="text-xs mt-4">
          Total Data: {!isLoading && data.totalData}
        </div>
      </div>
    </div>
  );
}

export default SalesHistory;
