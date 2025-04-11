import {
  SlidersHorizontal,
  Settings,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export function StockManagements() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Stock Managements</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by product name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <select
            // value={opticId}
            // onChange={(e) => setOpticId(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">Categories</option>
            {/* {optic.length >= 1 &&
              optic.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.optic_name}
                </option>
              ))} */}
          </select>
          <div className="tabs tabs-boxed tabs-sm w-full md:w-1/2">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-primary checked:text-white rounded"
              aria-label="All"
              defaultChecked
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-warning checked:text-black rounded"
              aria-label="Low"
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab px-8 w-1/3 text-xs checked:bg-error checked:text-white rounded"
              aria-label="Out"
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
            <tr>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Nama Produk</p>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Category</p>
                <p className="text-xs text-gray-500 font-light">sub, sub</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">3</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-warning badge-xs">
                  <TriangleAlert className="h-3 w-3" />
                  Low Stock
                </div>
              </td>
              <td className="border-b border-gray-200">
                <button
                  onClick={() =>
                    document.getElementById("quick_adjust").showModal()
                  }
                  className="btn btn-xs btn-ghost text-primary tooltip mr-2"
                  data-tip="Adjust"
                >
                  <SlidersHorizontal className="h-3 w-3" /> Adjust
                </button>
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Nama Produk</p>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Category</p>
                <p className="text-xs text-gray-500 font-light">sub, sub</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">4</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-warning badge-xs">
                  <TriangleAlert className="h-3 w-3" />
                  Low Stock
                </div>
              </td>
              <td className="border-b border-gray-200">
                <button
                  onClick={() =>
                    document.getElementById("quick_adjust").showModal()
                  }
                  className="btn btn-xs btn-ghost text-primary tooltip mr-2"
                  data-tip="Adjust"
                >
                  <SlidersHorizontal className="h-3 w-3" /> Adjust
                </button>
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Nama Produk</p>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Category</p>
                <p className="text-xs text-gray-500 font-light">sub, sub</p>
              </td>
              <td className="border-b border-gray-200">-025</td>
              <td className="border-b border-gray-200">0</td>
              <td className="border-b border-gray-200">
                <div className="badge badge-error badge-xs">
                  <XCircle className="h-3 w-3" />
                  Out of Stock
                </div>
              </td>
              <td className="border-b border-gray-200">
                <button
                  onClick={() =>
                    document.getElementById("quick_adjust").showModal()
                  }
                  className="btn btn-xs btn-ghost text-primary tooltip mr-2"
                  data-tip="Adjust"
                >
                  <SlidersHorizontal className="h-3 w-3" /> Adjust
                </button>
              </td>
            </tr>
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
              </span>{" "}
              <br />
              <span className="font-medium text-xs text-gray-600">
                Final Stock:{" "}
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

export default StockManagements;
