// import { useState, useEffect,useRef } from "react";
// import {
//   SectionHeader,
//   FooterButtons,
// } from "../components/SharedComponents";
// import { fetchToolsByScopes } from "../services/agents";
// import { useNavigate } from "react-router-dom";

// // --- Tool Card Icons ---
// const MonitorIcon = ({ selected }) => (
//   <div
//     className="flex items-center justify-center rounded-lg"
//     style={{ width: 36, height: 36, backgroundColor: selected ? "#EBF5FB" : "#F0F0F0" }}
//   >
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//       <rect x="2" y="3" width="16" height="11" rx="1.5" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" fill="none" />
//       <path d="M7 17H13" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
//       <path d="M10 14V17" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   </div>
// );

// const EnvelopeIcon = () => (
//   <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, backgroundColor: "#F0F0F0" }}>
//     <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//       <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="#90A4AE" strokeWidth="1.5" fill="none" />
//       <path d="M2 6L10 11L18 6" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   </div>
// );

// const CheckFilled = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="11" fill="#0072C6" />
//     <path d="M7 12.5L10 15.5L17 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const CircleOutline = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//     <circle cx="12" cy="12" r="11" stroke="#B0BEC5" strokeWidth="1.5" fill="none" />
//   </svg>
// );

// const UploadIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
//     <path d="M10 3V13M10 3L6 7M10 3L14 7" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M3 14V16C3 16.55 3.45 17 4 17H16C16.55 17 17 16.55 17 16V14" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//     <path d="M2 4H14M5 4V3C5 2.45 5.45 2 6 2H10C10.55 2 11 2.45 11 3V4M6.5 7V12M9.5 7V12M3.5 4L4.5 14C4.5 14.55 4.95 15 5.5 15H10.5C11.05 15 11.5 14.55 11.5 14L12.5 4" stroke="#D32F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // --- Tool Card ---
// function ToolCard({ name, description, selected, type = "monitor", onToggle }) {
//   return (
//     <div
//       className="rounded-xl p-4 cursor-pointer transition-all"
//       style={{
//         backgroundColor: "#FFFFFF",
//         border: selected ? "2px solid #0072C6" : "1px solid #E0E0E0",
//         boxShadow: selected ? "0 0 0 1px #0072C6" : "0 1px 3px rgba(0,0,0,0.04)",
//         minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between",
//       }}
//       onClick={onToggle}
//     >
//       <div className="flex items-start justify-between">
//         {type === "monitor" ? <MonitorIcon selected={selected} /> : <EnvelopeIcon />}
//         {selected ? <CheckFilled /> : <CircleOutline />}
//       </div>
//       <div className="mt-4">
//         <p className="font-semibold" style={{ fontSize: 13, color: selected ? "#1A1A1A" : "#546E7A", lineHeight: 1.3, wordBreak: "break-word" }}>{name}</p>
//         <p className="mt-0.5" style={{ fontSize: 12, color: "#90A4AE", lineHeight: 1.3 }}>{description}</p>
//       </div>
//     </div>
//   );
// }

// // --- Tools Grid Section ---
// function ToolsSection({ tools, toggleTool, searchTerm, setSearchTerm }) {
//   const filteredTools = tools.filter(
//     (tool) =>
//       tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       tool.description?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <SectionHeader>Tools</SectionHeader>
//         <div className="flex items-center gap-3" style={{ flex: 1, maxWidth: 500, marginLeft: 24 }}>
//           <span className="text-sm flex-shrink-0" style={{ color: "#78909C", fontWeight: 400, fontSize: 15, letterSpacing: 0.2 }}>Search</span>
//           <input
//             type="text"
//             placeholder="Search tools..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="text-sm"
//             style={{ flex: 1, width: 220, height: 36, backgroundColor: "#EDEEEE", border: "none", borderRadius: 8, padding: "0 12px", color: "#5b6770", outline: "none" }}
//           />
//         </div>
//       </div>
//       <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
//         {filteredTools.map((tool) => (
//           <ToolCard key={tool.id} name={tool.name} description={tool.description} selected={tool.selected} type={tool.type} onToggle={() => toggleTool(tool.id)} />
//         ))}
//         {filteredTools.length === 0 && (
//           <div className="col-span-4 text-center text-gray-400 py-6">No tools found</div>
//         )}
//       </div>
//     </div>
//   );
// }

