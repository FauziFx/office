import {
  SlidersHorizontal,
  Settings,
  TriangleAlert,
  XCircle,
  Save,
} from "lucide-react";
import React, { useState } from "react";
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";
import { LoadingTable } from "@/components";
import Swal from "sweetalert2";

export function StockManagements() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const { mutate } = useSWRConfig();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15
  const [adjust, setAdjust] = useState({
    productId: "",
    productName: "",
    variantId: "",
    variantName: "",
    type: "adjust",
    before_stock: "",
    adjust: "",
    after_stock: "",
    note: "",
  });

  const resetAdjust = () => [
    setAdjust({
      productId: "",
      productName: "",
      variantId: "",
      variantName: "",
      type: "adjust",
      before_stock: "",
      adjust: "",
      after_stock: "",
      note: "",
    }),
  ];

  // Query string berdasarkan filter
  const query = new URLSearchParams({ page, limit });
  if (name) query.append("name", name);
  if (categoryId) query.append("categoryId", categoryId);
  if (status) query.append("status", status);

  const handleAdjust = async (item) => {
    document.getElementById("quick_adjust").showModal();
    setAdjust({
      productId: item.productId,
      productName: item.product.name,
      variantId: item.id,
      variantName: item.name,
      type: "adjust",
      before_stock: item.stock,
      adjust: "",
      after_stock: "",
      note: "",
      adjustType: "increase",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingSave(true);
      const payload = [
        {
          productId: adjust.productId,
          productName: adjust.productName,
          variantId: adjust.variantId,
          variantName: adjust.variantName,
          type: "adjust",
          before_stock: adjust.before_stock,
          adjust:
            adjust.adjustType == "increase"
              ? Number(adjust.adjust)
              : -Number(adjust.adjust),
          after_stock: Number(adjust.after_stock),
          note: adjust.note,
        },
      ];

      const response = await api.post("/stock/adjustments", { items: payload });

      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/stock/managements?${query.toString()}`);
      } else {
        Swal.fire(response.data.message);
      }

      setIsLoadingSave(false);
      document.getElementById("quick_adjust")?.close();
      resetAdjust();
    } catch (error) {
      console.log(error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const dataCategory = await api.get("/categories?type=main");

      const data = {
        dataCategory: dataCategory.data.data,
        dataStock: response.data.data,
        totalData: response.data.totalData,
        totalPages: response.data.totalPages,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/stock/managements?${query.toString()}`,
    fetcher
  );

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Managements</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            {!isLoading &&
              data.dataCategory.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div className="tabs tabs-boxed tabs-sm w-full md:w-1/2">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-primary checked:text-white rounded"
              aria-label="All"
              value="all"
              checked={status === "all"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-warning checked:text-black rounded"
              aria-label="Low"
              value="low"
              checked={status === "low"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-error checked:text-white rounded"
              aria-label="Out"
              value="out"
              checked={status === "out"}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[540px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "Product Name",
                "Category",
                "Variant",
                "Stock",
                "Status",
                <Settings className="h-4 w-4" />,
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
              data.dataStock.map((item, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200">
                    <p className="text-xs font-semibold capitalize">
                      {item.product.name}
                    </p>
                  </td>
                  <td className="border-b border-gray-200">
                    <p className="text-xs font-semibold capitalize">
                      {item.product.categories?.name}
                    </p>
                  </td>
                  <td className="border-b border-gray-200">
                    {item.variantName}
                  </td>
                  <td className="border-b border-gray-200">{item.stock}</td>
                  <td className="border-b border-gray-200">
                    {item.stock > 0 ? (
                      <div className="badge badge-warning badge-xs">
                        <TriangleAlert className="h-3 w-3" />
                        Low Stock
                      </div>
                    ) : (
                      <div className="badge badge-error badge-xs">
                        <XCircle className="h-3 w-3" />
                        Out of Stock
                      </div>
                    )}
                  </td>
                  <td className="border-b border-gray-200">
                    <button
                      onClick={() => handleAdjust(item)}
                      className="btn btn-xs btn-ghost text-primary tooltip mr-2"
                      data-tip="Adjust"
                    >
                      <SlidersHorizontal className="h-3 w-3" /> Adjust
                    </button>
                  </td>
                </tr>
              ))
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
          <h3 className="font-bold mb-4">
            Adjust Stock - {adjust.productName} {adjust.variantName}
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Actual Stock Info */}
            <div className="bg-gray-100 text-sm px-4 py-2 rounded">
              <span className="font-medium text-xs text-gray-600">
                Current Stock:{" "}
              </span>
              <span className="font-semibold text-xs text-gray-800">
                {adjust.before_stock}
              </span>{" "}
              <br />
              <span className="font-medium text-xs text-gray-600">
                Final Stock:{" "}
              </span>
              <span className="font-semibold text-xs text-gray-800">
                {adjust.after_stock}
              </span>
              {/* ← ini kamu ambil dari props/state */}
            </div>

            {/* Adjustment Type */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Type</legend>
              <select
                className="select select-sm select-bordered w-full"
                value={adjust.adjustType}
                required
                onChange={(e) => {
                  setAdjust((prev) => ({
                    ...prev,
                    adjustType: e.target.value,
                  }));
                  const value = adjust.adjust;
                  const after =
                    e.target.value == "increase"
                      ? adjust.before_stock + parseInt(value)
                      : adjust.before_stock - parseInt(value);

                  setAdjust((prev) => ({
                    ...prev,
                    after_stock: Number.isNaN(after) ? "" : after,
                  }));
                }}
              >
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
                required
                value={adjust.adjust}
                onChange={(e) => {
                  const value = e.target.value;
                  const after =
                    adjust.adjustType == "increase"
                      ? adjust.before_stock + parseInt(value)
                      : adjust.before_stock - parseInt(value);

                  setAdjust((prev) => ({
                    ...prev,
                    adjust: value,
                    after_stock: Number.isNaN(after) ? "" : after,
                  }));
                }}
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
                value={adjust.note}
                onChange={(e) =>
                  setAdjust((prev) => ({
                    ...prev,
                    note: e.target.value,
                  }))
                }
              />
            </fieldset>

            {/* Action Buttons */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  document.getElementById("quick_adjust")?.close();
                  resetAdjust();
                }}
                disabled={isLoadingSave}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={isLoadingSave}
              >
                {isLoadingSave ? (
                  <span className="loading loading-sm loading-spinner"></span>
                ) : (
                  <>
                    <Save className="h-4" /> Apply Adjustment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default StockManagements;
