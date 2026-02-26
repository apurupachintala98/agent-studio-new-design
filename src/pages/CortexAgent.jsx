import { useState, useEffect } from "react";
import {
  PageLayout,
  BackToDashboard,
  Stepper,
} from "../components/SharedComponents";
import AgentProfile from "../components/AgentProfile";
import Tools from "../components/Tools";
import Deployment from "../components/Deployment";
import { fetchPipelineInformation, fetchPipelineLogsInformation } from "../services/api";
import { useLocation } from "react-router-dom"

export default function AgentStudio() {
  const [activeStep, setActiveStep] = useState(1);
  const { agentDetails } = location.state || {};

  const [agentInfo, setAgentInfo] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [startedTime, setStartedTime] = useState("00:00:00");
  const [pipelineLogs, setPipelineLogs] = useState("Checking pipeline logs...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nameSpace, setNameSpace] = useState("bmbpoc-srv-devops");
  const [clusterName, setClusterName] = useState("EDA-EKS-NP1-Cluster");

  const goToNextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let logsPollingTimeout = null;
    let infoPollingTimeout = null;
    let isUnmounted = false;

    const pollInfo = () => {
      fetchPipelineInformation(clusterName, nameSpace)
        .then((data) => {
          let filteredPipelines = [];
          if (data && Array.isArray(data.pipelines)) {
            filteredPipelines = data.pipelines
              .sort((a, b) => new Date(b.started) - new Date(a.started))
              .filter((pipeline) =>
                pipeline.status === "Completed" &&
                pipeline.name && pipeline.name.includes("agentbuilderpoc")
              );
            data.pipelines = filteredPipelines;
          }
          if (!isUnmounted) setAgentInfo(data);
          if (filteredPipelines.length > 0) {
            const agentNameValue = filteredPipelines[0].name;
            const startTimeValue = filteredPipelines[0].started;
            setAgentName(agentNameValue);
            setStartedTime(startTimeValue)

            // Polling function for pipeline logs
            const pollLogs = () => {
              fetchPipelineLogsInformation(clusterName, nameSpace, agentNameValue)
                .then((logs) => {
                  setPipelineLogs(logs);
                  if (logs && logs.status !== "Failed" && logs.status !== "Completed" && !isUnmounted) {
                    logsPollingTimeout = setTimeout(pollLogs, 3000); // Poll every 3 seconds
                  }
                })
                .catch((err) => setPipelineLogs({ error: err.message || "Error fetching pipeline logs" }));
            };
            pollLogs();
          }
          if (!isUnmounted) setLoading(false);
          if (!isUnmounted) infoPollingTimeout = setTimeout(pollInfo, 3000); // Poll every 3 seconds
        })
        .catch((err) => {
          if (!isUnmounted) {
            setError(err.message || "Error fetching agent information");
            setLoading(false);
            infoPollingTimeout = setTimeout(pollInfo, 3000);
          }
        });
    };
    pollInfo();

    return () => {
      isUnmounted = true;
      if (logsPollingTimeout) clearTimeout(logsPollingTimeout);
      if (infoPollingTimeout) clearTimeout(infoPollingTimeout);
    };
  }, []);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };


  return (
    <PageLayout>
      {loading && <div>Loading agent information...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {agentInfo && (
        <pre style={{ background: '#f5f5f5', padding: '1em', borderRadius: '4px' }}>
          {JSON.stringify(agentInfo, null, 2)}
        </pre>
      )}
      {agentName && (
        <div style={{ margin: '1em 0', fontWeight: 'bold' }}>Agent Name: {agentName}</div>
      )}
      {pipelineLogs && (
        <pre style={{ background: '#eef', padding: '1em', borderRadius: '4px' }}>
          {JSON.stringify(pipelineLogs, null, 2)}
        </pre>
      )}
      <BackToDashboard />
      <Stepper activeStep={activeStep} />

      {activeStep === 1 && (
        <AgentProfile onSaveAndContinue={goToNextStep} />
      )}

      {activeStep === 2 && (
        <Tools onSaveAndContinue={goToNextStep} />
      )}

      {activeStep === 3 && (
        <Deployment onFinish={() => console.log("Deployment finished")} logs={pipelineLogs ? [JSON.stringify(pipelineLogs, null, 2)] : "Checking pipeline logs..."}
        startTimeValue={startedTime} />
      )}
    </PageLayout>
  );
}
