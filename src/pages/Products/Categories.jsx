import {
  CircleMinus,
  CirclePlus,
  Pencil,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import React, { Fragment, useState } from "react";
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";
import Swal from "sweetalert2";

export function Categories() {
  const [dataCategory, setDataCategory] = useState({
    id: "",
    name: "",
    parentId: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [showParentCategory, setShowParentCategory] = useState(false);
  const [categoryType, setCategoryType] = useState("main");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setDataCategory({
      ...dataCategory,
      [name]: value,
    });
  };

  const [openRow, setOpenRow] = useState(null);
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };
  const [type, setType] = useState("");
  const { mutate } = useSWRConfig();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateCategory(dataCategory.id, dataCategory);
    } else {
      addNewCategory(dataCategory);
    }
  };

  const addNewCategory = async (data) => {
    try {
      const response = await api.post("/categories", {
        name: data.name,
        parentId: data.parentId != "" ? data.parentId : null,
      });

      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/categories?${query.toString()}`);
        document.getElementById("add_category").close();
        setDataCategory({ id: "", name: "", parentId: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      const response = await api.patch("/categories/" + id, {
        name: data.name,
        parentId: data.parentId != "" ? data.parentId : null,
      });

      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/categories?${query.toString()}`);
        document.getElementById("add_category").close();
        setDataCategory({ id: "", name: "", parentId: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, name, parentId) => {
    setDataCategory({
      id: id,
      name: name,
      parentId: parentId ? parentId : "",
    });
    if (parentId) {
      setShowParentCategory(true);
      setCategoryType("sub");
      setShowParentCategory(true);
    } else {
      setShowParentCategory(true);
      setCategoryType("main");
      setShowParentCategory(false);
    }
    setIsEditMode(true);
    document.getElementById("add_category").showModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Deleted Category?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Yes, Deleted`,
    }).then((result) => {
      // Confirm Delete
      if (result.isDenied) {
        deleteCategory(id);
      }
    });
  };

  const deleteCategory = async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);

      if (response.data.success) {
        mutate(`/categories?${query.toString()}`);
        Swal.fire(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const query = new URLSearchParams({});
  if (type) query.append("type", type);

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/categories?${query.toString()}`,
    fetcher
  );

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Categories</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select select-sm shadow w-full md:w-1/4"
          >
            <option value="">All Type</option>
            <option value="main">Main Category</option>
            <option value="sub">Sub Category</option>
          </select>
          <button
            onClick={() => {
              document.getElementById("add_category").showModal();
              setIsEditMode(false);
            }}
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
            {isLoading ? (
              <LoadingTable row="8" colspan="6" />
            ) : (
              data.map(
                ({ id, name, parentId, parent, subCategories }, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td className="border-b border-gray-200" width="1%">
                        {subCategories.length > 0 && (
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
                        )}
                      </td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs font-semibold capitalize">
                          {name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">
                        {parentId ? "Sub" : "Main"}
                      </td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs text-gray-500 font-normal">
                          {parent && parent.name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">10</td>
                      <td className="border-b border-gray-200">
                        <button
                          className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                          data-tip="Edit"
                          onClick={() => handleUpdate(id, name, parentId)}
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
                    {subCategories.length > 0 && openRow === id && (
                      <tr className="bg-gray-100">
                        <td
                          className="border border-gray-300 px-6 py-2"
                          colSpan={6}
                        >
                          <span className="font-bold  ">Sub Category</span>
                          <ul className="list-disc pl-3">
                            {subCategories.map((item, index) => (
                              <li key={index}>
                                <div className="badge badge-xs badge-ghost">
                                  {item.name}
                                </div>
                              </li>
                            ))}
                          </ul>
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

      {/* Modal Add Category */}
      <dialog id="add_category" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">
            {isEditMode ? "Edit Category" : "Add Category"}
          </h3>
          {/* Form */}
          <form
            id="form_add_category"
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            {/* Category Name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Category Name</legend>
              <input
                type="text"
                name="name"
                className="input input-sm w-full"
                placeholder="e.g. Single Vision"
                value={dataCategory.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </fieldset>

            {/* Type */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend">Type</legend>
              <select
                className="select select-bordered select-sm w-full"
                value={categoryType}
                onChange={(e) => {
                  if (e.target.value === "sub") {
                    setShowParentCategory(true);
                  } else {
                    setShowParentCategory(false);
                    setDataCategory({
                      ...dataCategory,
                      parentId: "",
                    });
                  }
                  setCategoryType(e.target.value);
                }}
              >
                <option value="main">Main</option>
                <option value="sub">Sub</option>
              </select>
            </fieldset>

            {/* Parent Category */}
            <fieldset
              className={`fieldset w-full ${
                showParentCategory ? "" : "hidden"
              }`}
            >
              <legend className="fieldset-legend">Parent Category</legend>
              <select
                name="parentId"
                className="select select-bordered select-sm w-full"
                value={dataCategory.parentId}
                onChange={(e) => handleChange(e)}
                required={showParentCategory}
              >
                <option value="">Parent Category</option>
                {!isLoading &&
                  data
                    .filter((item) => item.parentId === null)
                    .map(({ id, name }, index) => (
                      <option key={index} value={id}>
                        {name}
                      </option>
                    ))}
              </select>
            </fieldset>

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  document.getElementById("add_category").close();
                  setDataCategory({ id: "", name: "", parentId: "" });
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                form="form_add_category"
                className="btn btn-primary btn-sm"
              >
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
