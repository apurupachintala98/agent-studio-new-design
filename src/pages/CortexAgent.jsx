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
    alert("Missing profile or tool data")
    return
  }

  setIsCreating(true)

  try {
    const sesnId = crypto.randomUUID()
    const userId = localStorage.getItem("user_id")

    // 🔥 Extract data from stepOneData
    const {
      agentName,
      description,
      db,
      schema,
      applicationName,
      selectedModel,
      responseInstructions,
      orchestrationInstructions,
      systemInstructions,
    } = stepOneData

    const profilePayload = {
      sesn_id: sesnId,
      agent_name: agentName,
      description: description,
      db: db,
      schema: schema,
      application_name: applicationName,
      model_config: {
        orchestration: selectedModel,
      },
      orchestration_config: {
        budget: {
          seconds: toolData.budgetSeconds,
          tokens: toolData.budgetTokens,
        },
        features: { thread_memory: true },
        agent_instructions: {
          response: responseInstructions,
          orchestration: orchestrationInstructions,
          system: systemInstructions,
        },
      },
      features: { thread_memory: true },
    }

    await agentApi.configureAgent(agentId, profilePayload)

    await agentApi.configureRuntime(agentId, {
      agent_name: agentName,
      db: db,
      schema: schema,
      application_name: applicationName,
      user_identity: userId,
    })

    const formattedResources = {}

    toolData.toolResources.forEach((resource) => {
      formattedResources[resource.name] = {
        semantic_model_file: resource.semantic_model_file,
        db_name: db,
        input_schema: resource.input_schema || "Default",
        execution_environment: {
          type: resource.execution_environment_type,
          warehouse: resource.warehouse,
          query_timeout: resource.query_timeout || 120,
        },
      }
    })

    const toolsPayload = {
      sesn_id: sesnId,
      tool_choice: {
        type: toolData.toolChoiceType,
        name:
          toolData.toolChoiceType === "tool" &&
          toolData.toolChoiceName
            ? [toolData.toolChoiceName]
            : [],
      },
      tools: toolData.tools.map((tool) => ({
        type: tool.type,
        name: tool.name,
        description: tool.description,
        db_name: db,
        input_schema: tool.input_schema || "Default",
      })),
      tool_resources: formattedResources,
      orchestration_instructions:
        toolData.orchestrationInstructions,
    }

    await agentApi.configureTools(agentId, toolsPayload)

    alert("Agent Created Successfully ")

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
        />
      )}

   {activeStep === 2 && (
  <Tools
    agentDetails={agentDetails}
    onSaveAndContinue={handleToolsSave}
    onCreateAgent={handleCreateAgent}
  />
)}

      {activeStep === 3 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}