// // --- Orchestration Section ---
// function OrchestrationSection({ value, onChange }) {
//   return (
//     <div className="rounded-lg bg-white" style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
//       <div className="px-5 py-5">
//         <div className="flex items-start">
//           <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#546E7A", fontWeight: 400 }}>Orchestration Instruction</label>
//           <textarea
//             className="flex-1 rounded-sm p-3 text-sm resize-none" rows={5}
//             value={value} onChange={(e) => onChange(e.target.value)}
//             style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- STDIO Custom Tool Form (LangGraph only) ---
// function StdioToolForm({ onAddTool, agentUuid }) {
//   const [toolName, setToolName] = useState("");
//   const [toolDescription, setToolDescription] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);

//   const inputStyle = { color: "#37474F", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none" };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setSelectedFile(file);
//   };

//   const handleAdd = async () => {
//     if (!toolName.trim()) return;
//     setIsAdding(true);
//     try {
//       onAddTool({
//         transport: "stdio",
//         name: toolName.trim(),
//         description: toolDescription.trim(),
//         config: { command: "python", args: selectedFile?.name || "" },
//         fileName: selectedFile?.name || null,
//         file: selectedFile || null,
//       });
//       setToolName("");
//       setToolDescription("");
//       setSelectedFile(null);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   return (
//     <div className="mt-4 pt-4" style={{ borderTop: "1px solid #ECEFF1" }}>
//       {/* Tool Name */}
//       <div className="mb-4">
//         <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Tool Name</label>
//         <input
//           type="text" value={toolName} onChange={(e) => setToolName(e.target.value)}
//           placeholder="Enter tool name"
//           className="w-full px-3 py-2.5 text-sm rounded-sm" style={inputStyle}
//         />
//       </div>

//       {/* Description */}
//       <div className="mb-4">
//         <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Description</label>
//         <textarea
//           value={toolDescription} onChange={(e) => setToolDescription(e.target.value)}
//           placeholder="Describe what this tool does"
//           className="w-full px-3 py-2.5 text-sm rounded-sm resize-none" rows={3} style={inputStyle}
//         />
//       </div>

//       {/* File Upload */}
//       <div className="mb-5">
//         <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Upload .py File</label>
//         <div className="flex items-center gap-3 px-3 py-2.5 rounded-sm" style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1" }}>
//           <label
//             className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
//             style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent", flexShrink: 0 }}
//           >
//             <UploadIcon />
//             Choose File
//             <input type="file" accept=".py" onChange={handleFileChange} style={{ display: "none" }} />
//           </label>
//           <span className="text-sm truncate" style={{ color: selectedFile ? "#37474F" : "#90A4AE" }}>
//             {selectedFile ? selectedFile.name : "No file selected"}
//           </span>
//         </div>
//       </div>

//       {/* Add Tool Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleAdd}
//           disabled={!toolName.trim() || isAdding}
//           className="px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2"
//           style={{
//             color: !toolName.trim() ? "#B0BEC5" : "#FFFFFF",
//             backgroundColor: !toolName.trim() ? "#ECEFF1" : "#0072C6",
//             border: "none",
//             cursor: !toolName.trim() ? "not-allowed" : "pointer",
//           }}
//         >
//           {isAdding ? "Adding..." : "+ Add Tool"}
//         </button>
//       </div>
//     </div>
//   );
// }

// // --- Added STDIO Tools List ---
// function StdioToolsList({ stdioTools, onRemove }) {
//   if (stdioTools.length === 0) return null;
//   return (
//     <div className="mt-4 pt-4" style={{ borderTop: "1px solid #ECEFF1" }}>
//       <p className="text-xs font-semibold mb-2" style={{ color: "#546E7A" }}>Added Custom Tools ({stdioTools.length})</p>
//       <div className="flex flex-col gap-2">
//         {stdioTools.map((tool, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between px-4 py-3 rounded-lg"
//             style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1" }}
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, backgroundColor: "#EBF5FB" }}>
//                 <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//                   <path d="M2 3H14M2 8H10M2 13H7" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" />
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{tool.name}</p>
//                 <p className="text-xs" style={{ color: "#90A4AE" }}>
//                   {tool.description || "No description"}{tool.fileName && <span> · {tool.fileName}</span>}
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={() => onRemove(i)}
//               className="flex items-center justify-center rounded-full"
//               style={{ width: 28, height: 28, backgroundColor: "#FFF5F5", border: "none", cursor: "pointer" }}
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // --- Main Page ---
// export default function Tools({
//   agentType = "Cortex",
//   agentDetails,
//   onSaveAndContinue,
//   onCreateAgent,
//   onBack,
// }) {
//   const navigate = useNavigate();
//   const isLangGraph = agentType === "LangGraph";

