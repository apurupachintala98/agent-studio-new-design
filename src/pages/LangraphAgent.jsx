import { PageLayout, BackToDashboard } from "../components/SharedComponents";
import { useNavigate } from "react-router-dom";

export default function LangraphAgent() {
  const navigate = useNavigate();
  const agentDetails = location.state?.agentDetails || null;

  const [activeStep, setActiveStep] = useState(1);

  const goToNextStep = (data) => {
    console.log(`[LangGraph] Step ${activeStep} data:`, data);
    setActiveStep((prev) => Math.min(prev + 1, 3));
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
        />
      )}
    
    </PageLayout>
  );
}