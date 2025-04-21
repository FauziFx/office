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
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";
import Swal from "sweetalert2";
import { LoadingTable } from "@/components";

export function TransactionType() {
  const { mutate } = useSWRConfig();
  const [dataType, setDataType] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataType({
      ...dataType,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateType(dataType.id, dataType);
    } else {
      addNewTyp(dataType);
    }
  };

  const addNewTyp = async (data) => {
    try {
      const response = await api.post("/transaction-types", {
        name: data.name,
        description: data.description,
      });

      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate("/transaction-types");
        document.getElementById("add_transaction_type").close();
        setDataType({ id: "", name: "", description: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateType = async (id, data) => {
    try {
      const response = await api.patch("/transaction-types/" + id, {
        name: data.name,
        description: data.description,
      });

      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate("/transaction-types");
        document.getElementById("add_transaction_type").close();
        setDataType({ id: "", name: "", description: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, name, description) => {
    setDataType({
      id: id,
      name: name,
      description: description,
    });
    setIsEditMode(true);
    document.getElementById("add_transaction_type").showModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Deleted Transaction Type?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes, Deleted`,
    }).then((result) => {
      // Confirm Delete
      if (result.isDenied) {
        deleteType(id);
      }
    });
  };

  const deleteType = async (id) => {
    try {
      const response = await api.delete(`/transaction-types/${id}`);

      mutate("/transaction-types");
      Swal.fire(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR("/transaction-types", fetcher);

  if (error) return <p>Error loading data.</p>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Transaction Type</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-end">
          <button
            onClick={() => {
              document.getElementById("add_transaction_type").showModal();
              setIsEditMode(false);
            }}
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
            {isLoading ? (
              <LoadingTable row="5" colspan="4" />
            ) : (
              data.map(({ id, name, description }, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-200" width="1%">
                    {index + 1}
                  </td>
                  <td className="border-b border-gray-200">
                    <p className="text-xs font-semibold capitalize">{name}</p>
                  </td>
                  <td className="border-b border-gray-200">{description}</td>
                  <td className="border-b border-gray-200">
                    <button
                      className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                      data-tip="Edit"
                      onClick={() => handleUpdate(id, name, description)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-xs btn-ghost btn-circle text-error tooltip"
                      data-tip="Delete"
                      onClick={() => handleDelete(id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add Customer */}
      <dialog id="add_transaction_type" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">
            {isEditMode ? "Edit Transaction Type" : "Add Transaction Type"}
          </h3>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
            autoComplete="off"
          >
            {/* Customer Name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Name</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="e.g. Grosir"
                name="name"
                value={dataType.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Description</legend>
              <textarea
                className="textarea textarea-sm w-full"
                placeholder="Description"
                name="description"
                value={dataType.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </fieldset>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  document.getElementById("add_transaction_type").close();
                  setDataType({ id: "", name: "", description: "" });
                }}
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
