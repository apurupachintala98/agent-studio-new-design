// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   PageLayout,
//   BackToDashboard,
//   Stepper,
//   LANGGRAPH_STEPS,
// } from "../components/SharedComponents";
// import AgentProfile from "../components/AgentProfile";
// import MemoryConfig from "../components/MemoryConfig";
// import Tools from "../components/Tools";
// import ApiUiConfig from "../components/ApiUiConfig";
// import Deployment from "../components/Deployment";
// import { fetchSpecificAgent } from "../services/agents";
// import { langgraphApi } from "../services/langgraph-api";

// export default function LangGraphAgent() {
//   const { agentId } = useParams();
//   const [activeStep, setActiveStep] = useState(1);
//   const [agentDetails, setAgentDetails] = useState(null);
//   const [defaultConfig, setDefaultConfig] = useState(null);

//   // Accumulated data from each step
//   const [stepOneData, setStepOneData] = useState(null);
//   const [stepTwoData, setStepTwoData] = useState(null);
//   const [stepThreeData, setStepThreeData] = useState(null);
//   const [stepFourData, setStepFourData] = useState(null);

//   // Fetch agent details + default config on mount
//   useEffect(() => {
//     const loadAgent = async () => {
//       try {
//         const response = await fetchSpecificAgent(agentId);
//         const record = response?.data?.record;
//         setAgentDetails(record);
//       } catch (error) {
//         console.error("Failed to fetch agent details:", error);
//       }
//     };

//     const loadDefaultConfig = async () => {
//       try {
//         const config = await langgraphApi.getDefaultConfig();
//         setDefaultConfig(config);
//       } catch (error) {
//         console.error("Failed to fetch default config:", error);
//       }
//     };

//     if (agentId) {
//       loadAgent();
//     }
//     loadDefaultConfig();
//   }, [agentId]);

//   // Step 1: Agent Profile → Save & Continue
//   const handleStepOneSave = (data) => {
//     setStepOneData(data);
//     setActiveStep(2);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Step 2: Memory Config → Save & Continue
//   const handleStepTwoSave = (data) => {
//     setStepTwoData(data);
//     setActiveStep(3);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Step 3: Tools → Save & Continue
//   const handleStepThreeSave = (data) => {
//     setStepThreeData(data);
//     setActiveStep(4);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Step 4: API & UI → Save & Continue
//   const handleStepFourSave = (data) => {
//     setStepFourData(data);
//   };

//   // Create Agent handler (called from ApiUiConfig after save)
//   const handleCreateAgent = async () => {
//     try {
//       const allData = { ...stepOneData, ...stepTwoData, ...stepThreeData, ...stepFourData };
//       console.log("[LangGraph] Creating agent with all data:", allData);

//       // Call langgraphApi.createAgent with accumulated data
//       const createPayload = {
//         agent_name: allData.agentName || agentDetails?.agnt_nm || "",
//         agent_description: allData.description || agentDetails?.agnt_desc || "",
//         agent_instructions: {
//           system: allData.systemInstructions || "",
//           orchestration: allData.orchestration_instructions || "",
//           response_structure: allData.responseInstructions || "",
//         },
//         llm_config: {
//           model_id: allData.selectedModel || "",
//           model_name: allData.selectedModel || "",
//           provider_name: allData.llmProviderName || allData.llmServiceProvider || "",
//           llm_auth: {
//             base_url: defaultConfig?.profile_config?.llm_config?.llm_auth?.base_url || "",
//             pat_token: defaultConfig?.profile_config?.llm_config?.llm_auth?.pat_token || "",
//           },
//           llm_model_config: {
//             temperature: defaultConfig?.profile_config?.llm_config?.llm_model_config?.temperature || 0.7,
//             max_tokens: defaultConfig?.profile_config?.llm_config?.llm_model_config?.max_tokens || 1000,
//           },
//         },
//       };

//       const result = await langgraphApi.createAgent(createPayload);
//       console.log("[LangGraph] Agent created:", result);

//       // Move to deployment step
//       setActiveStep(5);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (error) {
//       console.error("Failed to create agent:", error);
//     }
//   };

//   const goToPrevStep = () => {
//     setActiveStep((prev) => Math.max(prev - 1, 1));
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <PageLayout>
//       <BackToDashboard />
//       <Stepper activeStep={activeStep} steps={LANGGRAPH_STEPS} />

//       {activeStep === 1 && (
//         <AgentProfile
//           agentType="LangGraph"
//           agentDetails={agentDetails}
//           defaultConfig={defaultConfig}
//           onSaveAndContinue={handleStepOneSave}
//           onBack={goToPrevStep}
//         />
//       )}

//       {activeStep === 2 && (
//         <MemoryConfig
//           agentDetails={agentDetails}
//           defaultConfig={defaultConfig}
//           stepOneData={stepOneData}
//           onSaveAndContinue={handleStepTwoSave}
//           onBack={goToPrevStep}
//         />
//       )}

//       {activeStep === 3 && (
//         <Tools
//           agentType="LangGraph"
//           agentDetails={agentDetails}
//           defaultConfig={defaultConfig}
//           onSaveAndContinue={handleStepThreeSave}
//           onBack={goToPrevStep}
//         />
//       )}

