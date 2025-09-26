import React from "react";

function Header({ stcEnabled, toggleSTC, team }) {
  return (
    <header className="flex items-center justify-between bg-white rounded-2xl p-4 shadow">
      <div>
        <h1 className="text-xl font-bold">
         TRAFFIX
        </h1>
      </div>
      <button
        onClick={toggleSTC}
        className={`px-3 py-1 rounded-lg font-semibold ${
          stcEnabled ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {stcEnabled ? "STC On" : "STC Off"}
      </button>
    </header>
  );
}

export default Header;
