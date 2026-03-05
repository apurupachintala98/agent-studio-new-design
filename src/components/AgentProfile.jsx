import { useState, useEffect, useRef } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "../components/SharedComponents";
import { agentApi } from "../services/api";
import { langgraphApi } from "../services/langgraph-api";
import { useNavigate } from "react-router-dom";

// --- Icon Components ---
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#0072C6" strokeWidth="1.5" fill="none" />
    <text x="10" y="14.5" textAnchor="middle" fill="#0072C6" fontSize="12" fontWeight="600" fontFamily="sans-serif">i</text>
  </svg>
);

const CheckCircle = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#2E8540" />
    <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10.5 1.5L12.5 3.5L4 12H2V10L10.5 1.5Z" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Banner Config per agent type ---
const BANNER_CONFIG = {
  Cortex: {
    title: "Configuration Note",
    description:
      "The Agent Name and Description are locked by the workspace administrator to maintain organizational standards. System Instructions can be tuned for specific behavior.",
  },
  LangGraph: {
    title: "Expert Tip",
    description:
      "System instructions define the boundaries of your agent's autonomy. For LangGraph agents, try to keep instructions focused on the high-level goal, as the graph logic in the next steps will handle the specific execution flow.",
  },
};

// --- Bottom link text per agent type ---
const BOTTOM_LINK_CONFIG = {
  Cortex: "View More",
  LangGraph: "Advance Model Configuration",
};

