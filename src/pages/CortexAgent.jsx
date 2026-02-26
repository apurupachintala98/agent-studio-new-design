import { useState } from "react";
import AgentProfile from "../components/AgentProfile";
import Tools from "../components/Tools";
import Deployment from "../components/Deployment";
import { useLocation } from "react-router-dom"

export default function CortexAgent() {
    const location = useLocation()
  const [step, setStep] = useState(1);
  const { agentDetails } = location.state || {}

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      {step === 1 && <AgentProfile onNext={handleNext} />}
      {step === 2 && <Tools onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <Deployment onBack={handleBack} />}
    </>
  );
}