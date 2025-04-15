import {
  Check,
  Eye,
  MonitorCheck,
  MonitorX,
  Pencil,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";
import useProductStore from "@/store/useProductStore";

export function Products() {
  const { mutate } = useSWRConfig();
  const {
    name: productName,
    categoryId: productCategoryId,
    categories,
    status,
    description,
    base_price,
    variants,
    setProduct,
    resetForm,
  } = useProductStore();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15

  // Query string berdasarkan filter
  const query = new URLSearchParams({ page, limit });
  if (name) query.append("name", name);
  if (categoryId) query.append("categoryId", categoryId);

  const handleDetail = async (id) => {
    try {
      resetForm();
      const response = await api.get("/products/" + id);
      setProduct(response.data.data);

      document.getElementById("modal_product_details").showModal();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      await api.patch(`/products/${id}/status`, { status: newStatus });
      mutate(`/products?${query}`);
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const dataCategory = await api.get("/categories?type=main");

      const data = {
        dataCategory: dataCategory.data.data,
        dataProducts: response.data.data,
        totalData: response.data.totalData,
        totalPages: response.data.totalPages,
      };

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(`/products?${query}`, fetcher);

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Products</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <input
            type="search"
            placeholder="Search by product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-sm shadow w-full md:1/5"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="select select-sm shadow w-full md:1/5"
          >
            <option value="">All Categories</option>
            {!isLoading &&
              data.dataCategory.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            <option value="null">Uncategorized</option>
          </select>
          <select className="select select-sm shadow w-full md:1/5">
            <option value="">Subcategories</option>
          </select>
          <Link
            to="/products/add-product"
            className="btn btn-primary btn-sm w-full md:w-auto"
            onClick={() => resetForm()}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[640px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "Product Name",
                "Category",
                "Base Price",
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
              <LoadingTable row="10" colspan="5" />
            ) : (
              data.dataProducts.map(
                ({ id, name, categories, base_price, status }, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200">
                      <p className="text-xs font-semibold capitalize">{name}</p>
                    </td>
                    <td className="border-b border-gray-200">
                      <p className="text-xs font-semibold capitalize">
                        {categories?.name || "Uncategorized"}
                      </p>
                    </td>
                    <td className="border-b border-gray-200">
                      Rp {base_price}
                    </td>
                    <td className="border-b border-gray-200">
                      <label className="fieldset-label">
                        <input
                          type="checkbox"
                          className="toggle toggle-xs toggle-primary"
                          checked={status === 1}
                          onChange={() => toggleStatus(id, status)}
                        />
                        {status === 1 ? "Active" : "Inactive"}
                      </label>
                    </td>
                    <td className="border-b border-gray-200">
                      <button
                        className="btn btn-xs btn-ghost btn-circle text-info tooltip mr-2"
                        data-tip="Details"
                        onClick={() => handleDetail(id)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        to={`/products/edit-product/${id}`}
                        className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                        data-tip="Edit"
                        onClick={() => resetForm()}
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
                )
              )
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

      {/* Modal Detail */}
      <dialog id="modal_product_details" className="modal">
        <div className="modal-box w-11/12 max-w-5xl md:px-12">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold">Product Details</h3>
          <table className="table table-sm mb-4">
            <tbody>
              <tr>
                <th className="py-1 md:w-1/5">Product Name</th>
                <td className="py-1 w-[1%]">:</td>
                <td className="py-1">{productName}</td>
              </tr>
              <tr>
                <th className="py-1 md:w-1/5">Category</th>
                <td className="py-1 w-[1%]">:</td>
                <td className="py-1">{categories}</td>
              </tr>
              <tr>
                <th className="py-1 md:w-1/5">Base Price</th>
                <td className="py-1 w-[1%]">:</td>
                <td className="py-1">Rp {base_price}</td>
              </tr>
              <tr>
                <th className="py-1 md:w-1/5">Displayed in POS</th>
                <td className="py-1 w-[1%]">:</td>
                <td className="py-1">
                  {status ? (
                    <div className="badge badge-xs badge-success">
                      <MonitorCheck className="h-3 w-3" />
                      Displayed
                    </div>
                  ) : (
                    <div className="badge badge-xs badge-error">
                      <MonitorX className="h-3 w-3" />
                      Not Displayed
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th className="py-1 md:w-1/5">Description</th>
                <td className="py-1 w-[1%]">:</td>
                <td className="py-1">{description}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="font-bold">Product Variants</h3>
          <div className="overflow-x-auto">
            <table className="table table-xs table-zebra w-full min-w-[450px] table-auto">
              <thead>
                <tr>
                  {["SKU", "Name", "Price", "Stock", "Track Stock"].map(
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
              <tbody>
                {variants.length > 0 &&
                  variants.map((item, index) => (
                    <tr key={index}>
                      <td>{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td>
                        <label className="fieldset-label">
                          {item.track_stock ? (
                            <div className="badge badge-xs badge-success">
                              <Check className="h-3 w-3" />
                              Tracked
                            </div>
                          ) : (
                            <div className="badge badge-xs badge-error">
                              <X className="h-3 w-3" />
                              Not Tracked
                            </div>
                          )}
                        </label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Products;
