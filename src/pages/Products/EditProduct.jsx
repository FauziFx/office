import {
  CircleX,
  Info,
  Lightbulb,
  Save,
  Settings,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import api from "@/utils/api";
import useProductStore from "@/store/useProductStore";

export function EditProduct() {
  const idParams = useParams().id;

  // Validasi
  if (!/^\d+$/.test(idParams)) {
    return <Navigate to="/products" replace />;
  }
  const navigate = useNavigate();
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const {
    id,
    name,
    categoryId,
    description,
    status,
    base_price,
    variants,
    setName,
    setCategoryId,
    setDescription,
    setStatus,
    setBasePrice,
    addVariant,
    removeVariant,
    updateVariantField,
    setProduct,
    markVariantDeleted,
    deletedVariantIds,
    resetForm,
  } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setIsLoadingSave(true);
      const payload = {
        name,
        categoryId,
        status: status ? 1 : 0,
        description,
        base_price: Number(base_price),
        updatedVariants: variants
          .filter((d) => {
            return d.id != null;
          })
          .map((v) => ({
            id: v.id,
            name: v.name,
            price: Number(v.price),
            stock: Number(v.stock),
            minimum_stock: Number(v.minimum_stock),
            track_stock: v.track_stock ? 1 : 0,
          })),
        newVariants: variants
          .filter((d) => {
            return d.id == null;
          })
          .map((v) => ({
            name: v.name,
            price: Number(v.price),
            stock: Number(v.stock),
            minimum_stock: Number(v.minimum_stock),
            track_stock: v.track_stock ? 1 : 0,
          })),
        deletedVariantIds,
      };

      const response = await api.patch("/products/" + idParams, payload);

      if (response.data.success) {
        setIsLoadingSave(true);
        navigate("/products");
        resetForm();
      } else {
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const responseCategory = await api.get("/categories?type=main");

      setProduct(response.data.data);

      return responseCategory.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(`/products/${idParams}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const handleScroll = (e) => {
    e.target.addEventListener(
      "wheel",
      function (e) {
        e.preventDefault();
      },
      {
        passive: false,
      }
    );
  };

  if (error) return <p>Error loading data.</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <div className="card bg-white shadow-md p-4 md:p-6 md:h-[90vh]">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-2 justify-between">
            <div className="w-full md:w-[40%]">
              <div className="w-full max-w-md mb-2">
                <label className="text-xs font-semibold">Product Name</label>
                <input
                  type="text"
                  className="input input-sm w-full"
                  required
                  placeholder="Name of the Product"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full max-w-md mb-2">
                <label className="text-xs font-semibold">Category</label>
                <select
                  className="select select-sm shadow w-full md:1/5"
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Product Category...</option>
                  {!isLoading &&
                    data.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full max-w-md mb-2">
                <label className="text-xs font-semibold">Status</label>
                <div className="flex flex-row gap-4">
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                    <span className="label-text text-xs ml-2">
                      Displayed in POS
                    </span>
                  </label>
                </div>
              </div>
              <div className="w-full max-w-md mb-2">
                <label className="text-xs font-semibold">Description</label>
                <textarea
                  className="textarea textarea-sm w-full"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="w-full md:w-[60%]">
              <div className="w-full max-w-md mb-2">
                <label className="text-xs font-semibold">Base Price</label>
                <input
                  type="number"
                  className="input input-sm w-full"
                  min="0"
                  required
                  placeholder="10000"
                  onFocus={(e) => handleScroll(e)}
                  value={base_price}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-xs btn-primary w-full mb-2"
                onClick={() => addVariant()}
              >
                + Add Variant
              </button>
              <div className="overflow-x-auto card bg-white shadow-md p-2 pb-6 max-h-[65vh]">
                <table className="table table-xs w-full table-auto table-zebra">
                  {/* Head */}
                  <thead>
                    <tr>
                      {[
                        "Variant",
                        "Price",
                        "Stock",
                        "Min Stock",
                        "Track Stock",
                        <Settings className="h-4 w-4" />,
                      ].map((el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 text-left"
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
                  <tbody>
                    {variants.map((variant, index) => (
                      <tr key={index}>
                        <td className="px-1">
                          <input
                            type="text"
                            className="input input-sm focus:border-none p-1"
                            value={variant.name}
                            onChange={(e) =>
                              updateVariantField(index, "name", e.target.value)
                            }
                            placeholder="Variant Name"
                            required
                          />
                        </td>
                        <td className="px-1">
                          <input
                            type="number"
                            className="input input-sm focus:border-none p-1"
                            onFocus={(e) => handleScroll(e)}
                            value={variant.price}
                            onChange={(e) =>
                              updateVariantField(index, "price", e.target.value)
                            }
                            placeholder="Price"
                            required
                          />
                        </td>
                        <td className="px-1">
                          <input
                            type="number"
                            className={`input input-sm focus:border-none p-1 w-15 ${
                              variant.id ? "cursor-not-allowed" : ""
                            }`}
                            onFocus={(e) => handleScroll(e)}
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariantField(index, "stock", e.target.value)
                            }
                            placeholder="Stock"
                            required
                            readOnly={variant.id}
                          />
                        </td>
                        <td className="px-1">
                          <input
                            type="number"
                            className="input input-sm focus:border-none p-1 w-15"
                            onFocus={(e) => handleScroll(e)}
                            value={variant.minimum_stock}
                            onChange={(e) =>
                              updateVariantField(
                                index,
                                "minimum_stock",
                                e.target.value
                              )
                            }
                            placeholder="Min Stock"
                            required
                          />
                        </td>
                        <td className="px-1 text-center">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm checkbox-primary mx-auto"
                            checked={variant.track_stock}
                            onChange={(e) =>
                              updateVariantField(
                                index,
                                "track_stock",
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td className="px-1 text-center">
                          {variants.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-xs btn-circle btn-error"
                              onClick={() => {
                                variant.id
                                  ? markVariantDeleted(variant.id)
                                  : removeVariant(index);
                              }}
                            >
                              <CircleX className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="join w-full gap-2 mb-1 justify-end items-center pt-4">
            <div className="text-xs">
              <Lightbulb className="h-4 w-4 inline mb-1 text-warning" />
              <span className="text-gray-500">
                Adjust stock through the{" "}
                <Link
                  to="/products/stock-adjustments"
                  className="link text-black"
                >
                  Stock Adjustment{" "}
                </Link>
                menu.
              </span>
            </div>
            <Link
              to="/products"
              type="submit"
              name="next"
              className="btn btn-sm join-item btn-soft btn-primary"
              disabled={isLoadingSave}
            >
              « Back
            </Link>
            <button
              type="submit"
              name="save"
              className="btn btn-sm join-item btn-primary"
              disabled={isLoadingSave}
            >
              {isLoadingSave ? (
                <span className="loading loading-sm loading-spinner"></span>
              ) : (
                <>
                  <Save className="h-4" /> Save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
