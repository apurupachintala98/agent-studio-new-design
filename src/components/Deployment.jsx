
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const BLUE = "#0079c2";
const LOGS = [
    "[14:34:32] INFO VERIFYING BUILD ENVIRONMENT CONFIGURATION ...",
    "[14:34:41] INFO LOADING DEPENDENCY GRAPH MODULES ...",
    "[14:34:55] INFO RESOLVING PACKAGE VERSIONS FROM MANIFEST ...",
    "[14:35:02] INFO ESTABLISHING SECURE CONNECTION TO ARTIFACTS REPOSITORY ...",
    "[14:35:18] INFO FETCHING LATEST RUNTIME EXTENSIONS ...",
    "[14:35:25] INFO VALIDATING CONTAINER INTEGRITY CHECKS ...",
    "[14:35:33] INFO INITIALIZING ORCHESTRATOR HANDSHAKE PROTOCOL ...",
    "[14:35:46] INFO GENERATING OPTIMIZED EXECUTION PLAN ...",
    "[14:35:59] INFO PREPARING DEPLOYMENT BUNDLE FOR STAGING ...",
    "[14:36:10] INFO RUNNING STATIC ANALYSIS ON COMPILED COMPONENTS ...",
    "[14:36:21] INFO REGISTERING ENVIRONMENT VARIABLES FOR RUNTIME CONTEXT ...",
    "[14:36:33] INFO PERFORMING FINAL CONSISTENCY VALIDATION ...",
    "[14:36:49] INFO SIGNING BUILD ARTIFACTS WITH SECURE KEY ...",
    "[14:36:55] INFO UPLOADING BUILD OUTPUTS TO RELEASE CHANNEL ...",
    "[14:37:04] INFO BUILD SEQUENCE COMPLETED SUCCESSFULLY.",
];

// Top-level wizard steps
const WIZARD_STEPS = [
    { label: "Agent Profile &\nResources", done: true },
    { label: "Tools &\nOrchestration", done: true },
    { label: "Deployment", active: true, number: 3 },
];

// Inner deployment sub-steps
const DEPLOY_STEPS = [
    { label: "Batch Configuration Submitted", sub: "Completed at 2:34 PM", badge: "DONE", done: true },
    { label: "Deploying to Snowflake & EKS", sub: "Pushing code to Git repository...", progress: 100, active: true, number: 2 },
    { label: "Agent Testing", sub: "Waiting for Deployment...", number: 3 },
];

function CheckIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}



function WizardStep({ step, index, total }) {
    return (
        <div className="flex items-center">
            <div className="flex flex-col items-center">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2"
                    style={
                        step.done
                            ? { backgroundColor: BLUE, borderColor: BLUE, color: "white" }
                            : step.active
                                ? { backgroundColor: BLUE, borderColor: BLUE, color: "white" }
                                : { backgroundColor: "white", borderColor: "#d1d5db", color: "#9ca3af" }
                    }
                >
                    {step.done ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : step.number}
                </div>
                <span
                    className="text-xs font-medium mt-1.5 text-center whitespace-pre-line leading-tight max-w-[90px]"
                    style={{ color: step.done || step.active ? BLUE : "#9ca3af" }}
                >
                    {step.label}
                </span>
            </div>
            {index < total - 1 && (
                <div
                    className="h-0.5 w-16 mx-1 mb-5"
                    style={{ backgroundColor: step.done ? BLUE : "#e5e7eb" }}
                />
            )}
        </div>
    );
}

function DeployStep({ step, index, total }) {
    return (
        <div className="flex items-start flex-1">
            <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 flex-shrink-0
          ${step.done ? "bg-primary-color border-blue-600 text-white" :
                        step.active ? "bg-white border-blue-600 text-primary-color" :
                            "bg-white border-gray-300 text-gray-400"}`}>
                    {step.done ? <CheckIcon size={14} /> : step.number}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                    <div className={`text-sm font-bold ${step.active ? "text-primary-color" : step.done ? "text-gray-700" : "text-gray-400"}`}>
                        {step.label}
                        {step.active && step.progress !== undefined && (
                            <span className="ml-2 text-primary-color font-bold">{step.progress}%</span>
                        )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{step.sub}</div>

                    {/* Progress bar */}
                    {step.active && step.progress !== undefined && (
                        <div className="w-48 mt-2 mx-auto">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-color rounded-full transition-all duration-1000"
                                    style={{ width: `${step.progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Badge */}
                    {step.badge && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-bold text-teal-700 bg-teal-100 rounded">
                            {step.badge}
                        </span>
                    )}
                </div>
            </div>

            {/* Connector line */}
            {index < total - 1 && (
                <div className={`h-0.5 flex-1 mt-4 mx-2 ${step.done ? "bg-primary-color" : "bg-gray-200"}`} />
            )}
        </div>
    );
}

