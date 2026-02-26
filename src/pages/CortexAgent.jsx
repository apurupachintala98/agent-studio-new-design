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
    onSaveAndContinue={(data) => {
      setToolData(data)
      goToNextStep()
    }}
  />
)}

      {activeStep === 3 && <Deployment agentDetails={agentDetails} />}
    </PageLayout>
  );
}