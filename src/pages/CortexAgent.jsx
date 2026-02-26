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
import { fetchSpecificAgent } from "../services/agents";
import { agentApi } from "../services/api"

export default function AgentStudio() {
  const [activeStep, setActiveStep] = useState(1);
  const [agentDetails, setAgentDetails] = useState(null);
  const { agentId } = useParams();
  const [stepOneData, setStepOneData] = useState(null);
  const [toolData, setToolData] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

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

    if (agentId) {
      loadAgent();
    }
  }, [agentId]);

  const goToNextStep = (dataFromStepOne) => {
    if (dataFromStepOne) {
      setStepOneData(dataFromStepOne);
    }

    setActiveStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleToolsSave = (data) => {
    setToolData(data)
  }

  const handleCreateAgent = async () => {
    if (!agentId) {
      alert("Agent ID missing")
      return
    }

    if (!stepOneData || !toolData) {
      alert("Missing required data")
      return
    }

    setIsCreating(true)

    try {
      const sesnId = localStorage.getItem("session_Id")
      const userId = localStorage.getItem("user_id")

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
      })

      await agentApi.configureRuntime(agentId, {
        agent_name: stepOneData.agentName,
        db: stepOneData.db,
        schema: stepOneData.schema,
        application_name: stepOneData.applicationName,
        user_identity: userId,
      })

      const toolsPayload = {
        sesn_id: sesnId,
        ...toolData
      }
      await agentApi.configureTools(agentId, toolsPayload)
      const response = await agentApi.generateAgentInSnowflake(agentId)

    if (response?.agent_url) {
      localStorage.setItem("agent_url", response.agent_url)
    }
      setActiveStep(3)

    } catch (error) {
      console.error(error)
      alert("Agent creation failed")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <PageLayout>
      <BackToDashboard />
      <Stepper activeStep={activeStep} />

      {activeStep === 1 && (
  <AgentProfile
    agentDetails={agentDetails}
    onSaveAndContinue={goToNextStep}
    onBack={goToPrevStep}
  />
)}

      {activeStep === 2 && (
  <Tools
    agentDetails={agentDetails}
    onSaveAndContinue={handleToolsSave}
    onCreateAgent={handleCreateAgent}
    onBack={goToPrevStep}
  />
)}

      {activeStep === 3 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}