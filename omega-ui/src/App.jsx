import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import AgentManager from "./pages/AgentManager";
import APISettings from "./pages/APISettings";
import Logs from "./pages/Logs";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<AgentManager />} />
            <Route path="/settings" element={<APISettings />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