//   const [tools, setTools] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [orchestrationInstruction, setOrchestrationInstruction] = useState("");
//   const [isSaving, setIsSaving] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);

//   // LangGraph STDIO
//   const [showStdioForm, setShowStdioForm] = useState(false);
//   const [stdioTools, setStdioTools] = useState([]);
//   const toolsFetched = useRef(false);

//   useEffect(() => {
//     if (!agentDetails) return;
//     if (!agentDetails.agnt_access_scope) return;
//      if (toolsFetched.current) return;
//     toolsFetched.current = true;
//     try {
//       const parsedScope = JSON.parse(agentDetails.agnt_access_scope);
//       const scopesArray = parsedScope?.scopes || [];
//       if (scopesArray.length) loadTools(scopesArray);
//     } catch (error) {
//       console.error("Error parsing scope:", error);
//     }
//   }, [agentDetails]);

//   const loadTools = async (scopesArray) => {
//     try {
//       setLoading(true);
//       const response = await fetchToolsByScopes(scopesArray);
//       const groupedTools = response?.data?.grouped_tools;
//       if (!groupedTools || groupedTools.length === 0) { setTools([]); return; }
//       const formatted = groupedTools.flatMap((group) =>
//         group.tools.map((tool) => ({
//           id: tool.tool_id, name: tool.tool_nm, description: tool.tool_desc,
//           selected: false, type: "monitor", original: tool,
//         }))
//       );
//       setTools(formatted);
//     } catch (error) {
//       console.error("Failed to fetch tools:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleTool = (id) => {
//     setTools((prev) => prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t)));
//   };

//   const handleDiscard = () => { navigate("/dashboard"); };

//   const handleAddStdioTool = (tool) => {
//     setStdioTools((prev) => [...prev, tool]);
//     setShowStdioForm(false);
//   };

//   const handleRemoveStdioTool = (index) => {
//     setStdioTools((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSaveAndContinue = () => {
//     const selectedTools = tools.filter((t) => t.selected);

//     const formattedTools = selectedTools.map((tool) => ({
//       type: tool.original?.tool_id || "monitor",
//       name: tool.name, description: tool.description,
//       db_name: tool.original?.tool_rsrc_config?.db_name || "Default",
//       input_schema: tool.original?.tool_rsrc_config?.input_schema || "Default",
//     }));

//     const formattedResources = {};
//     selectedTools.forEach((tool) => {
//       formattedResources[tool.name] = {
//         semantic_model_file: tool.original?.tool_rsrc_config?.semantic_model_file,
//         db_name: tool.original?.tool_rsrc_config?.db_name || "Default",
//         input_schema: tool.original?.tool_rsrc_config?.input_schema || "Default",
//         execution_environment: tool.original?.tool_rsrc_config?.execution_environment || {},
//       };
//     });

//     const toolData = {
//       tool_choice: { type: "auto", name: [] },
//       tools: formattedTools,
//       tool_resources: formattedResources,
//       orchestration_instructions: orchestrationInstruction,
//       ...(isLangGraph && {
//         // Normal tools (from scopes) -> streamable_http transport
//         normal_mcp_tools: selectedTools.map((tool) => ({
//           transport: "streamable_http",
//           name: tool.name,
//           description: tool.description,
//           config: {
//             url: tool.original?.tool_rsrc_config?.url || "",
//             config: tool.original?.tool_rsrc_config?.config || "",
//           },
//         })),
//         // STDIO tools (manually added) -> stdio transport
//         stdio_mcp_tools: stdioTools.map((t) => ({
//           transport: "stdio",
//           name: t.name,
//           description: t.description,
//           config: {
//             command: t.config?.command || "python",
//             args: t.config?.args || "",
//           },
//           file: t.file || null,
//           fileName: t.fileName || null,
//         })),
//       }),
//     };

