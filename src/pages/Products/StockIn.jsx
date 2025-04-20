import { Save } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import api from "@/utils/api";
import Select from "react-select";
import useStockStore from "@/store/useStockStore";
import Swal from "sweetalert2";

export function StockIn() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const {
    selectedProduct,
    variants,
    note,
    setVariants,
    setSelectedProduct,
    setNotes,
    setAdjustQty,
    resetForm,
  } = useStockStore();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      "&:hover": {
        borderColor: state.isFocused ? "black" : provided.borderColor,
      },
      borderRadius: "0.3rem",
    }),
  };

  const handleSelect = (selected) => {
    if (selected) {
      setSelectedProduct(selected);
    } else {
      setSelectedProduct(null);
      setVariants([]); // Kosongkan variant
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingSave(true);
      const filteredVariants = variants.filter(
        (variant) => variant.adjust !== "" && parseInt(variant.adjust) > 0
      );

      if (filteredVariants.length === 0) {
        Swal.fire("No stock adjustment data to submit.");
        return;
      }

      const payload = filteredVariants.map((variant) => ({
        productId: selectedProduct.value,
        productName: selectedProduct.label,
        variantId: variant.id,
        variantName: variant.name,
        type: "in", // atau "in", "out" sesuai kebutuhan
        before_stock: variant.stock,
        adjust: Number(variant.adjust),
        after_stock: Number(variant.after_stock),
        note: note,
      }));

      const response = await api.post("/stock/adjustments", { items: payload });

      if (response.data.success) {
        Swal.fire(response.data.message);
        resetForm();
      } else {
        Swal.fire(response.data.message);
      }

      setIsLoadingSave(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to submit adjustment.");
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);
      const data = response.data.data.map((p) => ({
        value: p.id,
        label: p.name,
      }));

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(`/products?all=true`, fetcher, {
    revalidateOnFocus: false,
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
      <h1 className="text-xl font-bold mb-4">Stock In</h1>
      <div className="card bg-white shadow-md p-4 h-[100vh]">
        <form id="form-stock-in" onSubmit={handleSubmit}>
          <div className="max-w-lg p-1 md:p-4">
            {/* Form Search Produk */}
            <label className="text-xs font-semibold">Search Product</label>
            <Select
              className="w-full input-sm mb-2"
              options={isLoading ? [] : data}
              styles={customStyles}
              onChange={(selected) => handleSelect(selected)}
              placeholder="Search by Product Name..."
              isClearable
              required
            />
            <label className="text-xs font-semibold">Notes</label>
            <textarea
              className="textarea textarea-sm textarea-bordered w-full"
              placeholder="e.g. stock recount correction"
              value={note}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* Tabel atau list varian */}
            {/* Tombol Submit */}
          </div>

          <div className="overflow-auto card bg-white shadow-md p-2 pb-6 h-[60vh]">
            <table className="table table-xs w-full table-auto table-zebra">
              {/* Head */}
              <thead>
                <tr>
                  {[
                    "Variant",
                    "Stock",
                    <span className="text-success">Qty [+]</span>,
                    "Final",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 px-2 text-left"
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
                {variants.length > 0 ? (
                  variants.map(
                    (
                      { id, name, before_stock, adjust, after_stock },
                      index
                    ) => (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{before_stock}</td>
                        <td>
                          <input
                            type="number"
                            className="input input-sm focus:border-none"
                            value={adjust}
                            onChange={(e) =>
                              setAdjustQty(index, e.target.value, "in")
                            }
                            onFocus={(e) => handleScroll(e)}
                            onKeyDown={(event) => {
                              if (
                                event.key === "ArrowUp" ||
                                event.key === "ArrowDown"
                              ) {
                                event.preventDefault();
                              }
                            }}
                          />
                        </td>
                        <td>{after_stock}</td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <p className="text-center p-4">
                        Select a product to see variants.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="join w-full gap-2 mb-1 justify-end pt-4">
            <Link
              to="/products/stock-adjustments"
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
              form="form-stock-in"
              className="btn btn-sm join-item btn-primary"
              disabled={isLoadingSave}
            >
              {isLoadingSave ? (
                <span className="loading loading-sm loading-spinner"></span>
              ) : (
                <>
                  <Save className="h-4" /> Apply Stock In
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StockIn;