//       {activeStep === 4 && (
//         <ApiUiConfig
//           agentDetails={agentDetails}
//           defaultConfig={defaultConfig}
//           stepOneData={{ ...stepOneData, ...stepTwoData, ...stepThreeData }}
//           onSaveAndContinue={handleStepFourSave}
//           onCreateAgent={handleCreateAgent}
//           onBack={goToPrevStep}
//         />
//       )}

//       {activeStep === 5 && <Deployment agentDetails={agentDetails} />}
//     </PageLayout>
//   );
// }

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
  LANGGRAPH_STEPS,
} from "../components/SharedComponents";
import AgentProfile from "../components/AgentProfile";
import MemoryConfig from "../components/MemoryConfig";
import Tools from "../components/Tools";
import ApiUiConfig from "../components/ApiUiConfig";
import Deployment from "../components/Deployment";
import { fetchSpecificAgent } from "../services/agents";
import { langgraphApi } from "../services/langgraph-api";

export default function LangGraphAgent() {
  const { agentId } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [agentDetails, setAgentDetails] = useState(null);
  const [defaultConfig, setDefaultConfig] = useState(null);

  // ---------------------------------------------------------------
  // Accumulated data from each step's Save and Continue
  //
  // stepOneData (AgentProfile):
  //   { agentName, description, selectedModel, systemInstructions,
  //     responseInstructions, llmServiceProvider, llmProviderName }
  //
  // stepTwoData (MemoryConfig):
  //   { ...stepOneData, memoryConfig: {
  //       short_term_memory_needed, long_term_memory_needed,
  //       long_term_memory_config: { semantic_user_profile,
  //         episodic_user_experience, procedural_user_instructions, custom }
  //   }}
  //
  // stepThreeData (Tools):
  //   { tool_choice, tools, tool_resources, orchestration_instructions,
  //     mcp_tools: [{ transport, name, description, config, file, fileName }] }
  //
  // stepFourData (ApiUiConfig):
  //   { backendConfig: { host, port }, frontendConfig: { port, branding },
  //     apiEnabled, uiEnabled }
  // ---------------------------------------------------------------
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [stepFourData, setStepFourData] = useState(null);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        const response = await fetchSpecificAgent(agentId);
        setAgentDetails(response?.data?.record);
      } catch (error) {
        console.error("Failed to fetch agent details:", error);
      }
    };
    const loadDefaultConfig = async () => {
      try {
        const config = await langgraphApi.getDefaultConfig();
        setDefaultConfig(config);
      } catch (error) {
        console.error("Failed to fetch default config:", error);
      }
    };
    if (agentId) loadAgent();
    loadDefaultConfig();
  }, [agentId]);

  const handleStepOneSave = (data) => {
    setStepOneData(data);
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepTwoSave = (data) => {
    setStepTwoData(data);
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepThreeSave = (data) => {
    setStepThreeData(data);
    setActiveStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepFourSave = (data) => {
    setStepFourData(data);
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =================================================================
  // Create Agent - calls all 6 APIs in sequence
  //
  // Data sources per field:
  //   stepOneData   -> agent name, description, model, instructions, provider
  //   stepTwoData   -> memory toggles (short/long term, semantic/episodic/procedural)
  //   stepThreeData -> mcp_tools, orchestration_instructions
  //   stepFourData  -> backend host/port, frontend port
  //   defaultConfig -> llm_auth, llm_model_config, memory DB connection
  //   localStorage  -> user_id, aplctn_cd
  //   URL params    -> agentId (agent_uuid)
  //   generated     -> sessionId (UUID)
  // =================================================================
  const handleCreateAgent = async () => {
    try {
      // --- localStorage values ---
      const userId = localStorage.getItem("user_id") || "";
      const appCode = localStorage.getItem("aplctn_cd") || "";
      const agentUuid = agentId || agentDetails?.agnt_id || "";
      const sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);

      // --- defaultConfig shortcuts ---
      const llmAuth = defaultConfig?.profile_config?.llm_config?.llm_auth || {};
      const llmModelCfg = defaultConfig?.profile_config?.llm_config?.llm_model_config || {};
      const memDbDefaults = defaultConfig?.memory_config || {};

      // --- Step data shortcuts ---
      const profile = stepOneData || {};
      const memConfig = stepTwoData?.memoryConfig || {};
      const toolsData = stepThreeData || {};
      const apiUiData = stepFourData || {};

      console.log("[LangGraph] Creating agent...");
      console.log("[LangGraph] Step 1 - Profile:", profile);
      console.log("[LangGraph] Step 2 - Memory:", memConfig);
      console.log("[LangGraph] Step 3 - Tools:", toolsData);
      console.log("[LangGraph] Step 4 - API/UI:", apiUiData);

      // ============================================================
      // API 1: POST /api/lsa/agent/create
      // ============================================================
      const createPayload = {
        agent: {
          agent_uuid: agentUuid,
          sesn_id: sessionId,
          user_id: userId,
          aplctn_cd: appCode,
          agent_name: profile.agentName || agentDetails?.agnt_nm || "",
          agent_description: profile.description || agentDetails?.agnt_desc || "",
          agent_instructions: {
            system: profile.systemInstructions || "",
            orchestration: toolsData.orchestration_instructions || "",
            response_structure: profile.responseInstructions || "",
          },
          llm_config: {
            model_id: profile.selectedModel || "",
            model_name: profile.selectedModel || "",
            provider_name: profile.llmProviderName || profile.llmServiceProvider || "",
            llm_auth: {
              base_url: "",
              pat_token: "",
            },
            llm_model_config: {
              temperature: llmModelCfg.temperature || 0.1,
              max_tokens: llmModelCfg.max_tokens || 1024,
            },
          },
        },
        oauth_details: {
          application_code: appCode,
          prefix: "testmcp",
        },
      };

      const createResult = await langgraphApi.createAgent(createPayload);
      console.log("[LangGraph] Agent created:", createResult);

      const memoryPayload = {
        short_term_memory_needed: memConfig.short_term_memory_needed ?? true,
        long_term_memory_needed: memConfig.long_term_memory_needed ?? false,
        long_term_memory_config: {
          semantic_user_profile: memConfig.long_term_memory_config?.semantic_user_profile ?? false,
          episodic_user_experience: memConfig.long_term_memory_config?.episodic_user_experience ?? false,
          procedural_user_instructions: memConfig.long_term_memory_config?.procedural_user_instructions ?? false,
          custom: memConfig.long_term_memory_config?.custom ?? false,
        },
        db_type: memDbDefaults.db_type || "postgres",
        db_host: memDbDefaults.db_host || "",
        db_port: memDbDefaults.db_port || 0,
        db_username: memDbDefaults.db_username || memDbDefaults.db_user || "",
        db_password: memDbDefaults.db_password || "",
        db_name: memDbDefaults.db_name || "",
        db_schema: memDbDefaults.db_schema || "",
      };

      const memoryResult = await langgraphApi.configureMemory(agentUuid, memoryPayload);
      console.log("[LangGraph] Memory saved:", memoryResult);

       const stdioTools = toolsData.stdio_mcp_tools || [];
      const normalTools = toolsData.normal_mcp_tools || [];

      let mcpToolsPayload = [];

      if (stdioTools.length > 0) {
        mcpToolsPayload = stdioTools.map((t) => ({
          transport: "stdio",
          name: t.name || "",
          description: t.description || "",
          config: {
            command: t.config?.command || "python",
            args: t.config?.args || "",
          },
        }));
      } else if (normalTools.length > 0) {
        mcpToolsPayload = normalTools.map((t) => ({
          transport: "streamable_http",
          name: t.name || "",
          description: t.description || "",
          config: {
            url: t.config?.url || "",
            config: t.config?.config || "",
          },
        }));
      }

      const toolPayload = {
        mcp_tools: mcpToolsPayload,
        orchestration_instructions: toolsData.orchestration_instructions || "",
      };

      console.log("[LangGraph] API 3 - POST /api/lsa/agent/" + agentUuid + "/tools", toolPayload);
      const toolResult = await langgraphApi.configureTools(agentUuid, toolPayload);
      console.log("[LangGraph] Tools saved:", toolResult);

        if (stdioTools.length > 0) {
        for (const tool of stdioTools) {
          if (tool.file) {
            try {
              console.log("[LangGraph] API 4 - Uploading file:", tool.fileName);
              await langgraphApi.uploadToolFile(agentUuid, tool.file);
              console.log("[LangGraph] File uploaded:", tool.fileName);
            } catch (err) {
              console.error("Failed to upload file for tool " + tool.name + ":", err);
            }
          }
        }
      }

      const backendPayload = {
        host: apiUiData.backendConfig?.host || "",
        port: Number.parseInt(apiUiData.backendConfig?.port) || 0,
      };

      const backendResult = await langgraphApi.configureBackend(agentUuid, backendPayload);
      console.log("[LangGraph] Backend configured:", backendResult);

      const frontendPayload = {
        port: Number.parseInt(apiUiData.frontendConfig?.port) || 0,
      };

      const frontendResult = await langgraphApi.configureFrontend(agentUuid, frontendPayload);
      console.log("[LangGraph] Frontend configured:", frontendResult);

      // All 6 APIs complete - move to deployment
      setActiveStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to create agent:", error);
    }
  };

  return (
    <PageLayout>
      <BackToDashboard />
      <Stepper activeStep={activeStep} steps={LANGGRAPH_STEPS} />

      {activeStep === 1 && (
        <AgentProfile
          agentType="LangGraph"
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          onSaveAndContinue={handleStepOneSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 2 && (
        <MemoryConfig
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          stepOneData={stepOneData}
          onSaveAndContinue={handleStepTwoSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 3 && (
        <Tools
          agentType="LangGraph"
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          onSaveAndContinue={handleStepThreeSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 4 && (
        <ApiUiConfig
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          stepOneData={{ ...stepOneData, ...stepTwoData, ...stepThreeData }}
          onSaveAndContinue={handleStepFourSave}
          onCreateAgent={handleCreateAgent}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 5 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}