//     if (isLangGraph) {
//       // LangGraph: go to next step (API & UI) — no Create Agent here
//       onSaveAndContinue(toolData);
//     } else {
//       // Cortex: save then show Create Agent button
//       onSaveAndContinue(toolData);
//       setIsSaved(true);
//     }
//   };

//   const handleCreateAgent = async () => {
//     if (!onCreateAgent) return;
//     await onCreateAgent();
//   };

//   // Footer buttons differ by agentType
//   const getFooterButtons = () => {
//     const buttons = [];
//     if (onBack) buttons.push({ label: "Back", variant: "outline", onClick: onBack });
//     buttons.push({ label: "Discard", variant: "outline", onClick: handleDiscard });

//     if (isLangGraph) {
//       // LangGraph: always Save & Continue (moves to API & UI)
//       buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
//     } else {
//       // Cortex: toggle between Save & Continue → Create Agent
//       if (!isSaved) {
//         buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
//       } else {
//         buttons.push({ label: "Create Agent", variant: "primary", onClick: handleCreateAgent });
//       }
//     }
//     return buttons;
//   };

//   return (
//     <>
//       <div className="mt-5">
//         <ToolsSection
//           tools={tools.filter(
//             (t) =>
//               t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               t.description?.toLowerCase().includes(searchTerm.toLowerCase())
//           )}
//           toggleTool={toggleTool}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//         />
//       </div>

//       {/* LangGraph: STDIO Custom Tools Section */}
//       {isLangGraph && (
//         <div className="mt-7">
//           <SectionHeader>Custom Tools (STDIO)</SectionHeader>
//           <div
//             className="rounded-lg bg-white p-5"
//             style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
//           >
//             {/* Transport radio */}
//             <div className="flex items-center gap-6">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio" name="transport"
//                   checked={showStdioForm}
//                   onChange={() => setShowStdioForm(true)}
//                   style={{ accentColor: "#0072C6", width: 16, height: 16 }}
//                 />
//                 <span className="text-sm font-medium" style={{ color: "#37474F" }}>STDIO</span>
//               </label>
//               <span className="text-xs" style={{ color: "#90A4AE" }}>
//                 Add custom tools using the STDIO transport protocol
//               </span>
//             </div>

//             {/* STDIO Form - shown when radio selected */}
//             {showStdioForm && (
//               <StdioToolForm onAddTool={handleAddStdioTool} agentUuid={agentDetails?.agnt_id} />
//             )}

//             {/* List of added STDIO tools */}
//             <StdioToolsList stdioTools={stdioTools} onRemove={handleRemoveStdioTool} />
//           </div>
//         </div>
//       )}

//       <div className="mt-7">
//         <SectionHeader>Orchestration</SectionHeader>
//         <OrchestrationSection value={orchestrationInstruction} onChange={setOrchestrationInstruction} />
//       </div>

//       <FooterButtons loading={isSaving} buttons={getFooterButtons()} />
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "../components/SharedComponents";
import { fetchToolsByScopes } from "../services/agents";
import { langgraphApi } from "../services/langgraph-api";
import { useNavigate } from "react-router-dom";

