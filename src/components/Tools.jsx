import { useState } from "react";
import Header from "../components/Header";

const TOOLS = [
    { id: 1, name: "Claims_analyst_text_to_sql", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 2, name: "Aedl_metadata_analyst_text_to_sql", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 3, name: "Merge_pr", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 4, name: "Aedl_metadata_analyst_text_to_sql", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 5, name: "Promote_tokenization_metadata", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 6, name: "Validate_change_task", desc: "Lorem Ipsum is simply dummy text", icon: "tablet", selected: true },
    { id: 7, name: "Validate_change_request", desc: "Lorem Ipsum is simply dummy text", icon: "mail", selected: false },
    { id: 8, name: "Validate_change_task", desc: "Lorem Ipsum is simply dummy text", icon: "mail", selected: false },
    { id: 9, name: "Check_merge_status", desc: "Lorem Ipsum is simply dummy text", icon: "mail", selected: false },
    { id: 10, name: "Validate_ritm", desc: "Lorem Ipsum is simply dummy text", icon: "mail", selected: false },
];

const BLUE = "#0079c2";

function TabletIcon({ color = "#9db8cc" }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
    );
}

function MailIcon({ color = "#9db8cc" }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

function CheckCircle() {
    return (
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BLUE }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
    );
}

function EmptyCircle() {
    return (
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
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

function ToolCard({ tool, onToggle }) {
    const isSelected = tool.selected;
    return (
        <div
            onClick={() => onToggle(tool.id)}
            className="relative rounded-xl p-4 cursor-pointer transition-all duration-150 select-none"
            style={{
                backgroundColor: "white",
                border: isSelected ? `2px solid ${BLUE}` : "2px solid #e5e7eb",
                boxShadow: isSelected ? `0 0 0 0px ${BLUE}22` : "none",
            }}
        >
            {/* Top row: icon + checkbox */}
            <div className="flex items-start justify-between mb-3">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: isSelected ? "#e8f4fb" : "#f3f4f6" }}
                >
                    {tool.icon === "tablet"
                        ? <TabletIcon color={isSelected ? BLUE : "#9ca3af"} />
                        : <MailIcon color={isSelected ? BLUE : "#9ca3af"} />}
                </div>
                {isSelected ? <CheckCircle /> : <EmptyCircle />}
            </div>
            {/* Text */}
            <div className="font-semibold text-sm text-gray-800 leading-snug break-words">{tool.name}</div>
            <div className="text-xs text-gray-400 mt-0.5">{tool.desc}</div>
        </div>
    );
}

export default function Tools() {
    const [tools, setTools] = useState(TOOLS);
    const [search, setSearch] = useState("");
    const [orchestration, setOrchestration] = useState("");
    const [activeTab, setActiveTab] = useState("My Agents");

    const WIZARD_STEPS = [
        { label: "Agent Profile &\nResources", done: true },
        { label: "Tools &\nOrchestration", active: true, number: 2 },
        { label: "Deployment", number: 3 },
    ];

    const toggleTool = (id) => {
        setTools(prev => prev.map(t => t.id === id ? { ...t, selected: !t.selected } : t));
    };

    const filtered = tools.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontFamily: "'Segoe UI', 'DM Sans', sans-serif" }}>

            <Header />

            {/* ── Sub-nav: Back + Wizard ── */}
            <div className="bg-gray-100 px-8 py-4">
                <div className="flex items-start justify-between">
                    <button
                        className="text-sm font-medium hover:opacity-80 transition-colors flex items-center gap-1 mt-1"
                        style={{ color: BLUE }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Back to Dashboard
                    </button>
                    <div className="flex items-start justify-center flex-1">
                        {WIZARD_STEPS.map((step, i) => (
                            <WizardStep key={i} step={step} index={i} total={WIZARD_STEPS.length} />
                        ))}
                    </div>
                    <div className="w-28" />
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="flex-1 px-8 pb-6 space-y-6">

                {/* Tools section */}
                <div className="bg-gray-100 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-gray-800">Tools</h2>
                        {/* Search */}
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                            <span className="text-xs text-gray-400">Search</span>
                            <div className="w-px h-4 bg-gray-200" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Default"
                                className="outline-none text-xs text-gray-500 w-28 bg-transparent placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {filtered.map(tool => (
                            <ToolCard key={tool.id} tool={tool} onToggle={toggleTool} />
                        ))}
                    </div>
                </div>

                {/* Orchestration section */}
                <div>
                    <h2 className="text-base font-bold text-gray-800 mb-3">Orchestration</h2>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 min-h-[140px] flex space-x-2">
                        <div className="text-xs text-gray-400 block mt-2" style={{ whiteSpace: 'nowrap' }}>Orchestration Instruction</div>
                        <textarea
                            value={orchestration}
                            onChange={e => setOrchestration(e.target.value)}
                            className="w-full outline-none text-sm text-gray-700 resize-none bg-[#f7f7f7] placeholder-gray-300 min-h-[80px]"
                            placeholder=""
                        />
                    </div>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="bg-gray-100 border-t border-gray-200 px-8 py-4 flex items-center justify-end gap-3">
                <button className="px-5 py-2 rounded-full border border-primary-color text-sm font-medium text-primary-color bg-white hover:bg-gray-50 transition-colors">
                    Discard
                </button>
                <button className="px-5 py-2 rounded-full border border-primary-color text-sm font-medium text-primary-color bg-white hover:bg-gray-50 transition-colors">
                    Save as Draft
                </button>
                <button
                    className="px-6 py-2 rounded-full text-white text-sm font-semibold transition-colors shadow"
                    style={{ backgroundColor: BLUE }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = "#005f9e"}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = BLUE}
                >
                    Save &amp; Continue
                </button>
            </footer>

            {/* ── Copyright ── */}
            <div className="text-center text-xs text-gray-400 py-3 bg-gray-100">
                © 2024 Elevance Health Agent Studio. All rights reserved.
            </div>
        </div>
    );
}