import React from "react";
import AgentProfile from "../components/AgentProfile";
import Tools from "../components/Tools";
import Deployment from "../components/Deployment";

export default function CortexAgent() {
  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Agent Profile Section */}
      <AgentProfile />

      {/* Tools Section */}
      <Tools />

      {/* Deployment Section */}
      <Deployment />
    </div>
  );
}