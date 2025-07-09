import React from "react";

export default function OmegaAgentCard({ title, description, status }) {
  return (
    <div className="border p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className={`text-xs mt-2 block font-semibold ${status === "active" ? "text-green-500" : "text-red-500"}`}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}
