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
//     setActiveStep(5);
//     window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Accumulated data from each step
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);
  const [stepThreeData, setStepThreeData] = useState(null);
  const [stepFourData, setStepFourData] = useState(null);

  // Fetch agent details + default config on mount
  useEffect(() => {
    const loadAgent = async () => {
      try {
        const response = await fetchSpecificAgent(agentId);
        const record = response?.data?.record;
        setAgentDetails(record);
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

    if (agentId) {
      loadAgent();
    }
    loadDefaultConfig();
  }, [agentId]);

  // Step 1: Agent Profile → Save & Continue
  const handleStepOneSave = (data) => {
    setStepOneData(data);
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2: Memory Config → Save & Continue
  const handleStepTwoSave = (data) => {
    setStepTwoData(data);
    setActiveStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3: Tools → Save & Continue
  const handleStepThreeSave = (data) => {
    setStepThreeData(data);
    setActiveStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 4: API & UI → Save & Continue
  const handleStepFourSave = (data) => {
    setStepFourData(data);
  };

  // Create Agent handler (called from ApiUiConfig after save)
  const handleCreateAgent = async () => {
    try {
      const allData = { ...stepOneData, ...stepTwoData, ...stepThreeData, ...stepFourData };
      console.log("[LangGraph] Creating agent with all data:", allData);

      // Call langgraphApi.createAgent with accumulated data
      const createPayload = {
        agent_name: allData.agentName || agentDetails?.agnt_nm || "",
        agent_description: allData.description || agentDetails?.agnt_desc || "",
        agent_instructions: {
          system: allData.systemInstructions || "",
          orchestration: allData.orchestration_instructions || "",
          response_structure: allData.responseInstructions || "",
        },
        llm_config: {
          model_id: allData.selectedModel || "",
          model_name: allData.selectedModel || "",
          provider_name: allData.llmProviderName || allData.llmServiceProvider || "",
          llm_auth: {
            base_url: defaultConfig?.profile_config?.llm_config?.llm_auth?.base_url || "",
            pat_token: defaultConfig?.profile_config?.llm_config?.llm_auth?.pat_token || "",
          },
          llm_model_config: {
            temperature: defaultConfig?.profile_config?.llm_config?.llm_model_config?.temperature || 0.7,
            max_tokens: defaultConfig?.profile_config?.llm_config?.llm_model_config?.max_tokens || 1000,
          },
        },
      };

      const result = await langgraphApi.createAgent(createPayload);
      console.log("[LangGraph] Agent created:", result);

      // Move to deployment step
      setActiveStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to create agent:", error);
    }
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
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