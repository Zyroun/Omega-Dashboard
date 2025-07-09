import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Omega UI v3</h1>
      <span className="text-sm text-gray-600">Autonomous n8n Agent Control</span>
    </header>
  );
}
