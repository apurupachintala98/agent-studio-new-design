import { useState } from "react";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
  SectionHeader,
} from "./SharedComponents";

// --- Tool Card Icons ---
const MonitorIcon = ({ selected }) => (
  <div
    className="flex items-center justify-center rounded-lg"
    style={{
      width: 36,
      height: 36,
      backgroundColor: selected ? "#EBF5FB" : "#F0F0F0",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="11" rx="1.5" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" fill="none" />
      <path d="M7 17H13" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14V17" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

const EnvelopeIcon = () => (
  <div
    className="flex items-center justify-center rounded-lg"
    style={{
      width: 36,
      height: 36,
      backgroundColor: "#F0F0F0",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="#90A4AE" strokeWidth="1.5" fill="none" />
      <path d="M2 6L10 11L18 6" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CheckFilled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#0072C6" />
    <path d="M7 12.5L10 15.5L17 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircleOutline = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#B0BEC5" strokeWidth="1.5" fill="none" />
  </svg>
);

// --- Tool Card ---
function ToolCard({ name, description, selected, type = "monitor", onToggle }) {
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all"
      style={{
        backgroundColor: "#FFFFFF",
        border: selected ? "2px solid #0072C6" : "1px solid #E0E0E0",
        boxShadow: selected ? "0 0 0 1px #0072C6" : "0 1px 3px rgba(0,0,0,0.04)",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={onToggle}
    >
      {/* Top row: icon left, check right */}
      <div className="flex items-start justify-between">
        {type === "monitor" ? (
          <MonitorIcon selected={selected} />
        ) : (
          <EnvelopeIcon />
        )}
        {selected ? <CheckFilled /> : <CircleOutline />}
      </div>

      {/* Bottom: name + description */}
      <div className="mt-4">
        <p
          className="font-semibold"
          style={{
            fontSize: 13,
            color: selected ? "#1A1A1A" : "#546E7A",
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {name}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontSize: 12,
            color: "#90A4AE",
            lineHeight: 1.3,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// --- Tools Data ---
const initialTools = [
  { id: 1, name: "Claims_analyst_text_to_sql", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 2, name: "Aedl_metadata_analyst_text_to_sql", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 3, name: "Merge_pr", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 4, name: "Aedl_metadata_analyst_text_to_sql", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 5, name: "Promote_tokenization_metadata", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 6, name: "Validate_change_task", description: "Lorem Ipsum is simply dummy text", selected: true, type: "monitor" },
  { id: 7, name: "Validate_change_request", description: "Lorem Ipsum is simply dummy text", selected: false, type: "envelope" },
  { id: 8, name: "Validate_change_task", description: "Lorem Ipsum is simply dummy text", selected: false, type: "envelope" },
  { id: 9, name: "Check_merge_status", description: "Lorem Ipsum is simply dummy text", selected: false, type: "envelope" },
  { id: 10, name: "Validate_ritm", description: "Lorem Ipsum is simply dummy text", selected: false, type: "envelope" },
];

// --- Tools Grid Section ---
function ToolsSection() {
  const [tools, setTools] = useState(initialTools);

  const toggleTool = (id) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  return (
    <div>
      {/* Header row with Search */}
      <div className="flex items-center justify-between mb-4">
        <SectionHeader>Tools</SectionHeader>
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color: "#78909C" }}>Search</span>
          <div className="flex items-center">
            <span
              className="text-sm"
              style={{ color: "#546E7A", fontWeight: 500, paddingRight: 4 }}
            >
              Default
            </span>
            <div
              style={{
                width: 160,
                height: 1,
                backgroundColor: "#E0E0E0",
                marginLeft: 4,
              }}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            description={tool.description}
            selected={tool.selected}
            type={tool.type}
            onToggle={() => toggleTool(tool.id)}
          />
        ))}
      </div>
    </div>
  );
}

// --- Orchestration Section ---
function OrchestrationSection() {
  return (
    <div
      className="rounded-lg bg-white"
      style={{
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="px-5 py-5">
        <div className="flex items-start">
          <label
            className="text-sm flex-shrink-0 pr-3 pt-3"
            style={{ color: "#546E7A", fontWeight: 400 }}
          >
            Orchestration Instruction
          </label>
          <textarea
            className="flex-1 rounded-sm p-3 text-sm resize-none"
            rows={5}
            style={{
              backgroundColor: "#F5F7F8",
              border: "1px solid #ECEFF1",
              outline: "none",
              color: "#263238",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// --- Footer Buttons ---
function FooterButtons() {
  return (
    <div className="flex items-center justify-end gap-3 py-6 px-2">
      <button
        className="px-6 py-2.5 rounded-full text-sm font-medium"
        style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent" }}
      >
        Discard
      </button>
      <button
        className="px-6 py-2.5 rounded-full text-sm font-medium"
        style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent" }}
      >
        Save as Draft
      </button>
      <button
        className="px-6 py-2.5 rounded-full text-sm font-medium text-white"
        style={{ backgroundColor: "#0072C6", border: "1.5px solid #0072C6" }}
      >
        Save & Continue
      </button>
    </div>
  );
}

// --- Main Page ---
export default function ToolsAndOrchestration() {
  return (
    <PageLayout>
      <BackToDashboard />
      <Stepper activeStep={2} />

      <div className="mt-5">
        <ToolsSection />
      </div>

      <div className="mt-7">
        <SectionHeader>Orchestration</SectionHeader>
        <OrchestrationSection />
      </div>

      <FooterButtons />
    </PageLayout>
  );
}
