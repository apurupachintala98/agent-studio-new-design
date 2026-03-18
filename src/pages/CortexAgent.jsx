import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
} from "../components/SharedComponents";
import AgentProfile from "../components/AgentProfile";
import Tools from "../components/Tools";
import Deployment from "../components/Deployment";
import { agentApi } from "../services/api";

export default function AgentStudio() {
  const [activeStep, setActiveStep] = useState(1);
  const [agentDetails, setAgentDetails] = useState(null);
  const { agentId } = useParams();
  const [stepOneData, setStepOneData] = useState(null);
  const [toolData, setToolData] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        // POST /api/cortex/agent/specific
        const result = await agentApi.getCortexAgentDetails(agentId);
        const record = result?.data?.record || {};

        // Merge agent_instructions from root level into record for easy access
        const agentInstructions = result?.agent_instructions || {};
        record._agentInstructions = agentInstructions;

        setAgentDetails(record);
                localStorage.setItem("agentType", record?.agnt_type || "Cortex");

      } catch (error) {
        console.error("Failed to fetch agent details:", error);
      }
    };

    if (agentId) {
      loadAgent();
    }
  }, [agentId]);

  const handleStepOneSave = async (data) => {
    setStepOneData(data);
    try {
      const sesnId = localStorage.getItem("session_Id") || "";

      const configPayload = {
        sesn_id: sesnId,
        agent_name: data.agentName || agentDetails?.agnt_nm || "",
        db: data.db || agentDetails?.db_nm || "Default",
        schema: data.schema || agentDetails?.schma_nm || "Default",
        description: data.description || agentDetails?.agnt_desc || "",
        model_config: {
          orchestration: data.selectedModel || "",
        },
        orchestration_config: {
          budget: {
            seconds: 60,
            tokens: 1600,
          },
          features: {
            thread_memory: true,
          },
          agent_instructions: {
            response: data.responseInstructions || "",
            orchestration: "",
            system: data.systemInstructions || "",
          },
        },
        features: { thread_memory: true },
      };

      await agentApi.saveCortexConfig(agentId, configPayload);
      console.log("[Cortex] Profile config saved");
    } catch (error) {
      console.error("[Cortex] Failed to save profile config:", error);
    }
    setActiveStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToolsSave = async (data) => {
    setToolData(data);
    try {
      const sesnId = localStorage.getItem("session_Id") || "";
      const profile = stepOneData || {};

      const configPayload = {
        sesn_id: sesnId,
        agent_name: profile.agentName || agentDetails?.agnt_nm || "",
        db: profile.db || agentDetails?.db_nm || "Default",
        schema: profile.schema || agentDetails?.schma_nm || "Default",
        description: profile.description || agentDetails?.agnt_desc || "",
        model_config: {
          orchestration: profile.selectedModel || "",
        },
        orchestration_config: {
          budget: {
            seconds: 60,
            tokens: 1600,
          },
          features: {
            thread_memory: true,
          },
          agent_instructions: {
            response: profile.responseInstructions || "",
            orchestration: data.orchestration_instructions || "",
            system: profile.systemInstructions || "",
          },
        },
        features: { thread_memory: true },
      };

      await agentApi.saveCortexConfig(agentId, configPayload);
      console.log("[Cortex] Tools config saved");
    } catch (error) {
      console.error("[Cortex] Failed to save tools config:", error);
    }
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreateAgent = async () => {
    if (!agentId) {
      alert("Agent ID missing");
      return;
    }

    if (!stepOneData || !toolData) {
      alert("Missing required data");
      return;
    }

    setIsCreating(true);

    try {
      const sesnId = localStorage.getItem("session_Id");
      const userId = localStorage.getItem("user_id");

      await agentApi.configureAgent(agentId, {
        sesn_id: sesnId,
        agent_name: stepOneData.agentName,
        description: stepOneData.description,
        db: stepOneData.db,
        schema: stepOneData.schema,
        application_name: stepOneData.applicationName,
        model_config: {
          orchestration: stepOneData.selectedModel,
        },
        orchestration_config: {
          budget: {
            seconds: toolData.budgetSeconds,
            tokens: toolData.budgetTokens,
          },
          features: { thread_memory: true },
          agent_instructions: {
            response: stepOneData.responseInstructions,
            orchestration: stepOneData.orchestrationInstructions,
            system: stepOneData.systemInstructions,
          },
        },
        features: { thread_memory: true },
      });

      await agentApi.configureRuntime(agentId, {
        agent_name: stepOneData.agentName,
        db: stepOneData.db,
        schema: stepOneData.schema,
        application_name: stepOneData.applicationName,
        user_identity: userId,
      });

      const toolsPayload = {
        sesn_id: sesnId,
        ...toolData,
      };
      await agentApi.configureTools(agentId, toolsPayload);
      const response = await agentApi.generateAgentInSnowflake(agentId);

      if (response?.agent_url) {
        localStorage.setItem("agent_url", response.agent_url);
      }
      setActiveStep(3);
    } catch (error) {
      console.error("Agent creation failed:", error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <PageLayout>
      <BackToDashboard />
      <Stepper activeStep={activeStep} />

      {activeStep === 1 && (
        <AgentProfile
          agentDetails={agentDetails}
          savedData={stepOneData}
          onSaveAndContinue={handleStepOneSave}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 2 && (
        <Tools
          agentDetails={agentDetails}
          savedData={toolData}
          onSaveAndContinue={handleToolsSave}
          onCreateAgent={handleCreateAgent}
          onBack={goToPrevStep}
        />
      )}

      {activeStep === 3 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}