// --- Tool Card Icons ---
const MonitorIcon = ({ selected }) => (
  <div
    className="flex items-center justify-center rounded-lg"
    style={{ width: 36, height: 36, backgroundColor: selected ? "#EBF5FB" : "#F0F0F0" }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="11" rx="1.5" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" fill="none" />
      <path d="M7 17H13" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14V17" stroke={selected ? "#0072C6" : "#90A4AE"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

const EnvelopeIcon = () => (
  <div className="flex items-center justify-center rounded-lg" style={{ width: 36, height: 36, backgroundColor: "#F0F0F0" }}>
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

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M10 3V13M10 3L6 7M10 3L14 7" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 14V16C3 16.55 3.45 17 4 17H16C16.55 17 17 16.55 17 16V14" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M5 4V3C5 2.45 5.45 2 6 2H10C10.55 2 11 2.45 11 3V4M6.5 7V12M9.5 7V12M3.5 4L4.5 14C4.5 14.55 4.95 15 5.5 15H10.5C11.05 15 11.5 14.55 11.5 14L12.5 4" stroke="#D32F2F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
        minHeight: 120, display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between">
        {type === "monitor" ? <MonitorIcon selected={selected} /> : <EnvelopeIcon />}
        {selected ? <CheckFilled /> : <CircleOutline />}
      </div>
      <div className="mt-4">
        <p className="font-semibold" style={{ fontSize: 13, color: selected ? "#1A1A1A" : "#546E7A", lineHeight: 1.3, wordBreak: "break-word" }}>{name}</p>
        <p className="mt-0.5" style={{ fontSize: 12, color: "#90A4AE", lineHeight: 1.3 }}>{description}</p>
      </div>
    </div>
  );
}

// --- Tools Grid Section ---
function ToolsSection({ tools, toggleTool, searchTerm, setSearchTerm }) {
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <SectionHeader>Tools</SectionHeader>
        <div className="flex items-center gap-3" style={{ flex: 1, maxWidth: 500, marginLeft: 24 }}>
          <span className="text-sm flex-shrink-0" style={{ color: "#78909C", fontWeight: 400, fontSize: 15, letterSpacing: 0.2 }}>Search</span>
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
            style={{ flex: 1, width: 220, height: 36, backgroundColor: "#EDEEEE", border: "none", borderRadius: 8, padding: "0 12px", color: "#5b6770", outline: "none" }}
          />
        </div>
      </div>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {filteredTools.map((tool) => (
          <ToolCard key={tool.id} name={tool.name} description={tool.description} selected={tool.selected} type={tool.type} onToggle={() => toggleTool(tool.id)} />
        ))}
        {filteredTools.length === 0 && (
          <div className="col-span-4 text-center text-gray-400 py-6">No tools found</div>
        )}
      </div>
    </div>
  );
}

// --- Orchestration Section ---
function OrchestrationSection({ value, onChange }) {
  return (
    <div className="rounded-lg bg-white" style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <div className="px-5 py-5">
        <div className="flex items-start">
          <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#546E7A", fontWeight: 400 }}>Orchestration Instruction</label>
          <textarea
            className="flex-1 rounded-sm p-3 text-sm resize-none" rows={5}
            value={value} onChange={(e) => onChange(e.target.value)}
            style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
          />
        </div>
      </div>
    </div>
  );
}

