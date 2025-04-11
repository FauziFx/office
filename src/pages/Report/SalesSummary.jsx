import {
  Banknote,
  CircleMinus,
  CirclePlus,
  CreditCard,
  QrCode,
  Repeat,
  Settings,
} from "lucide-react";
import React, { useState } from "react";

export function SalesSummary() {
  const [openRow, setOpenRow] = useState(null); // Menyimpan ID baris yang terbuka
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId); // Buka/tutup baris
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Sales Summary</h1>
      <div className="card bg-white shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between">
          <div className="flex gap-1 items-center w-full md:w-1/2">
            <fieldset className="fieldset w-full py-0 md:w-1/2">
              <legend className="fieldset-legend font-normal md:hidden py-1">
                From
              </legend>
              <label className="join shadow">
                <button className="join-item btn btn-sm font-normal hidden md:block">
                  From
                </button>
                <input
                  type="date"
                  className="join-item rounded-l md:rounded-l-none md:rounded-r input input-sm"
                  // value={startDate || ""}
                  // onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
            </fieldset>
            <span className="pt-4 md:pt-0">-</span>
            <fieldset className="fieldset w-full py-0 md:w-1/2">
              <legend className="fieldset-legend font-normal md:hidden py-1">
                To
              </legend>
              <label className="join shadow">
                <button className="join-item btn btn-sm font-normal hidden md:block">
                  To
                </button>
                <input
                  type="date"
                  className="join-item rounded-l md:rounded-l-none md:rounded-r input input-sm"
                  // value={endDate || ""}
                  // onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="card bg-white shadow-md mt-4 p-2 pb-6">
        <div className="bg-white shadow-md rounded-xl p-4 md:p-6 mb-2">
          <h4 className="text-sm text-gray-500">Revenue</h4>
          <p className="text-xl md:text-2xl font-semibold text-green-600">
            Rp 5.000.000
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div className="flex flex-row w-full md:w-1/2 rounded-box border border-base-content/5 bg-base-100">
            <table className="table w-full table-sm table-zebra">
              <tbody>
                <tr>
                  <td className="font-bold text-lg">Revenue</td>
                  <td className="font-bold text-lg">Rp 5.000.000</td>
                </tr>
                <tr>
                  <td className="font-medium">General</td>
                  <td>Rp 5.000.000</td>
                </tr>
                <tr>
                  <td className="font-medium">Sindang</td>
                  <td>Rp 5.000.000</td>
                </tr>
                <tr>
                  <td className="font-medium">Karangsembung</td>
                  <td>Rp 5.000.000</td>
                </tr>
                <tr>
                  <td className="font-medium">Total Items Sold</td>
                  <td>124</td>
                </tr>
                <tr>
                  <td className="font-medium">Total Transactions</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td className="font-medium">Avg. Transaction</td>
                  <td>Rp 119.000</td>
                </tr>
                <tr>
                  <td colSpan={2}></td>
                </tr>
                <tr>
                  <td className="font-bold text-lg" colSpan={2}>
                    Sales By Transaction Type
                  </td>
                </tr>
                <tr>
                  <td className="font-medium">Grosir</td>
                  <td>Rp 119.000</td>
                </tr>
                <tr>
                  <td className="font-medium">MA Grup</td>
                  <td>Rp 119.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full md:w-1/2 rounded-box border border-base-content/5 bg-base-100">
            <div className="p-2 flex justify-between">
              <h2 className="text-lg font-bold w-full">Top Customers</h2>
              <select defaultValue="Pick a color" className="select select-sm">
                <option>All</option>
                <option>Grosir</option>
                <option>MA</option>
              </select>
            </div>
            <table className="table w-full table-sm table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Store</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td className="font-medium">INDAH MA</td>
                  <td>Rp 119.000</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="font-medium">INDAH MA</td>
                  <td>Rp 119.000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="font-medium">INDAH MA</td>
                  <td>Rp 119.000</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="font-medium">INDAH MA</td>
                  <td>Rp 119.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesSummary;
