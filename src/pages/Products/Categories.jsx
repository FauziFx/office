import {
  CircleMinus,
  CirclePlus,
  Pencil,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Categories() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <select
            // value={opticId}
            // onChange={(e) => setOpticId(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">Type</option>
            {/* {optic.length >= 1 &&
              optic.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.optic_name}
                </option>
              ))} */}
          </select>
          <button
            onClick={() => document.getElementById("add_category").showModal()}
            className="btn btn-primary btn-sm w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </button>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[500px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "",
                "Name",
                "Type",
                "Parent",
                "Total Product",
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
                <p className="text-xs font-semibold capitalize">Kategori</p>
              </td>
              <td className="border-b border-gray-200">Main</td>
              <td className="border-b border-gray-200">
                <p className="text-xs text-gray-500 font-light">Main Cat</p>
              </td>
              <td className="border-b border-gray-200">10</td>
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
            {openRow === 1 && (
              <tr className="bg-gray-100">
                <td className="border border-gray-300 px-6 py-2" colSpan={6}>
                  <ul className="list-disc">
                    <li>Sub1</li>
                    <li>Sub2</li>
                    <li>Sub3</li>
                  </ul>
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

      {/* Modal Add Category */}
      <dialog id="add_category" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">Add Category</h3>
          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                type: form.type.value,
                parent_id:
                  form.type.value === "sub" ? form.parent_id.value : null,
              };
              // Kirim data ke handler
              console.log("Submit category:", data);
              form.reset();
              //   document.getElementById("add_category").close();
            }}
            className="flex flex-col justify-center"
          >
            {/* Category Name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Category Name</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="e.g. Single Vision"
              />
            </fieldset>

            {/* Type */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Type</legend>
              <select
                name="type"
                className="select select-bordered select-sm w-full"
                defaultValue="main"
                onChange={(e) => {
                  const parentWrapper = document.getElementById(
                    "parent_category_wrapper"
                  );
                  if (e.target.value === "sub") {
                    parentWrapper.classList.remove("hidden");
                  } else {
                    parentWrapper.classList.add("hidden");
                  }
                }}
              >
                <option value="main">Main</option>
                <option value="sub">Sub</option>
              </select>
            </fieldset>

            {/* Parent Category */}
            <fieldset
              className="fieldset w-full hidden"
              id="parent_category_wrapper"
            >
              <legend className="fieldset-legend">Parent Category</legend>
              <select
                name="type"
                className="select select-bordered select-sm w-full"
                defaultValue="main"
              >
                <option value="main">Lensa</option>
                <option value="sub">Frame</option>
              </select>
            </fieldset>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => document.getElementById("add_category").close()}
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

export default Categories;
