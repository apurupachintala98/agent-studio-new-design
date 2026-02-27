import { useState, useEffect } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "../components/SharedComponents";
import { fetchToolsByScopes } from "../services/agents"
import { useNavigate } from "react-router-dom";


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



// --- Tools Grid Section ---
function ToolsSection({ tools, toggleTool, searchTerm, setSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header row with Search */}
      {/* <div className="flex items-center justify-between mb-4">
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
      </div> */}

      {/* Header row with Search */}
      <div className="flex items-center justify-between mb-4">
        <SectionHeader>Tools</SectionHeader>
        <div className="flex items-center gap-3">
          <span
            className="text-sm flex-shrink-0"
            style={{ color: "#78909C", fontWeight: 400 }}
          >
            Search
          </span>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
            style={{
              width: 220,
              height: 36,
              backgroundColor: "#F0F2F3",
              border: "none",
              borderRadius: 6,
              padding: "0 12px",
              color: "#546E7A",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.name}
            description={tool.description}
            selected={tool.selected}
            type={tool.type}
            onToggle={() => toggleTool(tool.id)}
          />
        ))}

        {tools.length === 0 && (
  <div className="col-span-4 text-center text-gray-400 py-6">
    No tools found
  </div>
)}
      </div>
    </div>
  );
}

// --- Orchestration Section ---
function OrchestrationSection({ value, onChange }) {
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
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

// --- Main Page ---
export default function Tools({
  agentDetails,
  onSaveAndContinue,
  onCreateAgent,
  onBack
}) {

  const navigate = useNavigate();
  const [tools, setTools] = useState([])
  const [orchestrationInstruction, setOrchestrationInstruction] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!agentDetails) {
      console.log("AgentDetails not available yet")
      return
    }

    if (!agentDetails.agnt_access_scope) {
      console.log("No access scope found")
      return
    }

    try {
      const parsedScope = JSON.parse(agentDetails.agnt_access_scope)

      const scopesArray = parsedScope?.scopes || []

      console.log("Scopes Array:", scopesArray)

      if (!scopesArray.length) {
        console.log("Scopes array empty")
        return
      }

      loadTools(scopesArray)

    } catch (error) {
      console.error("Error parsing scope:", error)
    }

  }, [agentDetails])


  const loadTools = async (scopesArray) => {
    try {
      setLoading(true)

      const response = await fetchToolsByScopes(scopesArray)

      console.log("FULL TOOLS API RESPONSE:", response)

      const groupedTools = response?.data?.grouped_tools

      if (!groupedTools || groupedTools.length === 0) {
        console.log("No grouped tools found")
        setTools([])
        return
      }

      const formatted = groupedTools.flatMap((group) =>
        group.tools.map((tool) => ({
          id: tool.tool_id,
          name: tool.tool_nm,
          description: tool.tool_desc,
          selected: false,
          type: "monitor",
          original: tool,
        }))
      )

      console.log("Formatted Tools:", formatted)

      setTools(formatted)

    } catch (error) {
      console.error("Failed to fetch tools:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTool = (id) => {
    setTools((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t))
    );
  };

  const handleDiscard = () => {
    navigate("/dashboard");
  };

  const handleSaveDraft = () => {
    const draftData = {
      selectedTools: tools.filter((t) => t.selected).map((t) => t.id),
      orchestrationInstruction,
    };
    console.log("Saving draft:", draftData);
  };

  const handleSaveAndContinue = () => {
    const selectedTools = tools.filter(t => t.selected)

    if (!selectedTools.length) {
      alert("Please select at least one tool")
      return
    }

    const formattedTools = selectedTools.map(tool => ({
      type: tool.original?.tool_id || "monitor",  // adjust if backend expects different type
      name: tool.name,
      description: tool.description,
      db_name: tool.original?.tool_rsrc_config?.db_name || "Default",
      input_schema:
        tool.original?.tool_rsrc_config?.input_schema || "Default",
    }))

    const formattedResources = {}

    selectedTools.forEach(tool => {
      formattedResources[tool.name] = {
        semantic_model_file:
          tool.original?.tool_rsrc_config?.semantic_model_file,
        db_name:
          tool.original?.tool_rsrc_config?.db_name || "Default",
        input_schema:
          tool.original?.tool_rsrc_config?.input_schema || "Default",
        execution_environment:
          tool.original?.tool_rsrc_config?.execution_environment || {},
      }
    })

    const toolData = {
      tool_choice: {
        type: "auto",
        name: [],
      },
      tools: formattedTools,
      tool_resources: formattedResources,
      orchestration_instructions: orchestrationInstruction,
    }

    onSaveAndContinue(toolData)

    setIsSaved(true)
  }

  const handleCreateAgent = async () => {
    if (!onCreateAgent) return
    await onCreateAgent()
  }
  return (
    <>
      <div className="mt-5">
        <ToolsSection
          tools={filteredTools}
          toggleTool={toggleTool}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="mt-7">
        <SectionHeader>Orchestration</SectionHeader>
        <OrchestrationSection
          value={orchestrationInstruction}
          onChange={setOrchestrationInstruction}
        />
      </div>

      <FooterButtons
        loading={isSaving}
        buttons={[
          { label: "Back", variant: "outline", onClick: onBack },
          { label: "Discard", variant: "outline", onClick: handleDiscard },

          !isSaved
            ? {
              label: "Save & Continue",
              variant: "primary",
              onClick: handleSaveAndContinue,
            }
            : {
              label: "Create Agent",
              variant: "primary",
              onClick: onCreateAgent,
            }]}
      />
    </>
  );
}
