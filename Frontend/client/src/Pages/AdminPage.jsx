import React from "react";

export default function AdminPage() {
  return (
    <div className="bg-slate-400 h-screen">
      <div className="bg-slate-300 p-2 shadow-md flex justify-between">
        <h1 className="">Admin Page</h1>
        <h1>Abdulkaki Mustefa \ Admin</h1>
      </div>
      <div className="mt-4">
        <button className="bg-slate-300 shadow-lg  active:bg-slate-200 rounded-full px-4 py-1 ">
          List of User
        </button>
      </div>
    </div>
  );
}
