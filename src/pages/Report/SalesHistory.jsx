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

export function SalesHistory() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales History</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by Invoice"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <select
            // value={opticId}
            // onChange={(e) => setOpticId(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">All</option>
            {/* {optic.length >= 1 &&
              optic.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.optic_name}
                </option>
              ))} */}
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
                  // value={startDate || ""}
                  // onChange={(e) => setStartDate(e.target.value)}
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
                  // value={endDate || ""}
                  // onChange={(e) => setEndDate(e.target.value)}
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
              {["", "Date & Time", "Invoice", "Total", "Payment", "Type"].map(
                (el) => (
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
                )
              )}
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
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">08 Apr 2025</p>
                <p className="text-xs text-gray-500 font-light">10:10</p>
              </td>
              <td className="border-b border-gray-200">INV-MXXXXX</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Rp 10000</p>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-soft badge-accent badge-xs">
                  <Banknote className="h-3 w-3" />
                  Cash
                </div>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-xs badge-soft badge-neutral">
                  MA
                </div>
              </td>
            </tr>
            {openRow === 1 && (
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-6 py-2" colSpan={6}>
                  <table>
                    <tbody>
                      <tr>
                        <td className="py-0">
                          <p className="text-xs capitalize">PROG CRMC</p>
                          <p className="text-xs text-gray-500 font-light">
                            R +025/+300
                          </p>
                        </td>
                        <td className="py-0">
                          <span className="text-xs text-gray-500 font-light">
                            x1
                          </span>
                        </td>
                        <td className="py-0">
                          <span className="text-xs">Rp 10000</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(1)}
                >
                  {openRow === 0 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">08 Apr 2025</p>
                <p className="text-xs text-gray-500 font-light">10:10</p>
              </td>
              <td className="border-b border-gray-200">INV-GXXXXX</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Rp 10000</p>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-soft badge-accent badge-xs">
                  <QrCode className="h-3 w-3" />
                  Qris
                </div>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-xs badge-soft badge-neutral">
                  Gross
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(1)}
                >
                  {openRow === 0 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">08 Apr 2025</p>
                <p className="text-xs text-gray-500 font-light">10:10</p>
              </td>
              <td className="border-b border-gray-200">INV-GXXXXX</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Rp 10000</p>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-soft badge-accent badge-xs">
                  <CreditCard className="h-3 w-3" />
                  EDC
                </div>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-xs badge-soft badge-neutral">
                  Gross
                </div>
              </td>
            </tr>
            <tr>
              <td className="border-b border-gray-200" width="1%">
                <button
                  className="btn btn-xs btn-ghost btn-circle my-1"
                  onClick={() => toggleRow(1)}
                >
                  {openRow === 0 ? (
                    <CircleMinus className="h-4 w-4 cursor-pointer text-error" />
                  ) : (
                    <CirclePlus className="h-4 w-4 cursor-pointer text-primary" />
                  )}
                </button>
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">08 Apr 2025</p>
                <p className="text-xs text-gray-500 font-light">10:10</p>
              </td>
              <td className="border-b border-gray-200">INV-GXXXXX</td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Rp 10000</p>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-soft badge-accent badge-xs">
                  <Repeat className="h-3 w-3" />
                  Transfer
                </div>
              </td>
              <td className="border-b border-gray-200">
                <div className="badge badge-xs badge-soft badge-neutral">
                  Gross
                </div>
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
    </div>
  );
}

export default SalesHistory;
