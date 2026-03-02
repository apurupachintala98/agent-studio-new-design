import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
} from "../components/SharedComponents";
import AgentProfile from "../components/AgentProfile";
import { fetchSpecificAgent } from "../services/agents";

export default function LangGraphAgent() {
  const { agentId } = useParams();
  const [activeStep, setActiveStep] = useState(1);
  const [agentDetails, setAgentDetails] = useState(null);
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

  const goToNextStep = (dataFromStep) => {
    if (dataFromStep) {
      setStepOneData(dataFromStep);
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
          agentType="LangGraph"
          agentDetails={agentDetails}
          onSaveAndContinue={goToNextStep}
          onBack={goToPrevStep}
        />
      )}

     

    </PageLayout>
  );
}