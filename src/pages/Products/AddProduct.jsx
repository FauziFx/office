import { Info, Save } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import api from "@/utils/api";
import Select from "react-select";

export function AddProduct() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Product</h1>
      <div className="card bg-white shadow-md p-4 md:p-6 md:h-[90vh]">
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="w-full md:w-1/2">
            <div className="w-full max-w-md mb-2">
              <label className="text-xs font-semibold">Product Name</label>
              <input
                type="text"
                className="input input-sm w-full"
                required
                placeholder="Product Name"
              />
            </div>
            <div className="w-full max-w-md mb-2">
              <label className="text-xs font-semibold">Category</label>
              <select className="select select-sm shadow w-full md:1/5">
                <option value="admin">Admin</option>
                <option value="lab">Admin Lab</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="w-full max-w-md mb-2">
              <label className="text-xs font-semibold">Subcategory</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
                <label className="cursor-pointer flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-neutral"
                  />
                  <span className="label-text text-xs ml-1">Blueray</span>
                </label>
              </div>
            </div>
            <div className="w-full max-w-md mb-2">
              <label
                className="text-xs font-semibold tooltip tooltip-right"
                data-tip="Show Product on POS"
              >
                Status <Info className="h-3 inline cursor-pointer" />
              </label>
              <div className="flex flex-row gap-4">
                <label className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Active"
                    defaultChecked
                    className="radio radio-sm radio-success"
                    required
                  />
                  <span className="label-text text-xs ml-2">Active</span>
                </label>
                <label className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Inactive"
                    className="radio radio-sm radio-error"
                    required
                  />
                  <span className="label-text text-xs ml-2">Inactive</span>
                </label>
              </div>
            </div>
            <div className="w-full max-w-md mb-2">
              <label
                className="text-xs font-semibold tooltip tooltip-right"
                data-tip="Track stock on Stock Managements"
              >
                Track Stock <Info className="h-3 inline cursor-pointer" />
              </label>
              <div className="flex flex-row gap-4">
                <label className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="track"
                    value="Active"
                    defaultChecked
                    className="radio radio-sm radio-success"
                    required
                  />
                  <span className="label-text text-xs ml-2">Yes</span>
                </label>
                <label className="cursor-pointer flex items-center">
                  <input
                    type="radio"
                    name="track"
                    value="Inactive"
                    className="radio radio-sm radio-error"
                    required
                  />
                  <span className="label-text text-xs ml-2">No</span>
                </label>
              </div>
            </div>
            <div className="w-full max-w-md mb-2">
              <label className="text-xs font-semibold">Description</label>
              <textarea
                className="textarea textarea-sm w-full"
                placeholder="Description"
                required
              ></textarea>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="w-full max-w-md mb-2">
              <label className="text-xs font-semibold">Base Price</label>
              <input
                type="text"
                className="input input-sm w-full"
                required
                placeholder="10000"
              />
            </div>
            <button className="btn btn-xs btn-primary w-full">+ Add Row</button>
            <div className="overflow-x-auto card bg-white shadow-md p-2 pb-6 max-h-[65vh]">
              <table className="table table-xs w-full table-auto table-zebra">
                {/* Head */}
                <thead>
                  <tr>
                    {["Variant", "Price", "Stock", "Min Stock"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 text-left"
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
                <tbody>
                  <tr>
                    <td className="px-1">
                      <input
                        type="text"
                        className="input input-sm focus:border-none p-1"
                      />
                    </td>
                    <td className="px-1">
                      <input
                        type="text"
                        className="input input-sm focus:border-none p-1"
                      />
                    </td>
                    <td className="px-1">
                      <input
                        type="text"
                        className="input input-sm focus:border-none p-1"
                      />
                    </td>
                    <td className="px-1">
                      <input
                        type="text"
                        className="input input-sm focus:border-none p-1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="join w-full gap-2 mb-1 justify-end pt-4">
          <Link
            to="/products"
            type="submit"
            name="next"
            className="btn btn-sm join-item btn-soft btn-primary"
            //   disabled={isLoadingSave}
          >
            « Back
          </Link>
          <button
            type="submit"
            name="save"
            className="btn btn-sm join-item btn-primary"
            //   disabled={isLoadingSave}
          >
            {/* {isLoadingSave ? (
                <span className="loading loading-sm loading-spinner"></span>
              ) : (
                <>
                  <Save className="h-4" /> Save
                </>
              )} */}
            <Save className="h-4" /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
