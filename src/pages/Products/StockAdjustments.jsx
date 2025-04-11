import {
  CircleMinus,
  CirclePlus,
  SlidersHorizontal,
  Minus,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function StockAdjustments() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Adjustments</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="date"
            placeholder="Search by product name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/2"
          />

          <Link
            to="/products/stock-in"
            className="btn btn-success btn-sm md:w-1/5"
          >
            <Plus className="w-4 h-4 mr-2" /> Stock In
          </Link>
          <Link
            to="/products/stock-out"
            className="btn btn-error btn-sm md:w-1/5"
          >
            <Minus className="w-4 h-4 mr-2" /> Stock Out
          </Link>
          <Link
            to="/products/adjustment"
            className="btn btn-warning btn-sm md:w-1/5"
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
                "Tanggal",
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
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(1)}
                >
                  {openRow === 1 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">01-02-1970</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Product Name</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-success badge-xs">In</div>
              </td>
              <td className="border-b border-gray-200">+200</td>
              <td className="border-b border-gray-200">
                Lorem ipsum dolor sit amet.
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(1)}
                >
                  {openRow === 1 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">01-02-1970</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Product Name</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-error badge-xs">Out</div>
              </td>
              <td className="border-b border-gray-200">-100</td>
              <td className="border-b border-gray-200">
                Lorem ipsum dolor sit amet.
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(3)}
                >
                  {openRow === 3 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">01-02-1970</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Product Name</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-warning badge-xs">Adjust</div>
              </td>
              <td className="border-b border-gray-200">-100</td>
              <td className="border-b border-gray-200">
                Lorem ipsum dolor sit amet.
              </td>
            </tr>
            {openRow === 3 && (
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-6 py-2" colSpan={7}>
                  <p>
                    <b>Current Stock: </b>100 <br />
                    <b>Adjust: </b>-100 <br />
                    <b>Final Stock: </b>0
                  </p>
                </td>
              </tr>
            )}
            {/* {!isLoadingPatient ? (
              dataPatient.data.map(
                (
                  {
                    id,
                    name,
                    address,
                    phone_number,
                    date_of_birth,
                    gender,
                    optic,
                    createdAt,
                    medicalconditions,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="border-b border-gray-200">
                      <p className="text-xs font-semibold capitalize">
                        {name.toLowerCase()}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        {phone_number}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 text-center">
                      <p className="text-xs font-semibold">
                        {gender == "Perempuan" ? "P" : "L"}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        {dayjs().diff(
                          dayjs(date_of_birth.split("T")[0]),
                          "year"
                        )}{" "}
                        Thn
                      </p>
                    </td>
                    <td className="border-b border-gray-200">
                      <p className="text-xs text-gray-700 font-semibold">
                        {address}
                      </p>
                    </td>
                    <td className="border-b border-gray-200">
                      <ul className="list-inside list-disc">
                        {medicalconditions &&
                          medicalconditions.map(({ name }, index2) => (
                            <li key={index2}>{name}</li>
                          ))}
                      </ul>
                    </td>
                    <td className="border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-700">
                        {optic.optic_name}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        {dayjs(createdAt)
                          .tz("Asia/Jakarta")
                          .format("DD-MM-YYYY")}
                      </p>
                    </td>
                    <td className="w-28 flex justify-end">
                      <Link
                        to="/medical-record/add-medical-record"
                        state={{ patientId: id, prevPage: location.pathname }}
                        className="btn btn-xs btn-ghost btn-circle text-neutral tooltip"
                        data-tip="Add Medical Record"
                      >
                        <FilePlus className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/medical-record/patients/${id}`}
                        className="btn btn-xs btn-ghost btn-circle text-info tooltip"
                        data-tip="Detail"
                      >
                        <Info className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/medical-record/edit-patient-data/${id}`}
                        className="btn btn-xs btn-ghost btn-circle text-success tooltip"
                        data-tip="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {userRole == "admin" && (
                        <button
                          className="btn btn-xs btn-ghost btn-circle text-error tooltip"
                          data-tip="Delete"
                          onClick={() => handleDelete(id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <LoadingTable row="10" colspan="7" />
            )} */}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {/* <div className="flex flex-col justify-center items-center mt-4">
        <div className="join">
          <button
            className="join-item btn btn-sm bg-white"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            « Prev
          </button>
          <button className="join-item btn btn-sm bg-white font-normal">
            Page {page} of {!isLoadingPatient && dataPatient.totalPages}
          </button>
          <button
            className="join-item btn btn-sm bg-white"
            disabled={page >= (!isLoadingPatient && dataPatient.totalPages)}
            onClick={() => setPage(page + 1)}
          >
            Next »
          </button>
        </div>
        <div className="text-xs mt-4">
          Total Data: {!isLoadingPatient && dataPatient.totalData}
        </div>
      </div> */}

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
