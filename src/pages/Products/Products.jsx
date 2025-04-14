import { Eye, Pencil, Plus, Settings, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingTable } from "@/components";
import api from "@/utils/api";
import useSWR, { useSWRConfig } from "swr";

export function Products() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15

  // Query string berdasarkan filter
  const query = new URLSearchParams({ page, limit });
  if (name) query.append("name", name);
  if (categoryId) query.append("categoryId", categoryId);

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
                          onChange={() => console.log(id)}
                        />
                        {status === 1 ? "Active" : "Inactive"}
                      </label>
                    </td>
                    <td className="border-b border-gray-200">
                      <button
                        className="btn btn-xs btn-ghost btn-circle text-info tooltip mr-2"
                        data-tip="Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
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
    </div>
  );
}

export default Products;
