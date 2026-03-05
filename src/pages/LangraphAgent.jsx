
// import { useState, useEffect, useRef } from "react";
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
//   const [stepOneData, setStepOneData] = useState(null);
//   const [stepTwoData, setStepTwoData] = useState(null);
//   const [stepThreeData, setStepThreeData] = useState(null);
//   const [stepFourData, setStepFourData] = useState(null);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     if (hasFetched.current) return;
//     hasFetched.current = true;
//     const loadAgent = async () => {
//       try {
//         const response = await fetchSpecificAgent(agentId);
//         setAgentDetails(response?.data?.record);
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
//     if (agentId) loadAgent();
//     loadDefaultConfig();
//   }, [agentId]);

//   const handleStepOneSave = (data) => {
//     setStepOneData(data);
//     setActiveStep(2);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleStepTwoSave = (data) => {
//     setStepTwoData(data);
//     setActiveStep(3);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleStepThreeSave = (data) => {
//     setStepThreeData(data);
//     setActiveStep(4);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleStepFourSave = (data) => {
//     setStepFourData(data);
//   };

//   const goToPrevStep = () => {
//     setActiveStep((prev) => Math.max(prev - 1, 1));
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleCreateAgent = async () => {
//     try {
//       // --- localStorage values ---
//       const userId = localStorage.getItem("user_id") || "";
//       const appCode = localStorage.getItem("aplctn_cd") || "";
//       const agentUuid = agentId || agentDetails?.agnt_id || "";
//       const sessionId = crypto.randomUUID();
//       localStorage.setItem("session_id", sessionId);

//       // --- defaultConfig shortcuts ---
//       const llmAuth = defaultConfig?.profile_config?.llm_config?.llm_auth || {};
//       const llmModelCfg = defaultConfig?.profile_config?.llm_config?.llm_model_config || {};
//       const memDbDefaults = defaultConfig?.memory_config || {};

//       // --- Step data shortcuts ---
//       const profile = stepOneData || {};
//       const memConfig = stepTwoData?.memoryConfig || {};
//       const toolsData = stepThreeData || {};
//       const apiUiData = stepFourData || {};

//       const createPayload = {
//         agent: {
//           agent_uuid: agentUuid,
//           sesn_id: sessionId,
//           user_id: userId,
//           aplctn_cd: appCode,
//           agent_name: profile.agentName || agentDetails?.agnt_nm || "",
//           agent_description: profile.description || agentDetails?.agnt_desc || "",
//           agent_instructions: {
//             system: profile.systemInstructions || "",
//             orchestration: toolsData.orchestration_instructions || "",
//             response_structure: profile.responseInstructions || "",
//           },
//           llm_config: {
//             model_id: profile.selectedModel || "",
//             model_name: profile.selectedModel || "",
//             provider_name: profile.llmProviderName || profile.llmServiceProvider || "",
//             llm_auth: {
//               base_url: "",
//               pat_token: "",
//             },
//             llm_model_config: {
//               temperature: llmModelCfg.temperature || 0.1,
//               max_tokens: llmModelCfg.max_tokens || 1024,
//             },
//           },
//         },
//         oauth_details: {
//           application_code: appCode,
//           prefix: "testmcp",
//         },
//       };

//       const createResult = await langgraphApi.createAgent(createPayload);

//       const memoryPayload = {
//         short_term_memory_needed: memConfig.short_term_memory_needed ?? true,
//         long_term_memory_needed: memConfig.long_term_memory_needed ?? false,
//         long_term_memory_config: {
//           semantic_user_profile: memConfig.long_term_memory_config?.semantic_user_profile ?? false,
//           episodic_user_experience: memConfig.long_term_memory_config?.episodic_user_experience ?? false,
//           procedural_user_instructions: memConfig.long_term_memory_config?.procedural_user_instructions ?? false,
//           custom: memConfig.long_term_memory_config?.custom ?? false,
//         },
//         db_type: memDbDefaults.db_type || "postgres",
//         db_host: memDbDefaults.db_host || "",
//         db_port: memDbDefaults.db_port || 0,
//         db_username: memDbDefaults.db_username || memDbDefaults.db_user || "",
//         db_password: memDbDefaults.db_password || "",
//         db_name: memDbDefaults.db_name || "",
//         db_schema: memDbDefaults.db_schema || "",
//       };

//       const memoryResult = await langgraphApi.configureMemory(agentUuid, memoryPayload);

//       //  const stdioTools = toolsData.stdio_mcp_tools || [];
//       // const normalTools = toolsData.normal_mcp_tools || [];

//       // let mcpToolsPayload = [];

//       // if (stdioTools.length > 0) {
//       //   mcpToolsPayload = stdioTools.map((t) => ({
//       //     transport: "stdio",
//       //     name: t.name || "",
//       //     description: t.description || "",
//       //     config: {
//       //       command: t.config?.command || "python",
//       //       args: t.config?.args || "",
//       //     },
//       //   }));
//       // } else if (normalTools.length > 0) {
//       //   mcpToolsPayload = normalTools.map((t) => ({
//       //     transport: "streamable_http",
//       //     name: t.name || "",
//       //     description: t.description || "",
//       //     config: {
//       //       url: t.config?.url || "",
//       //       config: t.config?.config || "",
//       //     },
//       //   }));
//       // }

//       // const toolPayload = {
//       //   mcp_tools: mcpToolsPayload,
//       //   orchestration_instructions: toolsData.orchestration_instructions || "",
//       // };

//       // const toolResult = await langgraphApi.configureTools(agentUuid, toolPayload);

//       //   if (stdioTools.length > 0) {
//       //   for (const tool of stdioTools) {
//       //     if (tool.file) {
//       //       try {
//       //         await langgraphApi.uploadToolFile(agentUuid, tool.file);
//       //       } catch (err) {
//       //         console.error("Failed to upload file for tool " + tool.name + ":", err);
//       //       }
//       //     }
//       //   }
//       // }

//        const stdioTools = toolsData.stdio_mcp_tools || [];
//       const normalTools = toolsData.normal_mcp_tools || [];

//       const normalMcpPayload = normalTools.map((t) => ({
//         transport: "streamable_http",
//         name: t.name || "",
//         description: t.description || "",
//         config: {
//           url: t.config?.url || "",
//           config: t.config?.config || "",
//         },
//       }));

//       const stdioMcpPayload = stdioTools.map((t) => ({
//         transport: "stdio",
//         name: t.name || "",
//         description: t.description || "",
//         config: {
//           command: t.config?.command || "python",
//           args: t.config?.args || "",
//         },
//       }));

//       const toolPayload = {
//         mcp_tools: [...normalMcpPayload, ...stdioMcpPayload],
//         orchestration_instructions: toolsData.orchestration_instructions || "",
//       };

//       const toolResult = await langgraphApi.configureTools(agentUuid, toolPayload);
//       console.log("[LangGraph] Tools saved:", toolResult);

//       const backendPayload = {
//         host: apiUiData.backendConfig?.host || "",
//         port: Number.parseInt(apiUiData.backendConfig?.port) || 0,
//       };

//       const backendResult = await langgraphApi.configureBackend(agentUuid, backendPayload);

//       const frontendPayload = {
//         port: Number.parseInt(apiUiData.frontendConfig?.port) || 0,
//       };

//       const frontendResult = await langgraphApi.configureFrontend(agentUuid, frontendPayload);

//       // All 6 APIs complete - move to deployment
//       setActiveStep(5);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } catch (error) {
//       console.error("Failed to create agent:", error);
//     }
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


import { useState, useEffect, useRef } from "react";
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

  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [stepFourData, setStepFourData] = useState(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

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

      const stdioTools = toolsData.stdio_mcp_tools || [];
      const normalTools = toolsData.normal_mcp_tools || [];

      const normalMcpPayload = normalTools.map((t) => ({
        transport: "streamable_http",
        name: t.name || "",
        description: t.description || "",
        config: {
          url: t.config?.url || "",
          config: t.config?.config || "",
        },
      }));

      const stdioMcpPayload = stdioTools.map((t) => ({
        transport: "stdio",
        name: t.name || "",
        description: t.description || "",
        config: {
          command: t.config?.command || "python",
          args: t.config?.args || "",
        },
      }));

      const toolPayload = {
        mcp_tools: [...normalMcpPayload, ...stdioMcpPayload],
        orchestration_instructions: toolsData.orchestration_instructions || "",
      };

      const toolResult = await langgraphApi.configureTools(agentUuid, toolPayload);
      console.log("[LangGraph] Tools saved:", toolResult);


      if (stdioTools.length > 0) {
        for (const tool of stdioTools) {
          if (tool.file) {
            try {
              await langgraphApi.uploadToolFile(agentUuid, tool.file);
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

      const frontendPayload = {
        port: Number.parseInt(apiUiData.frontendConfig?.port) || 0,
      };

      const frontendResult = await langgraphApi.configureFrontend(agentUuid, frontendPayload);

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
          savedData={stepOneData}
          onSaveAndContinue={handleStepOneSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 2 && (
        <MemoryConfig
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          stepOneData={stepOneData}
          savedData={stepTwoData}
          onSaveAndContinue={handleStepTwoSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 3 && (
        <Tools
          agentType="LangGraph"
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          savedData={stepThreeData}
          onSaveAndContinue={handleStepThreeSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 4 && (
        <ApiUiConfig
          agentDetails={agentDetails}
          defaultConfig={defaultConfig}
          stepOneData={{ ...stepOneData, ...stepTwoData, ...stepThreeData }}
          savedData={stepFourData}
          onSaveAndContinue={handleStepFourSave}
          onCreateAgent={handleCreateAgent}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 5 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}