// --- STDIO Custom Tool Form (LangGraph only) ---
function StdioToolForm({ onAddTool, agentUuid }) {
  const [toolName, setToolName] = useState("");
  const [toolDescription, setToolDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const inputStyle = { color: "#37474F", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none" };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleAdd = async () => {
    if (!toolName.trim()) return;
    setIsAdding(true);
    try {
      onAddTool({
        transport: "stdio",
        name: toolName.trim(),
        description: toolDescription.trim(),
        config: { command: "python", args: selectedFile?.name || "" },
        fileName: selectedFile?.name || null,
        file: selectedFile || null,
      });
      setToolName("");
      setToolDescription("");
      setSelectedFile(null);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-4 pt-4" style={{ borderTop: "1px solid #ECEFF1" }}>
      {/* Tool Name */}
      <div className="mb-4">
        <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Tool Name</label>
        <input
          type="text" value={toolName} onChange={(e) => setToolName(e.target.value)}
          placeholder="Enter tool name"
          className="w-full px-3 py-2.5 text-sm rounded-sm" style={inputStyle}
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Description</label>
        <textarea
          value={toolDescription} onChange={(e) => setToolDescription(e.target.value)}
          placeholder="Describe what this tool does"
          className="w-full px-3 py-2.5 text-sm rounded-sm resize-none" rows={3} style={inputStyle}
        />
      </div>

      {/* File Upload */}
      <div className="mb-5">
        <label className="text-xs font-medium block mb-1.5" style={{ color: "#546E7A" }}>Upload .py File</label>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-sm" style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1" }}>
          <label
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer"
            style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent", flexShrink: 0 }}
          >
            <UploadIcon />
            Choose File
            <input type="file" accept=".py" onChange={handleFileChange} style={{ display: "none" }} />
          </label>
          <span className="text-sm truncate" style={{ color: selectedFile ? "#37474F" : "#90A4AE" }}>
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
        </div>
      </div>

      {/* Add Tool Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAdd}
          disabled={!toolName.trim() || isAdding}
          className="px-5 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2"
          style={{
            color: !toolName.trim() ? "#B0BEC5" : "#FFFFFF",
            backgroundColor: !toolName.trim() ? "#ECEFF1" : "#0072C6",
            border: "none",
            cursor: !toolName.trim() ? "not-allowed" : "pointer",
          }}
        >
          {isAdding ? "Adding..." : "+ Add Tool"}
        </button>
      </div>
    </div>
  );
}

// --- Added STDIO Tools List ---
function StdioToolsList({ stdioTools, onRemove }) {
  if (stdioTools.length === 0) return null;
  return (
    <div className="mt-4 pt-4" style={{ borderTop: "1px solid #ECEFF1" }}>
      <p className="text-xs font-semibold mb-2" style={{ color: "#546E7A" }}>Added Custom Tools ({stdioTools.length})</p>
      <div className="flex flex-col gap-2">
        {stdioTools.map((tool, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 rounded-lg"
            style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, backgroundColor: "#EBF5FB" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3H14M2 8H10M2 13H7" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{tool.name}</p>
                <p className="text-xs" style={{ color: "#90A4AE" }}>
                  {tool.description || "No description"}{tool.fileName && <span> · {tool.fileName}</span>}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="flex items-center justify-center rounded-full"
              style={{ width: 28, height: 28, backgroundColor: "#FFF5F5", border: "none", cursor: "pointer" }}
            >
              <TrashIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page ---
export default function Tools({
  agentType = "Cortex",
  agentDetails,
  savedData,
  onSaveAndContinue,
  onCreateAgent,
  onBack,
}) {
  const navigate = useNavigate();
  const isLangGraph = agentType === "LangGraph";

  const [tools, setTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orchestrationInstruction, setOrchestrationInstruction] = useState(savedData?.orchestration_instructions || "");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // LangGraph STDIO — restore from savedData
  const [showStdioForm, setShowStdioForm] = useState(false);
  const [stdioTools, setStdioTools] = useState(savedData?.stdio_mcp_tools || []);

  const toolsFetched = useRef(false);

  useEffect(() => {
    if (!agentDetails) return;
    if (!agentDetails.agnt_access_scope) return;
    if (toolsFetched.current) return;
    toolsFetched.current = true;

    try {
      const parsedScope = JSON.parse(agentDetails.agnt_access_scope);
      const scopesArray = parsedScope?.scopes || [];
      if (scopesArray.length) loadTools(scopesArray);
    } catch (error) {
      console.error("Error parsing scope:", error);
    }
  }, [agentDetails]);

  const loadTools = async (scopesArray) => {
    try {
      setLoading(true);

      let formatted = [];
      const savedToolNames = (savedData?.tools || []).map((t) => t.name);

      if (isLangGraph) {
        // LangGraph: POST /api/common/mcp-servers/by-scopes
        const response = await langgraphApi.getMcpServersByScopes(scopesArray);
        const mcpServers = response?.mcp_servers || response?.data?.mcp_servers || response || [];

        if (!mcpServers || mcpServers.length === 0) { setTools([]); return; }

        formatted = mcpServers.map((server, index) => ({
          id: server.server_id || server.id || `mcp-${index}`,
          name: server.name || server.server_name || "",
          description: server.description || "",
          selected: savedToolNames.includes(server.name || server.server_name || ""),
          type: "monitor",
          original: server,
        }));
      } else {
        // Cortex: existing fetchToolsByScopes
        const response = await fetchToolsByScopes(scopesArray);
        const groupedTools = response?.data?.grouped_tools;
        if (!groupedTools || groupedTools.length === 0) { setTools([]); return; }

        formatted = groupedTools.flatMap((group) =>
          group.tools.map((tool) => ({
            id: tool.tool_id, name: tool.tool_nm, description: tool.tool_desc,
            selected: savedToolNames.includes(tool.tool_nm),
            type: "monitor", original: tool,
          }))
        );
      }

      setTools(formatted);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTool = (id) => {
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t)));
  };

  const handleDiscard = () => { navigate("/dashboard"); };

  const handleAddStdioTool = (tool) => {
    setStdioTools((prev) => [...prev, tool]);
    setShowStdioForm(false);
  };

  const handleRemoveStdioTool = (index) => {
    setStdioTools((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAndContinue = () => {
    const selectedTools = tools.filter((t) => t.selected);

    const formattedTools = selectedTools.map((tool) => ({
      type: tool.original?.tool_id || "monitor",
      name: tool.name, description: tool.description,
      db_name: tool.original?.tool_rsrc_config?.db_name || "Default",
      input_schema: tool.original?.tool_rsrc_config?.input_schema || "Default",
    }));

    const formattedResources = {};
    selectedTools.forEach((tool) => {
      formattedResources[tool.name] = {
        semantic_model_file: tool.original?.tool_rsrc_config?.semantic_model_file,
        db_name: tool.original?.tool_rsrc_config?.db_name || "Default",
        input_schema: tool.original?.tool_rsrc_config?.input_schema || "Default",
        execution_environment: tool.original?.tool_rsrc_config?.execution_environment || {},
      };
    });

    const toolData = {
      tool_choice: { type: "auto", name: [] },
      tools: formattedTools,
      tool_resources: formattedResources,
      orchestration_instructions: orchestrationInstruction,
      ...(isLangGraph && {
        // Normal tools (from scopes) -> streamable_http transport
        normal_mcp_tools: selectedTools.map((tool) => ({
          transport: "streamable_http",
          name: tool.name,
          description: tool.description,
          config: {
            url: tool.original?.tool_rsrc_config?.url || "",
            config: tool.original?.tool_rsrc_config?.config || "",
          },
        })),
        // STDIO tools (manually added) -> stdio transport
        stdio_mcp_tools: stdioTools.map((t) => ({
          transport: "stdio",
          name: t.name,
          description: t.description,
          config: {
            command: t.config?.command || "python",
            args: t.config?.args || "",
          },
          file: t.file || null,
          fileName: t.fileName || null,
        })),
      }),
    };

    if (isLangGraph) {
      // LangGraph: go to next step (API & UI) — no Create Agent here
      onSaveAndContinue(toolData);
    } else {
      // Cortex: save then show Create Agent button
      onSaveAndContinue(toolData);
      setIsSaved(true);
    }
  };

  const handleCreateAgent = async () => {
    if (!onCreateAgent) return;
    await onCreateAgent();
  };

  // Footer buttons differ by agentType
  const getFooterButtons = () => {
    const buttons = [];
    if (onBack) buttons.push({ label: "Back", variant: "outline", onClick: onBack });
    buttons.push({ label: "Discard", variant: "outline", onClick: handleDiscard });

    if (isLangGraph) {
      // LangGraph: always Save & Continue (moves to API & UI)
      buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
    } else {
      // Cortex: toggle between Save & Continue → Create Agent
      if (!isSaved) {
        buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
      } else {
        buttons.push({ label: "Create Agent", variant: "primary", onClick: handleCreateAgent });
      }
    }
    return buttons;
  };

  return (
    <>
      <div className="mt-5">
        <ToolsSection
          tools={tools.filter(
            (t) =>
              t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              t.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          toggleTool={toggleTool}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* LangGraph: STDIO Custom Tools Section */}
      {isLangGraph && (
        <div className="mt-7">
          <SectionHeader>Custom Tools (STDIO)</SectionHeader>
          <div
            className="rounded-lg bg-white p-5"
            style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            {/* Transport radio */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio" name="transport"
                  checked={showStdioForm}
                  onChange={() => setShowStdioForm(true)}
                  style={{ accentColor: "#0072C6", width: 16, height: 16 }}
                />
                <span className="text-sm font-medium" style={{ color: "#37474F" }}>STDIO</span>
              </label>
              <span className="text-xs" style={{ color: "#90A4AE" }}>
                Add custom tools using the STDIO transport protocol
              </span>
            </div>

            {/* STDIO Form - shown when radio selected */}
            {showStdioForm && (
              <StdioToolForm onAddTool={handleAddStdioTool} agentUuid={agentDetails?.agnt_id} />
            )}

            {/* List of added STDIO tools */}
            <StdioToolsList stdioTools={stdioTools} onRemove={handleRemoveStdioTool} />
          </div>
        </div>
      )}

      <div className="mt-7">
        <SectionHeader>Orchestration</SectionHeader>
        <OrchestrationSection value={orchestrationInstruction} onChange={setOrchestrationInstruction} />
      </div>

      <FooterButtons loading={isSaving} buttons={getFooterButtons()} />
    </>
  );
}