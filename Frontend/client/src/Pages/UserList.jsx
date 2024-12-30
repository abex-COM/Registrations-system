import axios from "axios";
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        const resp = await axios.get("http://localhost:8000/api/v1/users");
        setUsers(resp.data.users || []);
      } catch (err) {
        console.log("Error fetching data:" + err);
      }
    }
    getData();
  }, []);

  async function deletUser(id) {
    try {
      const resp = await axios.delete(
        `http://localhost:8000/api/v1/users/${id}`
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove the deleted user from state
    } catch (err) {
      console.log("Error fetching data:" + err);
    }
  }

  function handlePrint() {
    return window.print();
  }

  return (
    <div className="w-full grid p-6 gap-3">
      <h1 className="text-green-600 text-xl font-bold">List of Users</h1>
      <button
        className="bg-sky-400 rounded-md w-max px-4 py-1 text-sky-100"
        onClick={handlePrint}
      >
        Print
      </button>
      <Table data={users} deleteUser={deletUser} />
    </div>
  );
}

const Table = ({ data, deleteUser }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Current page index (starts at 0)
    pageSize: 5, // Number of rows per page
  });
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
  ];

  // Create a table instance
  const table = useReactTable({
    data,
    columns,
    state: { pagination }, // Pass pagination state
    onPaginationChange: setPagination, // Handle pagination state change
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Handles basic row generation
  });
  getCoreRowModel;

  const handleID = (id) => {
    deleteUser(id);
  };
  return (
    <div>
      <table className="border-2 w-full select-none">
        <thead className="border-2 bg-green-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>#</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border-2 bg-sl">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="boder-2">delete</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td className="border-2 text-center">{row.index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-2 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="border-2 text-center text-red-400">
                <button onClick={() => handleID(row.original.id)}>
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-teal-500 text-teal-50 px-4 py-1 rounded-full"
        >
          &larr;
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          className="bg-teal-500 text-teal-50 px-4 py-1 rounded-full"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          &rarr;
        </button>
        <div>users : {data.length}</div>
      </div>
    </div>
  );
};
