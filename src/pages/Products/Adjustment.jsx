import { Save } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import api from "@/utils/api";
import Select from "react-select";

export function Adjustment() {
  const [options, setOptions] = useState([]);

  const loadOptions = (inputValue) => {
    // Simulasi pencarian data
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOptions = [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ].filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        resolve(filteredOptions);
      }, 1000); // Simulasi delay 1 detik
    });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "2rem", // Mengatur tinggi agar sesuai input-sm
      borderRadius: "0.5rem", // Optional: menyesuaikan border-radius
      borderColor: "#d1d5db", // Optional: warna border default Tailwind (gray-300)
    }),
    input: (base) => ({
      ...base,
      fontSize: "0.875rem", // Ukuran teks (text-sm Tailwind)
    }),
    option: (base) => ({
      ...base,
      fontSize: "0.875rem", // Ukuran teks opsi dropdown
    }),
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Adjustment</h1>
      <div className="card bg-white shadow-md p-4 h-[90vh]">
        <div className="max-w-lg p-1 md:p-4">
          {/* Form Search Produk */}
          <label className="text-xs font-semibold">Search Product</label>
          <Select
            className="w-full input-sm mb-2"
            options={options}
            onInputChange={(inputValue) => {
              loadOptions(inputValue).then((data) => setOptions(data));
            }}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: state.isFocused ? "black" : provided.borderColor,
                boxShadow: state.isFocused
                  ? "0 0 0 1px black"
                  : provided.boxShadow,
                "&:hover": {
                  borderColor: state.isFocused ? "black" : provided.borderColor,
                },
                borderRadius: "0.3rem",
              }),
            }}
            placeholder="Cari..."
            isClearable
          />
          <label className="text-xs font-semibold">Notes</label>
          <textarea
            className="textarea textarea-sm textarea-bordered w-full"
            placeholder="e.g. stock recount correction"
          />

          {/* Tabel atau list varian */}
          {/* Tombol Submit */}
        </div>

        <div className="overflow-x-auto card bg-white shadow-md p-2 pb-6 h-full">
          <table className="table table-xs w-full table-auto table-zebra">
            {/* Head */}
            <thead>
              <tr>
                {[
                  "Variant",
                  "Stock",
                  <span className="text-success">Actual Stock</span>,
                  ,
                  "Adjust",
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
            <tbody>
              <tr>
                <td>SV -025</td>
                <td>10</td>
                <td>
                  <input
                    type="text"
                    className="input input-sm focus:border-none"
                  />
                </td>
                <td>10</td>
              </tr>
              <tr>
                <td>SV -025</td>
                <td>10</td>
                <td>
                  <input
                    type="text"
                    className="input input-sm focus:border-none"
                  />
                </td>
                <td>10</td>
              </tr>
              <tr>
                <td>SV -025</td>
                <td>10</td>
                <td>
                  <input
                    type="text"
                    className="input input-sm focus:border-none"
                  />
                </td>
                <td>10</td>
              </tr>
              <tr>
                <td>SV -025</td>
                <td>10</td>
                <td>
                  <input
                    type="text"
                    className="input input-sm focus:border-none"
                  />
                </td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="join w-full gap-2 mb-1 justify-end pt-4">
          <Link
            to="/products/stock-adjustments"
            type="submit"
            name="next"
            className="btn btn-sm join-item btn-soft btn-primary"
            //   disabled={isLoadingSave}
          >
            « Back
          </Link>
          <button
            type="submit"
            name="save"
            className="btn btn-sm join-item btn-primary"
            //   disabled={isLoadingSave}
          >
            {/* {isLoadingSave ? (
                <span className="loading loading-sm loading-spinner"></span>
              ) : (
                <>
                  <Save className="h-4" /> Save
                </>
              )} */}
            <Save className="h-4" /> Apply Adjustment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adjustment;
