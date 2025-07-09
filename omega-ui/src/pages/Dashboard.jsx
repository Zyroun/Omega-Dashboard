import React from "react";
import OmegaAgentCard from "../components/OmegaAgentCard";

const dummyAgents = [
  { title: "Shopify Order Bot", description: "Handles orders & receipts", status: "active" },
  { title: "SEO Engine", description: "Backlink & Meta optimization", status: "idle" }
];

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {dummyAgents.map(agent => (
        <OmegaAgentCard key={agent.title} {...agent} />
      ))}
    </div>
  );
}
