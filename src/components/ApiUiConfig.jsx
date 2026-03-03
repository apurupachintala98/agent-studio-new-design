// import { useState, useEffect } from "react";
// import {
//   FooterButtons,
// } from "../components/SharedComponents";
// import { useNavigate } from "react-router-dom";

// // --- Toggle Switch (matches screenshot - pill shape, blue when on) ---
// function ToggleSwitch({ checked, onChange }) {
//   return (
//     <button
//       type="button"
//       onClick={() => onChange(!checked)}
//       className="relative inline-flex items-center rounded-full transition-colors"
//       style={{
//         width: 44,
//         height: 24,
//         backgroundColor: checked ? "#0072C6" : "#CFD8DC",
//         flexShrink: 0,
//         border: "none",
//         cursor: "pointer",
//       }}
//     >
//       <span
//         className="inline-block rounded-full bg-white transition-transform"
//         style={{
//           width: 18,
//           height: 18,
//           transform: checked ? "translateX(22px)" : "translateX(3px)",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
//         }}
//       />
//     </button>
//   );
// }

// // --- Underline Input (matches screenshot - no border, just bottom line) ---
// function UnderlineInput({ label, value, onChange, placeholder = "" }) {
//   return (
//     <div className="py-3">
//       <div className="flex items-center">
//         <label
//           className="flex-shrink-0 pr-3"
//           style={{
//             fontSize: 13,
//             color: "#B0BEC5",
//             minWidth: 120,
//           }}
//         >
//           {label}
//         </label>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder={placeholder}
//           className="flex-1 py-1.5"
//           style={{
//             fontSize: 13,
//             color: "#37474F",
//             border: "none",
//             borderBottom: "1px solid #E0E0E0",
//             outline: "none",
//             backgroundColor: "transparent",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// // --- Main Component ---
// export default function ApiUiConfig({
//   agentDetails,
//   defaultConfig,
//   stepOneData,
//   onSaveAndContinue,
//   onCreateAgent,
//   onBack,
// }) {
//   const [isSaving, setIsSaving] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);
//   const navigate = useNavigate();

//   // Initialize from defaultConfig
//   const backendDefaults = defaultConfig?.backend_config;
//   const frontendDefaults = defaultConfig?.frontend_config;

//   // API Connectivity
//   const [apiEnabled, setApiEnabled] = useState(true);
//   const [backendHostname, setBackendHostname] = useState("");
//   const [apiPort, setApiPort] = useState("");

//   // UI Interface
//   const [uiEnabled, setUiEnabled] = useState(true);
//   const [uiPort, setUiPort] = useState("");
//   const [branding, setBranding] = useState("");

//   // Sync defaults when defaultConfig loads
//   useEffect(() => {
//     if (backendDefaults) {
//       setBackendHostname(backendDefaults.host || "");
//       setApiPort(String(backendDefaults.port || ""));
//     }
//     if (frontendDefaults) {
//       setUiPort(String(frontendDefaults.port || ""));
//     }
//   }, [backendDefaults, frontendDefaults]);

//   const handleDiscard = () => {
//     navigate("/dashboard");
//   };

//   const handleSaveDraft = () => {
//     console.log("Save as Draft clicked");
//   };

//   const handleSaveAndContinue = async () => {
//     setIsSaving(true);
//     try {
//       const payload = {
//         ...stepOneData,
//         backendConfig: {
//           host: backendHostname,
//           port: Number(apiPort),
//         },
//         frontendConfig: {
//           port: Number(uiPort),
//           branding,
//         },
//         apiEnabled,
//         uiEnabled,
//       };

//       onSaveAndContinue(payload);
//       setIsSaved(true);
//     } catch (error) {
//       console.error("Save failed:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCreateAgent = async () => {
//     if (onCreateAgent) await onCreateAgent();
//   };

//   // Footer buttons: toggle between Save & Continue and Create Agent
//   const getFooterButtons = () => {
//     const buttons = [
//       { label: "Discard", variant: "outline", onClick: handleDiscard },
//       { label: "Save as Draft", variant: "outline", onClick: handleSaveDraft },
//     ];
//     if (!isSaved) {
//       buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
//     } else {
//       buttons.push({ label: "Create Agent", variant: "primary", onClick: handleCreateAgent });
//     }
//     return buttons;
//   };

//   return (
//     <>
//       {/* Two cards side by side */}
//       <div className="mt-6 flex gap-5">
//         {/* API Connectivity Card */}
//         <div
//           className="flex-1 rounded-lg"
//           style={{
//             backgroundColor: "#FFFFFF",
//             border: "1px solid #E0E0E0",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//           }}
//         >
//           {/* Header with toggle */}
//           <div
//             className="flex items-center justify-between px-5"
//             style={{
//               paddingTop: 18,
//               paddingBottom: 14,
//               borderBottom: "1px solid #F0F0F0",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 15,
//                 fontWeight: 500,
//                 color: "#546E7A",
//               }}
//             >
//               API Connectivity
//             </span>
//             <ToggleSwitch checked={apiEnabled} onChange={setApiEnabled} />
//           </div>

