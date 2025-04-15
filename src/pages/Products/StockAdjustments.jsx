import {
  CircleMinus,
  CirclePlus,
  SlidersHorizontal,
  Minus,
  Plus,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/utils/api";
import useSWR from "swr";
import { LoadingTable } from "@/components";
import dayjs from "dayjs"; // Core Day.js
import utc from "dayjs/plugin/utc"; // Plugin UTC
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone
// Extend plugins ke Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

export function StockAdjustments() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };

  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15

  // Query string berdasarkan filter
  const query = new URLSearchParams({ page, limit });
  if (name) query.append("productName", name);

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/stock/adjustments?${query.toString()}`,
    fetcher
  );

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Adjustments</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="text"
            placeholder="Search by product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/2"
          />

          <Link
            to="/products/stock-in"
            className="btn btn-success btn-sm md:w-1/6"
          >
            <Plus className="w-4 h-4 mr-2" /> Stock In
          </Link>
          <Link
            to="/products/stock-out"
            className="btn btn-error btn-sm md:w-1/6"
          >
            <Minus className="w-4 h-4 mr-2" /> Stock Out
          </Link>
          <Link
            to="/products/adjustment"
            className="btn btn-warning btn-sm md:w-1/6"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Adjustment
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[640px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "",
                "Date",
                "Product",
                "Variant",
                "Type",
                "Quantity",
                "Note",
              ].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 px-2 text-left"
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
              <LoadingTable row="10" colspan="7" />
            ) : (
              data.data.map(
                (
                  {
                    createdAt,
                    id,
                    productName,
                    variantName,
                    type,
                    before_stock,
                    adjust,
                    after_stock,
                    note,
                  },
                  index
                ) => (
                  <Fragment key={index}>
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
                        {dayjs(createdAt)
                          .tz("Asia/Jakarta")
                          .format("DD-MM-YYYY")}
                      </td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs font-semibold capitalize">
                          {productName}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">
                        {variantName}
                      </td>
                      <td className="border-b border-gray-200">
                        {type == "in" ? (
                          <div className="badge badge-success badge-xs">In</div>
                        ) : type == "out" ? (
                          <div className="badge badge-error badge-xs">Out</div>
                        ) : (
                          <div className="badge badge-warning badge-xs">
                            Adjust
                          </div>
                        )}
                      </td>
                      <td className="border-b border-gray-200">
                        {adjust < 0 ? adjust : "+" + adjust}
                      </td>
                      <td className="border-b border-gray-200">{note}</td>
                    </tr>
                    {openRow === id && (
                      <tr className="bg-gray-100">
                        <td
                          className="border border-gray-300 px-6 py-2"
                          colSpan={7}
                        >
                          <p>
                            <b>Before Stock: </b>
                            {before_stock} <br />
                            <b>Adjust: </b>
                            {adjust < 0 ? adjust : "+" + adjust} <br />
                            <b>After Stock: </b>
                            {after_stock}
                          </p>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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

      {/* Modal Quick Adjust */}
      <dialog id="quick_adjust" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">Adjust Stock - Lensa Kodak -1.50</h3>

          <form>
            {/* Actual Stock Info */}
            <div className="bg-gray-100 text-sm px-4 py-2 rounded">
              <span className="font-medium text-xs text-gray-600">
                Current Stock:{" "}
              </span>
              <span className="font-semibold text-xs text-gray-800">
                12 pcs
              </span>
              {/* ← ini kamu ambil dari props/state */}
            </div>

            {/* Adjustment Type */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Type</legend>
              <select className="select select-sm select-bordered w-full">
                <option value="increase">Increase (+)</option>
                <option value="decrease">Decrease (-)</option>
              </select>
            </fieldset>

            {/* Quantity */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Quantity</legend>
              <input
                type="number"
                className="input input-sm input-bordered w-full"
                placeholder="e.g. 5"
                onFocus={(e) => {
                  e.target.addEventListener(
                    "wheel",
                    function (e) {
                      e.preventDefault();
                    },
                    {
                      passive: false,
                    }
                  );
                }}
              />
            </fieldset>

            {/* Optional Note */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Note (Optional)</legend>
              <textarea
                className="textarea textarea-sm textarea-bordered w-full"
                placeholder="e.g. stock recount correction"
              />
            </fieldset>

            {/* Action Buttons */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => document.getElementById("quick_adjust")?.close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-sm btn-primary">
                Apply Adjustment
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default StockAdjustments;
