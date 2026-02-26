import { useState } from "react";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
} from "./SharedComponents";
import AgentProfile from "../components/AgentProfile";
import Tools from "../components/Tools";
import Deployment from "../components/Deployment";

export default function AgentStudio() {
  const [activeStep, setActiveStep] = useState(1);

  const goToNextStep = () => {
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
        <AgentProfile onSaveAndContinue={goToNextStep} />
      )}

      {activeStep === 2 && (
        <Tools onSaveAndContinue={goToNextStep} />
      )}

      {activeStep === 3 && (
        <Deployment onFinish={() => console.log("Deployment finished")} />
      )}
    </PageLayout>
  );
}
