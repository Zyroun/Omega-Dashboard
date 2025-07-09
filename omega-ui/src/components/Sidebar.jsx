import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/agents", label: "Agent Manager" },
  { path: "/settings", label: "API Settings" },
  { path: "/logs", label: "System Logs" }
];

export default function Sidebar() {
  return (
    <aside className="bg-black text-white h-full w-60 p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold">Control Panel</h2>
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className="hover:text-teal-300 transition"
        >
          {item.label}
        </Link>
      ))}
    </aside>
  );
}