export default function Deployment({ onBack }) {

    const [finishDeployment, setFinishDeployment] = useState(false);

    const navigate = useNavigate();

    const handleFinishDeployment = () => {
        setFinishDeployment(true);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

            {/* ── Header ── */}
            <Header />

            {/* ── Sub-nav: Back + Wizard ── */}
            <div className="bg-gray-50 border-b border-gray-200 px-8 py-4">
                <div className="flex items-start justify-between">
                    <button className="text-sm text-primary-color font-medium hover:text-blue-800 transition-colors flex items-center gap-1 mt-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Dashboard
                    </button>

                    {/* Wizard steps */}
                    <div className="flex items-start justify-center flex-1">
                        {WIZARD_STEPS.map((step, i) => (
                            <WizardStep key={i} step={step} index={i} total={WIZARD_STEPS.length} />
                        ))}
                    </div>

                    <div className="w-28" /> {/* spacer */}
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="flex-1 px-8 py-6 space-y-6">

                {/* Deployment Progress heading */}
                <h2 className="text-lg font-bold text-gray-800">Deployment Progress</h2>

                {/* Deploy steps card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-6">
                    <div className="flex items-start">
                        {DEPLOY_STEPS.map((step, i) => (
                            <DeployStep key={i} step={step} index={i} total={DEPLOY_STEPS.length} />
                        ))}
                    </div>
                </div>

                {/* Logs + Artifact panel */}
                <div className="grid grid-cols-5 gap-5">

                    {/* Deployment Logs — takes 3 cols */}
                    <div className="col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Terminal title bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Deployment Logs</span>
                            </div>
                            <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                                VIEW FULL LOGS
                            </button>
                        </div>
                        {/* Log content */}
                        <div className="px-5 py-4 h-72 overflow-y-auto font-mono text-xs text-gray-500 leading-6 space-y-0.5 bg-white">
                            {LOGS.map((line, i) => (
                                <div key={i} className={i === LOGS.length - 1 ? "text-green-600 font-semibold" : ""}>{line}</div>
                            ))}
                        </div>
                    </div>

                    {/* Source Artifacts — takes 2 cols */}
                    <div className="col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="flex items-center justify-end px-4 py-3 border-b border-gray-100">
                            <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
                                URL LINK
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center h-72 gap-4 px-6">
                            {/* Folder icon */}
                            <div className="w-24 h-24 flex items-center justify-center" style={{
                                borderRadius: "20.333px",
                                background: "rgba(0, 153, 204, 0.10)"
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="51" viewBox="0 0 64 51" fill="none">
                                    <g clip-path="url(#clip0_281_5244)">
                                        <path d="M57.1872 6.39058H31.7707L25.3793 -0.000732422H6.35401C4.66949 -0.000732422 3.20789 0.618582 1.96927 1.85721C0.730642 3.09583 0.111328 4.60697 0.111328 6.39058V44.4411C0.111328 46.2249 0.730642 47.736 1.96927 48.9745C3.20789 50.2131 4.66949 50.8326 6.35401 50.8326H57.1872C58.8719 50.8326 60.3333 50.2131 61.5719 48.9745C62.8106 47.736 63.4298 46.2249 63.4298 44.4411V12.7819C63.4298 10.9983 62.8106 9.48714 61.5719 8.24851C60.3333 7.00989 58.8719 6.39058 57.1872 6.39058ZM50.796 25.4158H44.4045V31.8073H50.796V38.0499H44.4045V44.4411H38.1619V38.0499H44.4045V31.8073H38.1619V25.4158H44.4045V19.0246H38.1619V12.7819H44.4045V19.0246H50.796V25.4158Z" fill="#44B8F3" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_281_5244">
                                            <rect width="63.5417" height="50.8333" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <div className="text-center">
                                <div className="text-base font-bold text-gray-800">Source Artifacts</div>
                                <div className="text-sm text-gray-500 mt-1">agent_cortex_v1.zip</div>
                                <div className="text-sm text-gray-400">(24MB)</div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* ── Footer actions ── */}
            <footer className="bg-gray-50 border-t border-gray-200 px-8 py-4 flex items-center justify-end gap-3">
                <button onClick={onBack} className="px-5 py-2 rounded-full border border-primary-color text-sm font-medium text-primary-color hover:bg-gray-100 transition-colors">
                    Discard
                </button>
                <button onClick={() => navigate("/chat")} className={`px-5 py-2 rounded-full text-sm font-medium ${finishDeployment ? " bg-primary-color text-white" : "text-gray-500 bg-gray-300"}`} disabled={!finishDeployment}>
                    Chat with Agent
                </button>
                <button onClick={handleFinishDeployment} className="px-6 py-2 rounded-full bg-primary-color hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow">
                    Finish Deployment
                </button>
            </footer>

            {/* ── Copyright ── */}
            <div className="text-center text-xs text-gray-400 py-3 bg-gray-50">
                © 2024 Elevance Health Agent Studio. All rights reserved.
            </div>
        </div>
    );
}