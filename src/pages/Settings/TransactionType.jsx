import {
  Banknote,
  CircleMinus,
  CirclePlus,
  CreditCard,
  Pencil,
  Plus,
  QrCode,
  Repeat,
  Settings,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function TransactionType() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transaction Type</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <button
            onClick={() =>
              document.getElementById("add_transaction_type").showModal()
            }
            className="btn btn-primary btn-sm w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Transaction Type
          </button>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[768px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "#",
                "Name",
                "Description",
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
              <td className="border-b border-gray-200" width="1%">
                1
              </td>
              <td className="border-b border-gray-200">
                <p className="text-xs font-semibold capitalize">Grosir</p>
              </td>
              <td className="border-b border-gray-200">Transaksi optik umum</td>
              <td className="border-b border-gray-200">
                <Link
                  className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                  data-tip="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <Link
                  className="btn btn-xs btn-ghost btn-circle text-error tooltip"
                  data-tip="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Link>
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

      {/* Modal Add Customer */}
      <dialog id="add_transaction_type" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">Add Transaction Type</h3>
          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col justify-center"
          >
            {/* Customer Name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="e.g. Single Vision"
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea textarea-sm w-full"
                placeholder="Bio"
              ></textarea>
            </fieldset>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() =>
                  document.getElementById("add_transaction_type").close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default TransactionType;