// --- Agent Profile Card ---
function AgentProfileCard({
  agentType,
  agentName,
  agentDescription,
  agentDetails,
  selectedModel,
  setSelectedModel,
  systemInstruction,
  setSystemInstruction,
  responseInstruction,
  setResponseInstruction,
  llmServiceProvider,
  setLlmServiceProvider,
}) {
  const [models, setModels] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const banner = BANNER_CONFIG[agentType] || BANNER_CONFIG.Cortex;
  const bottomLink = BOTTOM_LINK_CONFIG[agentType] || BOTTOM_LINK_CONFIG.Cortex;
  const isLangGraph = agentType === "LangGraph";

  // Refs to prevent duplicate API calls on re-renders
  const cortexFetched = useRef(false);
  const providersFetched = useRef(false);
  const lastFetchedProvider = useRef("");

  // Cortex: fetch LLMs directly on mount (once)
  useEffect(() => {
    if (isLangGraph) return;
    if (cortexFetched.current) return;
    cortexFetched.current = true;

    const fetchCortexLLMs = async () => {
      try {
        const data = await agentApi.getLLMs();
        setModels(data);
        // Only auto-select first model if no model is already selected
        if (data.length > 0 && !selectedModel) {
          setSelectedModel(data[0].model_id);
        }
      } catch (error) {
        console.error("Failed to load Cortex LLM models:", error);
      }
    };
    fetchCortexLLMs();
  }, [isLangGraph]);

  // LangGraph: fetch providers on mount (once)
  useEffect(() => {
    if (!isLangGraph) return;
    if (providersFetched.current) return;
    providersFetched.current = true;

    const fetchProviders = async () => {
      try {
        const data = await langgraphApi.getProviders();
        setProviders(data);
        // Only auto-select first provider if none is already selected
        if (data.length > 0 && !llmServiceProvider) {
          setLlmServiceProvider(data[0].provider_id);
        }
      } catch (error) {
        console.error("Failed to load providers:", error);
      }
    };
    fetchProviders();
  }, [isLangGraph]);

  // LangGraph: fetch LLMs when provider changes (skip if same provider)
  useEffect(() => {
    if (!isLangGraph || !llmServiceProvider) return;
    if (lastFetchedProvider.current === llmServiceProvider) return;
    lastFetchedProvider.current = llmServiceProvider;

    const fetchProviderLLMs = async () => {
      setLoadingModels(true);
      setModels([]);
      try {
        const data = await langgraphApi.getLLMs(llmServiceProvider);
        setModels(data);
        // Only auto-select first model if no model is already selected
        if (data.length > 0 && !selectedModel) {
          setSelectedModel(data[0].model_id);
        }
      } catch (error) {
        console.error("Failed to load LLMs for provider:", error);
      } finally {
        setLoadingModels(false);
      }
    };
    fetchProviderLLMs();
  }, [isLangGraph, llmServiceProvider]);

  return (
    <div
      className="rounded-lg bg-white overflow-hidden"
      style={{
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Banner flush to top of card */}
      <div
        className="flex items-start gap-3 px-5 py-3.5"
        style={{
          backgroundColor: "#EBF5FB",
          borderBottom: "1px solid #B3D9F2",
        }}
      >
        <div className="mt-0.5 flex-shrink-0">
          <InfoIcon />
        </div>
        <div className="text-sm leading-relaxed">
          <span className="font-semibold" style={{ color: "#003366" }}>
            {banner.title}
          </span>
          <br />
          <span style={{ color: "#455A64" }}>
            {banner.description}
          </span>
        </div>
      </div>

      {/* Avatar section */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-start gap-5">
          <div className="relative flex-shrink-0">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #C4983A 0%, #9E822F 60%, #6B5A20 100%)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <rect x="12" y="18" width="22" height="20" rx="3" fill="#FFF8DC" stroke="#B8860B" strokeWidth="1.5" />
                  <path d="M34 24H38C40 24 41 26 41 28C41 30 40 32 38 32H34" fill="none" stroke="#B8860B" strokeWidth="1.5" />
                  <ellipse cx="23" cy="18" rx="11" ry="2" fill="#8B4513" opacity="0.6" />
                  <path d="M18 14C18 12 20 10 20 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M23 12C23 10 25 8 25 8" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M28 14C28 12 30 10 30 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                </svg>
              </div>
            </div>
            <div
              className="absolute flex items-center justify-center rounded-full bg-white"
              style={{
                width: 24, height: 24, bottom: -4, right: -4,
                border: "1px solid #CFD8DC",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <PencilIcon />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base" style={{ color: "#1A1A1A" }}>Agent Avatar</h3>
            <p className="text-sm mt-0.5" style={{ color: "#78909C" }}>
              Upload a custom image or generate one using DALL·E 3.
            </p>
            <button
              className="mt-3 px-5 py-2 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: "#0072C6" }}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex gap-6">
          {/* Agent Name - always shown */}
          <div style={{ flex: isLangGraph ? 1 : 1 }}>
            <div className="flex items-center">
              <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Name</label>
              <input
                type="text" value={agentName} disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-sm"
                style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>

          {/* LLM Service Provider - LangGraph only */}
          {isLangGraph && (
            <div style={{ flex: 1 }}>
              <div className="flex items-center">
                <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#37474F", fontWeight: 600 }}>LLM Service Provider</label>
                <div className="relative flex-1">
                  <select
                    value={llmServiceProvider}
                    onChange={(e) => setLlmServiceProvider(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm appearance-none rounded-sm pr-8"
                    style={{ color: "#37474F", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none" }}
                  >
                    {providers.length === 0 ? (
                      <option>Loading providers...</option>
                    ) : (
                      providers.map((provider) => (
                        <option key={provider.provider_id} value={provider.provider_id}>
                          {provider.provider_name}
                        </option>
                      ))
                    )}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></div>
                </div>
              </div>
            </div>
          )}

          {/* Model Selection - always shown */}
          <div style={{ flex: 1 }}>
            <div className="flex items-center">
              <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#37474F", fontWeight: 600 }}>Model Selection</label>
              <div className="relative flex-1">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={isLangGraph && loadingModels}
                  className="w-full px-3 py-2.5 text-sm appearance-none rounded-sm pr-8"
                  style={{
                    color: (isLangGraph && loadingModels) ? "#A0AEB5" : "#37474F",
                    backgroundColor: "#F5F7F8",
                    border: "1px solid #ECEFF1",
                    outline: "none",
                    cursor: (isLangGraph && loadingModels) ? "not-allowed" : "pointer",
                  }}
                >
                  {loadingModels ? (
                    <option>Loading models...</option>
                  ) : models.length === 0 ? (
                    <option>{isLangGraph ? "Select a provider first" : "Loading models..."}</option>
                  ) : (
                    models.map((model) => (
                      <option key={model.model_id} value={model.model_id}>
                        {model.model_name}
                      </option>
                    ))
                  )}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Description</label>
          <input
            type="text" value={agentDescription} disabled
            className="flex-1 px-3 py-2.5 text-sm rounded-sm"
            style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
          />
        </div>

        <div className="mt-6 flex items-start">
          <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#37474F", fontWeight: 500 }}>System Instruction</label>
          <textarea
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            className="flex-1 rounded-sm p-3 text-sm resize-none" rows={6}
            style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
          />
        </div>

        {/* Response Instruction - shown for both Cortex and LangGraph */}
        <div className="mt-6 flex items-start">
          <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#37474F", fontWeight: 500 }}>Response Instruction</label>
          <textarea
            value={responseInstruction}
            onChange={(e) => setResponseInstruction(e.target.value)}
            className="flex-1 rounded-sm p-3 text-sm resize-none" rows={6}
            style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
          />
        </div>
      </div>

      {/* Bottom link */}
      <div className="flex justify-end px-5 py-4">
        <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>
          {bottomLink}
        </a>
      </div>
    </div>
  );
}

// --- Application Configuration Card (Cortex only) ---
function AppConfigCard({ database, schema }) {
  return (
    <div
      className="rounded-lg bg-white overflow-hidden"
      style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div
        className="flex items-start gap-3 px-5 py-3.5"
        style={{ backgroundColor: "#EBF5FB", borderBottom: "1px solid #B3D9F2" }}
      >
        <div className="mt-0.5 flex-shrink-0"><InfoIcon /></div>
        <div className="text-sm leading-relaxed" style={{ color: "#455A64" }}>
          These settings were configured during agent registration and cannot be modified.{" "}
          <a href="#" style={{ color: "#0072C6", textDecoration: "none", fontWeight: 500 }}>Contact admin</a> to update
        </div>
      </div>

      <div className="px-5 pt-5 pb-2">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Snowflake Database</label>
              <input type="text" value={database} disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-md"
                style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Database Schema</label>
              <input type="text" value={schema} disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-md"
                style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle />
          <span className="text-sm font-semibold" style={{ color: "#00695C" }}>Connected to Snowflake</span>
        </div>
        <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>View Connection Detail</a>
      </div>
    </div>
  );
}

// --- Resources Card (Cortex only) ---
function ResourcesCard({ toolChoice, setToolChoice }) {
  return (
    <div
      className="rounded-lg bg-white"
      style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="px-5 py-5">
        <div className="mb-4">
          <label className="text-xs font-medium block mb-2.5" style={{ color: "#546E7A" }}>Tool Choice Strategy</label>
          <div className="flex">
            <button
              className="px-6 py-2 text-sm font-medium rounded-l-md"
              style={{
                backgroundColor: toolChoice === "auto" ? "#0072C6" : "#FFFFFF",
                color: toolChoice === "auto" ? "#FFFFFF" : "#546E7A",
                border: `1px solid ${toolChoice === "auto" ? "#0072C6" : "#CFD8DC"}`,
              }}
              onClick={() => setToolChoice("auto")}
            >Auto</button>
            <button
              className="px-6 py-2 text-sm font-medium rounded-r-md"
              style={{
                backgroundColor: toolChoice === "required" ? "#0072C6" : "#FFFFFF",
                color: toolChoice === "required" ? "#FFFFFF" : "#546E7A",
                border: `1px solid ${toolChoice === "required" ? "#0072C6" : "#CFD8DC"}`,
                borderLeft: "none",
              }}
              onClick={() => setToolChoice("required")}
            >Required</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
// agentType: "Cortex" | "LangGraph"
export default function AgentProfile({
  agentType = "Cortex",
  agentDetails,
  defaultConfig,
  savedData,
  onSaveAndContinue,
  onBack,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const isCortex = agentType === "Cortex";
  const isLangGraph = agentType === "LangGraph";

  // Prefilled values (from backend)
  const agentName = agentDetails?.agnt_nm || "";
  const agentDescription = agentDetails?.agnt_desc || "";
  const database = agentDetails?.db_nm || "";
  const schema = agentDetails?.schma_nm || "";

  // Use defaultConfig for LangGraph instruction defaults only
  const profileDefaults = isLangGraph ? defaultConfig?.profile_config : null;

  // User-entered values — restore from savedData if available
  const [selectedModel, setSelectedModel] = useState(savedData?.selectedModel || "");
  const [systemInstruction, setSystemInstruction] = useState(savedData?.systemInstructions || "");
  const [responseInstruction, setResponseInstruction] = useState(savedData?.responseInstructions || "");
  const [toolChoice, setToolChoice] = useState(savedData?.toolChoice || "auto");
  const [llmServiceProvider, setLlmServiceProvider] = useState(savedData?.llmServiceProvider || "");

  // Sync defaults when defaultConfig loads (async)
  useEffect(() => {
    if (!profileDefaults) return;
    const instructions = profileDefaults.agent_instructions;
    if (instructions?.system && !systemInstruction) {
      setSystemInstruction(instructions.system);
    }
    if (instructions?.response_structure && !responseInstruction) {
      setResponseInstruction(instructions.response_structure);
    }
  }, [profileDefaults]);

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
        agentName,
        description: agentDescription,
        selectedModel,
        systemInstructions: systemInstruction,
        responseInstructions: responseInstruction,
        ...(isCortex && {
          db: database,
          schema,
          applicationName: agentDetails?.aplctn_cd,
          toolChoice,
        }),
        ...(isLangGraph && {
          llmServiceProvider,
          llmProviderName: agentDetails?._providerName || llmServiceProvider,
        }),
      };

      console.log(`[${agentType}] Forwarding Data:`, payload);
      onSaveAndContinue(payload);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="mt-5">
        <SectionHeader>Agent Profile</SectionHeader>
        <AgentProfileCard
          agentType={agentType}
          agentDetails={agentDetails}
          agentName={agentName}
          agentDescription={agentDescription}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          systemInstruction={systemInstruction}
          setSystemInstruction={setSystemInstruction}
          responseInstruction={responseInstruction}
          setResponseInstruction={setResponseInstruction}
          llmServiceProvider={llmServiceProvider}
          setLlmServiceProvider={setLlmServiceProvider}
        />
      </div>

      {/* Application Configuration - Cortex only */}
      {isCortex && (
        <div className="mt-7">
          <SectionHeader>Application Configuration</SectionHeader>
          <AppConfigCard database={database} schema={schema} />
        </div>
      )}

      {/* Resources - Cortex only */}
      {isCortex && (
        <div className="mt-7">
          <SectionHeader>Resources</SectionHeader>
          <ResourcesCard toolChoice={toolChoice} setToolChoice={setToolChoice} />
        </div>
      )}

     <FooterButtons
        loading={isSaving}
        buttons={[
          ...(onBack ? [{ label: "Back", variant: "outline", onClick: onBack }] : []),
          { label: "Discard", variant: "outline", onClick: handleDiscard },
          { label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue },
        ]}
      />
    </>
  );
}