//           {/* Fields */}
//           <div
//             className="px-5 pb-5"
//             style={{
//               opacity: apiEnabled ? 1 : 0.4,
//               pointerEvents: apiEnabled ? "auto" : "none",
//             }}
//           >
//             <UnderlineInput
//               label="Backend Hostname"
//               value={backendHostname}
//               onChange={setBackendHostname}
//               placeholder=""
//             />
//             <UnderlineInput
//               label="API Port"
//               value={apiPort}
//               onChange={setApiPort}
//               placeholder=""
//             />
//           </div>
//         </div>

//         {/* UI Interface Card */}
//         <div
//           className="flex-1 rounded-lg"
//           style={{
//             backgroundColor: "#FFFFFF",
//             border: "1px solid #E0E0E0",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//           }}
//         >
//           {/* Header with toggle */}
//           <div
//             className="flex items-center justify-between px-5"
//             style={{
//               paddingTop: 18,
//               paddingBottom: 14,
//               borderBottom: "1px solid #F0F0F0",
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 15,
//                 fontWeight: 500,
//                 color: "#546E7A",
//               }}
//             >
//               UI Interface
//             </span>
//             <ToggleSwitch checked={uiEnabled} onChange={setUiEnabled} />
//           </div>

//           {/* Fields */}
//           <div
//             className="px-5 pb-5"
//             style={{
//               opacity: uiEnabled ? 1 : 0.4,
//               pointerEvents: uiEnabled ? "auto" : "none",
//             }}
//           >
//             <UnderlineInput
//               label="Port"
//               value={uiPort}
//               onChange={setUiPort}
//               placeholder=""
//             />
//             <UnderlineInput
//               label="Branding"
//               value={branding}
//               onChange={setBranding}
//               placeholder=""
//             />
//           </div>
//         </div>
//       </div>

//       {/* Interface Preview Panel */}
//       <div
//         className="mt-5 rounded-lg overflow-hidden"
//         style={{
//           backgroundColor: "#F5F7F8",
//           border: "1px solid #E0E0E0",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//           minHeight: 300,
//         }}
//       >
//         {/* Mac-style title bar */}
//         <div
//           className="flex items-center gap-2 px-4"
//           style={{
//             height: 36,
//             backgroundColor: "#ECEFF1",
//             borderBottom: "1px solid #E0E0E0",
//           }}
//         >
//           {/* Traffic light dots */}
//           <div
//             className="rounded-full"
//             style={{ width: 10, height: 10, backgroundColor: "#EC6A5E" }}
//           />
//           <div
//             className="rounded-full"
//             style={{ width: 10, height: 10, backgroundColor: "#F4BF4F" }}
//           />
//           <div
//             className="rounded-full"
//             style={{ width: 10, height: 10, backgroundColor: "#61C554" }}
//           />
//           <span
//             className="ml-2"
//             style={{
//               fontSize: 11,
//               color: "#90A4AE",
//               fontFamily: "monospace",
//               letterSpacing: 1.5,
//               fontWeight: 500,
//             }}
//           >
//             INTERFACE PREVIEW
//           </span>
//         </div>

//         {/* Preview content area */}
//         <div
//           className="flex items-center justify-center"
//           style={{
//             minHeight: 264,
//             padding: 24,
//           }}
//         >
//           <p style={{ fontSize: 13, color: "#B0BEC5" }}>
//             Preview will appear here once the UI interface is configured and deployed. Coming soon!!
//           </p>
//         </div>
//       </div>

//       <FooterButtons loading={isSaving} buttons={getFooterButtons()} />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import {
  FooterButtons,
} from "../components/SharedComponents";
import { useNavigate } from "react-router-dom";

