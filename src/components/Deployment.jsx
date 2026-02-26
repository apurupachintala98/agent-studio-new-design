import { useState } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "../components/SharedComponents";

// --- Deployment-specific Icons ---
const CheckCircleGreen = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" fill="#0072C6" stroke="#0072C6" strokeWidth="2" />
    <path d="M8 14.5L12 18.5L20 10.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Deployment Progress Stepper ---
function DeploymentStepper() {
  return (
    <div
      className="rounded-lg bg-white px-8 py-6"
      style={{
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start">
        {/* Step 1 column */}
        <div className="flex flex-col items-center" style={{ width: 220, flexShrink: 0 }}>
          <div className="flex items-center w-full">
            <div style={{ flex: 1 }} />
            <CheckCircleGreen />
            <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2" }} />
          </div>
          <span className="font-semibold text-center mt-2" style={{ fontSize: 14, color: "#003366" }}>
            Batch Configuration Submitted
          </span>
          <span className="text-xs mt-1" style={{ color: "#90A4AE" }}>Completed at 2:34 PM</span>
          <span
            className="mt-2 px-4 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: "#2E8540", fontSize: 11, letterSpacing: "0.5px" }}
          >
            DONE
          </span>
        </div>

        {/* Line between 1 and 2 */}
        <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2", marginTop: 13 }} />

        {/* Step 2 column */}
        <div className="flex flex-col items-center" style={{ width: 260, flexShrink: 0 }}>
          <div className="flex items-center w-full">
            <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2" }} />
            <div
              className="flex items-center justify-center rounded-full font-semibold"
              style={{
                width: 28, height: 28,
                backgroundColor: "#0072C6", color: "#FFFFFF",
                fontSize: 13, flexShrink: 0,
              }}
            >
              2
            </div>
            <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2" }} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold" style={{ fontSize: 14, color: "#0072C6" }}>Deploying to Snowflake & EKS</span>
            <span className="font-semibold" style={{ fontSize: 14, color: "#003366" }}>100%</span>
          </div>
          <div className="w-full mt-2 rounded-full overflow-hidden" style={{ height: 8, backgroundColor: "#E0E0E0", maxWidth: 220 }}>
            <div className="h-full rounded-full" style={{ width: "100%", backgroundColor: "#0072C6" }} />
          </div>
          <span className="text-xs mt-2" style={{ color: "#90A4AE" }}>Pushing code to Git repository...</span>
        </div>

        {/* Line between 2 and 3 */}
        <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2", marginTop: 13 }} />

        {/* Step 3 column */}
        <div className="flex flex-col items-center" style={{ width: 180, flexShrink: 0 }}>
          <div className="flex items-center w-full">
            <div style={{ flex: 1, height: 2, backgroundColor: "#B3D9F2" }} />
            <div
              className="flex items-center justify-center rounded-full font-semibold"
              style={{
                width: 28, height: 28,
                backgroundColor: "transparent",
                border: "2px solid #B0BEC5", color: "#B0BEC5",
                fontSize: 13, flexShrink: 0,
              }}
            >
              3
            </div>
            <div style={{ flex: 1 }} />
          </div>
          <span className="font-medium text-center mt-2" style={{ fontSize: 14, color: "#78909C" }}>Agent Testing</span>
          <span className="text-xs mt-1" style={{ color: "#B0BEC5" }}>Waiting for Deployment...</span>
        </div>
      </div>
    </div>
  );
}

// --- Deployment Logs ---
function DeploymentLogs() {
  const logs = [
    "[14:34:32] INFO VERIFYING BUILD ENVIRONMENT CONFIGURATION ...",
    "[14:34:41] INFO LOADING DEPENDENCY GRAPH MODULES ...",
    "[14:34:55] INFO RESOLVING PACKAGE VERSIONS FROM MANIFEST ...",
    "[14:35:02] INFO ESTABLISHING SECURE CONNECTION TO ARTIFACTS REPOSITORY ...",
    "[14:35:18] INFO FETCHING LATEST RUNTIME EXTENSIONS ...",
    "[14:35:25] INFO VALIDATING CONTAINER INTEGRITY CHECKS ...",
    "[14:35:33] INFO INITIALIZING ORCHESTRATOR HANDSHAKE PROTOCOL ...",
    "[14:35:46] INFO GENERATING OPTIMIZED EXECUTION PLAN ...",
    "[14:35:59] INFO PREPARING DEPLOYMENT BUNDLE FOR STAGING ...",
    "[14:36:10] INFO RUNNING STATIC ANALYSIS ON COMPILED COMPONENTS ...",
    "[14:36:21] INFO REGISTERING ENVIRONMENT VARIABLES FOR RUNTIME CONTEXT ...",
    "[14:36:33] INFO PERFORMING FINAL CONSISTENCY VALIDATION ...",
    "[14:36:49] INFO SIGNING BUILD ARTIFACTS WITH SECURE KEY ...",
    "[14:36:55] INFO UPLOADING BUILD OUTPUTS TO RELEASE CHANNEL ...",
    "[14:37:04] INFO BUILD SEQUENCE COMPLETED SUCCESSFULLY.",
  ];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#F5F7FA", borderBottom: "1px solid #E0E0E0" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="rounded-full" style={{ width: 12, height: 12, backgroundColor: "#FF5F57" }} />
            <div className="rounded-full" style={{ width: 12, height: 12, backgroundColor: "#FFBD2E" }} />
            <div className="rounded-full" style={{ width: 12, height: 12, backgroundColor: "#28C840" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#546E7A", letterSpacing: "1.5px", textTransform: "uppercase" }}>
            DEPLOYMENT LOGS
          </span>
        </div>
        <a href="#" style={{ fontSize: 11, fontWeight: 600, color: "#0072C6", letterSpacing: "1px", textDecoration: "none", textTransform: "uppercase" }}>
          VIEW FULL LOGS
        </a>
      </div>
      <div className="px-5 py-4 overflow-auto" style={{ maxHeight: 340 }}>
        <pre style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: 12.5, lineHeight: 1.7, color: "#455A64",
          margin: 0, whiteSpace: "pre-wrap",
        }}>
          {logs.join("\n")}
        </pre>
      </div>
    </div>
  );
}

// --- Source Artifacts Card ---
function SourceArtifacts({ agentId, agentApi, setErrorNotification }){
const [isDownloading, setIsDownloading] = useState(false);

const handleDownloadCode = async () => {
  if (!agentId) {
    setErrorNotification("No agent ID found. Please save your profile first.");
    return;
  }

  setIsDownloading(true);

  try {
    const blob = await agentApi.downloadAgent(agentId);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `agent-${agentId}.zip`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Failed to download agent:", error);
    setErrorNotification("Failed to download agent code. Please try again.");
  } finally {
    setIsDownloading(false);
  }
};

return (
  <div
    className="rounded-lg bg-white flex flex-col"
    style={{
      border: "1px solid #E0E0E0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      height: "100%", minHeight: 380,
    }}
  >
    <div className="w-full flex justify-end px-5 pt-4">
      <a href="https://bitbucket.org/your-workspace/ncr_aedleks_agentbuilder_app"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: 11, fontWeight: 600, color: "#0072C6", letterSpacing: "1px", textDecoration: "none", textTransform: "uppercase" }}>
        URL LINK
      </a>

    </div>
    <div onClick={handleDownloadCode} className="flex-1 flex flex-col items-center justify-center px-5 pb-6">
      {/* Folder icon - inline SVG fallback */}
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: 80,
          height: 80,
          backgroundColor: "#0D1B2A",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M6 12C6 10.9 6.9 10 8 10H16L19 13H32C33.1 13 34 13.9 34 15V30C34 31.1 33.1 32 32 32H8C6.9 32 6 31.1 6 30V12Z" fill="#29B6F6" />
          <rect x="16" y="18" width="3" height="10" rx="1" fill="#0D1B2A" opacity="0.5" />
          <rect x="21" y="16" width="3" height="12" rx="1" fill="#0D1B2A" opacity="0.4" />
        </svg>
      </div>
      <span className="font-semibold mt-3" style={{ fontSize: 15, color: "#1A1A1A" }}>Source Artifacts</span>
      <span className="text-sm mt-1" style={{ color: "#78909C" }}>agent_cortex_v1.zip</span>
      <span className="text-xs mt-0.5" style={{ color: "#90A4AE" }}>(24MB)</span>
    </div>
  </div>
);
}

// --- Main Deployment Page ---
export default function Deployment({ onFinish }) {
  const [isFinishing, setIsFinishing] = useState(false);

  const handleDiscard = () => {
    console.log("Discard clicked");
  };

  const handleFinishDeployment = async () => {
    setIsFinishing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onFinish) onFinish();
    } catch (error) {
      console.error("Finish failed:", error);
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <>
      <div className="mt-6">
        <SectionHeader>Deployment Progress</SectionHeader>
        <DeploymentStepper />
      </div>

      <div className="mt-6 flex gap-5" style={{ alignItems: "stretch" }}>
        <div style={{ flex: "1.6" }}>
          <DeploymentLogs />
        </div>
        <div style={{ flex: "1" }}>
          <SourceArtifacts
            agentId={createdAgent?.id}
            agentApi={agentApi}
            setErrorNotification={setErrorNotification}
          />
        </div>
      </div>

      <FooterButtons
        loading={isFinishing}
        buttons={[
          { label: "Discard", variant: "outline", onClick: handleDiscard },
          { label: "Chat with Agent", variant: "disabled-outline", disabled: true },
          { label: "Finish Deployment", variant: "primary", onClick: handleFinishDeployment },
        ]}
      />
    </>
  );
}
