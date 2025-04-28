import {
  Banknote,
  CircleMinus,
  CirclePlus,
  CornerDownRight,
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
import dayjs from "dayjs"; // Core Day.js
import utc from "dayjs/plugin/utc"; // Plugin UTC
import timezone from "dayjs/plugin/timezone"; // Plugin Timezone
// Extend plugins ke Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

export function Retails() {
  const [openRow, setOpenRow] = useState(null);
  const toggleRow = (rowId) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };
  const { mutate } = useSWRConfig();
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15; // Default limit 15
  const [dataCustomer, setDataCustomer] = useState({
    id: "",
    date: "",
    receipt_no: "",
    name: "",
    address: "",
    phone: "",
    frame: "",
    lens: "",
    price: "",
    rsph: "",
    rcyl: "",
    raxis: "",
    radd: "",
    lsph: "",
    lcyl: "",
    laxis: "",
    ladd: "",
    note: "",
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
  const [isEditMode, setIsEditMode] = useState(false);
  const query = new URLSearchParams({ page, limit });
  if (name) query.append("name", name);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCustomer({
      ...dataCustomer,
      [name]: value,
    });
  };

  const handlePower = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    if (!isNaN(value)) {
      setDataCustomer({
        ...dataCustomer,
        [field]: value,
      });
    } else if (value == "-" || value == "+") {
      setDataCustomer({
        ...dataCustomer,
        [field]: value,
      });
    }
  };

  const handleAddData = async () => {
    try {
      const response = await api.get("/retails/receipt");

      setDataCustomer({
        ...dataCustomer,
        receipt_no: response.data.data,
      });

      document.getElementById("add_data").showModal();
      setIsEditMode(false);
    } catch (error) {
      console.log(error);
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
      const response = await api.post("/retails", {
        date: dataCustomer.date,
        receipt_no: dataCustomer.receipt_no,
        name: dataCustomer.name,
        address: dataCustomer.address,
        phone: dataCustomer.phone,
        frame: dataCustomer.frame,
        lens: dataCustomer.lens,
        price: dataCustomer.price,
        od: [
          dataCustomer.rsph,
          dataCustomer.rcyl,
          dataCustomer.raxis,
          dataCustomer.radd,
        ].join("/"),
        os: [
          dataCustomer.lsph,
          dataCustomer.lcyl,
          dataCustomer.laxis,
          dataCustomer.ladd,
        ].join("/"),
        note: dataCustomer.note,
      });
      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/retails?${query.toString()}`);
        document.getElementById("add_data").close();
        setDataCustomer({
          id: "",
          date: "",
          receipt_no: "",
          name: "",
          address: "",
          phone: "",
          frame: "",
          lens: "",
          price: "",
          rsph: "",
          rcyl: "",
          raxis: "",
          radd: "",
          lsph: "",
          lcyl: "",
          laxis: "",
          ladd: "",
          note: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (id, data) => {
    try {
      const response = await api.patch("/retails/" + id, {
        date: data.date,
        receipt_no: data.receipt_no,
        name: data.name,
        address: data.address,
        phone: data.phone,
        frame: data.frame,
        lens: data.lens,
        price: data.price,
        od: [data.rsph, data.rcyl, data.raxis, data.radd].join("/"),
        os: [data.lsph, data.lcyl, data.laxis, data.ladd].join("/"),
        note: data.note,
      });
      if (response.data.success) {
        Swal.fire(response.data.message);
        mutate(`/retails?${query.toString()}`);
        document.getElementById("add_data").close();
        setDataCustomer({
          id: "",
          date: "",
          receipt_no: "",
          name: "",
          address: "",
          phone: "",
          frame: "",
          lens: "",
          price: "",
          rsph: "",
          rcyl: "",
          raxis: "",
          radd: "",
          lsph: "",
          lcyl: "",
          laxis: "",
          ladd: "",
          note: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = ({
    id,
    date,
    receipt_no,
    name,
    address,
    phone,
    frame,
    lens,
    price,
    od,
    os,
    note,
  }) => {
    setDataCustomer({
      id: id,
      date: date.split("T")[0],
      receipt_no: receipt_no,
      name: name,
      address: address,
      phone: phone,
      frame: frame,
      lens: lens,
      price: price,
      rsph: od.split("/")[0],
      rcyl: od.split("/")[1],
      raxis: od.split("/")[2],
      radd: od.split("/")[3],
      lsph: os.split("/")[0],
      lcyl: os.split("/")[1],
      laxis: os.split("/")[2],
      ladd: os.split("/")[3],
      note: note,
    });
    setIsEditMode(true);
    document.getElementById("add_data").showModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Deleted Customer?",
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
      const response = await api.delete(`/retails/${id}`);

      mutate(`/retails?${query.toString()}`);
      Swal.fire(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetcher = async (url) => {
    try {
      const response = await api.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `/retails?${query.toString()}`,
    fetcher
  );

  if (error) return <p>Error loading data.</p>;
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Retails</h1>
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
            onClick={() => handleAddData()}
            className="btn btn-primary btn-sm w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Data
          </button>
        </div>
      </div>
      <div className="overflow-x-auto card bg-white shadow-md mt-4 p-2 pb-6">
        <table className="table table-xs w-full min-w-[768px] table-auto">
          {/* Head */}
          <thead>
            <tr>
              {[
                "",
                "Date",
                "Recipt",
                "Name",
                "Product",
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
              data.data.map(
                (
                  {
                    id,
                    date,
                    receipt_no,
                    name,
                    address,
                    phone,
                    frame,
                    lens,
                    price,
                    od,
                    os,
                    note,
                  },
                  index
                ) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="border-b border-gray-200" width="1%">
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
                      </td>
                      <td className="border-b border-gray-200">
                        {dayjs(date).tz("Asia/Jakarta").format("DD MMM YYYY")}
                      </td>
                      <td className="border-b border-gray-200">{receipt_no}</td>
                      <td className="border-b border-gray-200">
                        <p className="text-xs font-semibold capitalize">
                          {name}
                        </p>
                      </td>
                      <td className="border-b border-gray-200">
                        <p>{frame}</p>
                        <p>{lens}</p>
                      </td>
                      <td className="border-b border-gray-200">
                        <button
                          className="btn btn-xs btn-ghost btn-circle text-success tooltip mr-2"
                          data-tip="Edit"
                          onClick={() =>
                            handleUpdate({
                              id,
                              date,
                              receipt_no,
                              name,
                              address,
                              phone,
                              frame,
                              lens,
                              price,
                              od,
                              os,
                              note,
                            })
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
                    {openRow === id && (
                      <tr className="bg-gray-100">
                        <td
                          className="border border-gray-300 px-6 py-2"
                          colSpan={6}
                        >
                          <div className="flex items-start gap-2 w-full">
                            <CornerDownRight className="h-4 w-4" />
                            <div>
                              <p>
                                <span className="font-semibold">Price : </span>
                                Rp {price}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Address :{" "}
                                </span>
                                {address}
                              </p>
                              <p>
                                <span className="font-semibold">Phone : </span>
                                {phone}
                              </p>
                              <p className="text-xs text-gray-500">
                                <span className="text-black">od </span>
                                {od.split("/")[0] && "S " + od.split("/")[0]}
                                {od.split("/")[1] && " C" + od.split("/")[1]}
                                {od.split("/")[2] && " X" + od.split("/")[2]}
                                {od.split("/")[3] && " A" + od.split("/")[3]}
                              </p>
                              <p className="text-xs text-gray-500">
                                <span className="text-black">os </span>
                                {os.split("/")[0] && "S " + os.split("/")[0]}
                                {os.split("/")[1] && " C" + os.split("/")[1]}
                                {os.split("/")[2] && " X" + os.split("/")[2]}
                                {os.split("/")[3] && " A" + os.split("/")[3]}
                              </p>
                              <p className="text-xs">{note}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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

      {/* Modal Add Data */}
      <dialog id="add_data" className="modal">
        <div className="modal-box md:px-12">
          <h3 className="font-bold mb-4">
            {isEditMode ? "Edit Customer" : "Add Customer"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center"
          >
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Date</legend>
              <input
                type="date"
                className="input input-sm w-full"
                name="date"
                required
                value={dataCustomer.date}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Receipt No</legend>
              <input
                type="text"
                className="input input-sm w-full"
                name="receipt_no"
                required
                readOnly
                value={dataCustomer.receipt_no}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Name</legend>
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
              <legend className="fieldset-legend pb-0">Address</legend>
              <input
                type="text"
                className="input input-sm w-full"
                name="address"
                placeholder="Address"
                value={dataCustomer.address}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Phone Number</legend>
              <input
                type="number"
                className="input input-sm w-full"
                placeholder="e.g. 081xxxx"
                name="phone"
                value={dataCustomer.phone}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => handleScroll(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Frame</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="Frame"
                name="frame"
                value={dataCustomer.frame}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Lens</legend>
              <input
                type="text"
                className="input input-sm w-full"
                placeholder="Lens"
                name="lens"
                value={dataCustomer.lens}
                onChange={(e) => handleChange(e)}
              />
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Price</legend>
              <label className="input input-sm w-full">
                Rp
                <input
                  type="number"
                  className="grow"
                  name="price"
                  placeholder="0"
                  value={dataCustomer.price}
                  onChange={(e) => handleChange(e)}
                  onFocus={(e) => handleScroll(e)}
                  required
                />
              </label>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Power</legend>
              <div className="w-full max-w-md mb-2">
                <div className="join mb-2 gap-1">
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="R sph"
                    name="rsph"
                    value={dataCustomer.rsph}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="R cyl"
                    name="rcyl"
                    value={dataCustomer.rcyl}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="R axis"
                    name="raxis"
                    value={dataCustomer.raxis}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="R add"
                    name="radd"
                    value={dataCustomer.radd}
                    onChange={(e) => handlePower(e)}
                  />
                </div>
                <div className="join gap-1">
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="L sph"
                    name="lsph"
                    value={dataCustomer.lsph}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="L cyl"
                    name="lcyl"
                    value={dataCustomer.lcyl}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="L axis"
                    name="laxis"
                    value={dataCustomer.laxis}
                    onChange={(e) => handlePower(e)}
                  />
                  <input
                    type="text"
                    className="input input-sm px-1 join-item"
                    placeholder="L add"
                    name="ladd"
                    value={dataCustomer.ladd}
                    onChange={(e) => handlePower(e)}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend pb-0">Notes</legend>
              <textarea
                className="textarea textarea-sm w-full"
                name="note"
                placeholder="Notes"
                value={dataCustomer.note}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </fieldset>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  document.getElementById("add_data").close();
                  setDataCustomer({
                    date: "",
                    receipt_no: "",
                    name: "",
                    address: "",
                    phone: "",
                    frame: "",
                    lens: "",
                    price: "",
                    rsph: "",
                    rcyl: "",
                    raxis: "",
                    radd: "",
                    lsph: "",
                    lcyl: "",
                    laxis: "",
                    ladd: "",
                    note: "",
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

export default Retails;
