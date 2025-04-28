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
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";
import Swal from "sweetalert2";

export function Customers() {
  const { mutate } = useSWRConfig();
  const [name, setName] = useState("");
  const [dataCustomer, setDataCustomer] = useState({
    name: "",
    transactionTypeId: "",
    include_revenue: true,
    is_default: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const query = new URLSearchParams({});
  if (name) query.append("name", name);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setDataCustomer({
        ...dataCustomer,
        [name]: checked,
      });
    } else {
      setDataCustomer({
        ...dataCustomer,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateCustomer(dataCustomer.id, dataCustomer);
    } else {
      addNewCustomer(dataCustomer);
    }
  };

  const addNewCustomer = async (data) => {
    try {
      const response = await api.post("/customers", {
        name: dataCustomer.name,
        transactionTypeId: Number(dataCustomer.transactionTypeId),
        include_revenue: dataCustomer.include_revenue ? 1 : 0,
        is_default: dataCustomer.is_default ? 1 : 0,
      });
      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/customers?${query.toString()}`);
        document.getElementById("add_customer").close();
        setDataCustomer({
          name: "",
          transactionTypeId: "",
          include_revenue: true,
          is_default: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      const response = await api.patch("/customers/" + id, {
        name: dataCustomer.name,
        transactionTypeId: Number(dataCustomer.transactionTypeId),
        include_revenue: dataCustomer.include_revenue ? 1 : 0,
        is_default: dataCustomer.is_default ? 1 : 0,
      });
      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/customers?${query.toString()}`);
        document.getElementById("add_customer").close();
        setDataCustomer({
          name: "",
          transactionTypeId: "",
          include_revenue: true,
          is_default: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (
    id,
    name,
    transactionTypeId,
    include_revenue,
    is_default
  ) => {
    setDataCustomer({
      id: id,
      name: name,
      transactionTypeId: transactionTypeId,
      include_revenue: include_revenue,
      is_default: is_default,
    });
    setIsEditMode(true);
    document.getElementById("add_customer").showModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Deleted Customer Type?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes, Deleted`,
    }).then((result) => {
      // Confirm Delete
      if (result.isDenied) {
        deleteCustomer(id);
      }
    });
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);

      mutate(`/customers?${query.toString()}`);
      Swal.fire(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await api.patch(`/customers/${id}`, { include_revenue: newStatus });
      mutate(`/customers?${query.toString()}`);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const resTransactionType = await api.get("/transaction-types");

      const data = {
        transactionType: resTransactionType.data.data,
        customer: response.data.data,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/customers?${query.toString()}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (error) return <p>Error loading data.</p>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Customers</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:w-1/4"
          />
          <button
            onClick={() => {
              document.getElementById("add_customer").showModal();
              setIsEditMode(false);
            }}
            className="btn btn-primary btn-sm w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Customers
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
                "Transaction Type",
                "Include in Revenue",
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
              <LoadingTable row="5" colspan="5" />
            ) : (
              data.customer.map(
                (
                  {
                    id,
                    name,
                    transactionType,
                    transactionTypeId,
                    include_revenue,
                    is_default,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200" width="1%">
                      {index + 1}
                    </td>
                    <td className="border-b border-gray-200">
                      <p className="text-xs font-semibold capitalize">
                        {name}{" "}
                        {is_default === 1 && (
                          <span className="font-normal text-gray-500">
                            (Default)
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="border-b border-gray-200">
                      <div className="badge badge-xs badge-soft badge-neutral">
                        {transactionType.name}
                      </div>
                    </td>
                    <td className="border-b border-gray-200">
                      <label className="fieldset-label">
                        <input
                          type="checkbox"
                          checked={include_revenue === 1}
                          className="toggle toggle-xs toggle-primary"
                          onChange={() => toggleStatus(id, include_revenue)}
                        />
                        {include_revenue === 1 ? "Include" : "not Included"}
                      </label>
                    </td>
                    <td className="border-b border-gray-200">
                      <button
                        className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                        data-tip="Edit"
                        onClick={() =>
                          handleUpdate(
                            id,
                            name,
                            transactionTypeId,
                            include_revenue,
                            is_default
                          )
                        }
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
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add Customer */}
      <dialog id="add_customer" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">
            {isEditMode ? "Edit Customer" : "Add Customer"}
          </h3>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            {/* Customer Name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Customer Name</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="e.g. John Doe"
                name="name"
                required
                value={dataCustomer.name}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Transaction Type</legend>
              <select
                className="select select-sm w-full"
                name="transactionTypeId"
                value={dataCustomer.transactionTypeId}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="">Select Transaction Type</option>
                {!isLoading &&
                  data.transactionType.map(({ id, name }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
              </select>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Include In Revenue</legend>
              <label className="label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  name="include_revenue"
                  checked={dataCustomer.include_revenue}
                  onChange={(e) => handleChange(e)}
                />
                Include
              </label>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Default</legend>
              <label className="label">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  name="is_default"
                  checked={dataCustomer.is_default}
                  onChange={(e) => handleChange(e)}
                />
                Set as default Customer
              </label>
            </fieldset>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  document.getElementById("add_customer").close();
                  setDataCustomer({
                    name: "",
                    transactionTypeId: "",
                    include_revenue: true,
                    is_default: false,
                  });
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

export default Customers;