// --- Toggle Switch (matches screenshot - pill shape, blue when on) ---
function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center rounded-full transition-colors"
      style={{
        width: 44,
        height: 24,
        backgroundColor: checked ? "#0072C6" : "#CFD8DC",
        flexShrink: 0,
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        className="inline-block rounded-full bg-white transition-transform"
        style={{
          width: 18,
          height: 18,
          transform: checked ? "translateX(22px)" : "translateX(3px)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

// --- Form Input (matches agent builder design - label on top, full-width field) ---
function FormInput({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="mb-4">
      <label
        className="block mb-1.5"
        style={{ fontSize: 13, color: "#546E7A", fontWeight: 500 }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm rounded-sm"
        style={{
          color: "#37474F",
          backgroundColor: "#F5F7F8",
          border: "1px solid #ECEFF1",
          outline: "none",
        }}
      />
    </div>
  );
}

// --- Main Component ---
export default function ApiUiConfig({
  agentDetails,
  defaultConfig,
  stepOneData,
  onSaveAndContinue,
  onCreateAgent,
  onBack,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // Initialize from defaultConfig
  const backendDefaults = defaultConfig?.backend_config;
  const frontendDefaults = defaultConfig?.frontend_config;

  // API Connectivity
  const [apiEnabled, setApiEnabled] = useState(false);
  const [backendHostname, setBackendHostname] = useState("");
  const [apiPort, setApiPort] = useState("");

  // UI Interface
  const [uiEnabled, setUiEnabled] = useState(false);
  const [uiPort, setUiPort] = useState("");
  const [branding, setBranding] = useState("");

  // Sync defaults when defaultConfig loads
  useEffect(() => {
    if (backendDefaults) {
      setBackendHostname(backendDefaults.host || "");
      setApiPort(String(backendDefaults.port || ""));
    }
    if (frontendDefaults) {
      setUiPort(String(frontendDefaults.port || ""));
    }
  }, [backendDefaults, frontendDefaults]);

  const handleDiscard = () => {
    navigate("/dashboard");
  };

  const handleSaveDraft = () => {
    console.log("Save as Draft clicked");
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...stepOneData,
        backendConfig: {
          host: backendHostname,
          port: Number(apiPort),
        },
        frontendConfig: {
          port: Number(uiPort),
          branding,
        },
        apiEnabled,
        uiEnabled,
      };

      onSaveAndContinue(payload);
      setIsSaved(true);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAgent = async () => {
    if (onCreateAgent) await onCreateAgent();
  };

  // Footer buttons: toggle between Save & Continue and Create Agent
  const getFooterButtons = () => {
    const buttons = [
      { label: "Discard", variant: "outline", onClick: handleDiscard },
      { label: "Save as Draft", variant: "outline", onClick: handleSaveDraft },
    ];
    if (!isSaved) {
      buttons.push({ label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue });
    } else {
      buttons.push({ label: "Create Agent", variant: "primary", onClick: handleCreateAgent });
    }
    return buttons;
  };

  return (
    <>
      {/* Two cards side by side */}
      <div className="mt-6 flex gap-5">
        {/* API Connectivity Card */}
        <div
          className="flex-1 rounded-lg"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header with toggle */}
          <div
            className="flex items-center justify-between px-5"
            style={{
              paddingTop: 18,
              paddingBottom: 14,
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#546E7A",
              }}
            >
              API Connectivity
            </span>
            <ToggleSwitch checked={apiEnabled} onChange={setApiEnabled} />
          </div>

          {/* Fields */}
          <div
            className="px-5 pb-5 pt-3"
            style={{
              opacity: apiEnabled ? 1 : 0.4,
              pointerEvents: apiEnabled ? "auto" : "none",
            }}
          >
            <FormInput
              label="Backend Hostname"
              value={backendHostname}
              onChange={setBackendHostname}
              placeholder="Enter backend hostname"
            />
            <FormInput
              label="API Port"
              value={apiPort}
              onChange={setApiPort}
              placeholder="Enter API port"
            />
          </div>
        </div>

        {/* UI Interface Card */}
        <div
          className="flex-1 rounded-lg"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E0E0E0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header with toggle */}
          <div
            className="flex items-center justify-between px-5"
            style={{
              paddingTop: 18,
              paddingBottom: 14,
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#546E7A",
              }}
            >
              UI Interface
            </span>
            <ToggleSwitch checked={uiEnabled} onChange={setUiEnabled} />
          </div>

          {/* Fields */}
          <div
            className="px-5 pb-5 pt-3"
            style={{
              opacity: uiEnabled ? 1 : 0.4,
              pointerEvents: uiEnabled ? "auto" : "none",
            }}
          >
            <FormInput
              label="Port"
              value={uiPort}
              onChange={setUiPort}
              placeholder="Enter port"
            />
            <FormInput
              label="Branding"
              value={branding}
              onChange={setBranding}
              placeholder="Enter branding"
            />
          </div>
        </div>
      </div>

      {/* Interface Preview Panel */}
      <div
        className="mt-5 rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#F5F7F8",
          border: "1px solid #E0E0E0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          minHeight: 300,
        }}
      >
        {/* Mac-style title bar */}
        <div
          className="flex items-center gap-2 px-4"
          style={{
            height: 36,
            backgroundColor: "#ECEFF1",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          {/* Traffic light dots */}
          <div
            className="rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#EC6A5E" }}
          />
          <div
            className="rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#F4BF4F" }}
          />
          <div
            className="rounded-full"
            style={{ width: 10, height: 10, backgroundColor: "#61C554" }}
          />
          <span
            className="ml-2"
            style={{
              fontSize: 11,
              color: "#90A4AE",
              fontFamily: "monospace",
              letterSpacing: 1.5,
              fontWeight: 500,
            }}
          >
            INTERFACE PREVIEW
          </span>
        </div>

        {/* Preview content area */}
        <div
          className="flex items-center justify-center"
          style={{
            minHeight: 264,
            padding: 24,
          }}
        >
          <p style={{ fontSize: 13, color: "#B0BEC5" }}>
            Preview will appear here once the UI interface is configured and deployed.
          </p>
        </div>
      </div>

      <FooterButtons loading={isSaving} buttons={getFooterButtons()} />
    </>
  );
}