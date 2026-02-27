import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import ServiceEndpoint from "../components/ServiceEndpoint";
import { SendHorizonal } from "lucide-react";

const SSE_LOGS = [
    // { time: "10:43:01", type: "EVENT", content: 'node:start\n  name="policy_retriever"' },
    // { time: "10:43:02", type: "SSE", content: 'chunk: "For the 2024"' },
    // { time: "10:43:02", type: "SSE", content: 'chunk: " plan year,"' },
    // { time: "10:43:04", type: "EVENT", content: 'node:end\n  name="policy_retriever"\n  duration=240ms' },
    // { time: "10:43:04", type: "TOOL", content: 'call:\n  query_benefits_db(year="2024")' },
    // { time: "10:43:05", type: "SSE", content: 'chunk: " there are a few"' },
    // { time: "10:43:05", type: "SSE", content: 'chunk: " key updates..."' },
];

const TOOL_RESULT = `{ "status": "success", "results": [
  {"plan": "PPO Gold", "diff": 0.03},
  {"plan": "HDHP Silver", "diff": 0} ] }`;

const typeColors = {
    EVENT: "text-blue-600",
    SSE: "text-teal-600",
    TOOL: "text-blue-600",
};

function BotIcon() {
    return (
        <div className="w-9 h-9 rounde  flex items-center justify-center flex-shrink-0"
            style={{
                borderRadius: "16777200px",
                background: "rgba(0, 45, 114, 0.05)",
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <g clip-path="url(#clip0_179_1715)">
                    <path d="M2.45455 10.8636C1.77273 10.8636 1.19319 10.6251 0.715911 10.1478C0.238637 9.6705 -1.86557e-07 9.09095 -1.86557e-07 8.40913C-1.86557e-07 7.72731 0.238637 7.14776 0.715911 6.67049C1.19319 6.19322 1.77273 5.95458 2.45455 5.95458V4.31821C2.45455 3.86821 2.61477 3.48298 2.93523 3.16252C3.25569 2.84207 3.64091 2.68184 4.09092 2.68184H6.54547C6.54547 2.00003 6.7841 1.42048 7.26137 0.943206C7.73865 0.465932 8.31819 0.227295 9.00002 0.227295C9.68183 0.227295 10.2614 0.465932 10.7387 0.943206C11.2159 1.42048 11.4546 2.00003 11.4546 2.68184H13.9091C14.3591 2.68184 14.7444 2.84207 15.0648 3.16252C15.3852 3.48298 15.5455 3.86821 15.5455 4.31821V5.95458C16.2273 5.95458 16.8069 6.19322 17.2842 6.67049C17.7614 7.14776 18 7.72731 18 8.40913C18 9.09095 17.7614 9.6705 17.2842 10.1478C16.8069 10.6251 16.2273 10.8636 15.5455 10.8636V14.1364C15.5455 14.5864 15.3852 14.9717 15.0648 15.2921C14.7444 15.6125 14.3591 15.7727 13.9091 15.7727H4.09092C3.64091 15.7727 3.25569 15.6125 2.93523 15.2921C2.61477 14.9717 2.45455 14.5864 2.45455 14.1364V10.8636ZM6.54547 9.22731C6.88638 9.22731 7.17615 9.10799 7.41478 8.86935C7.65342 8.63072 7.77274 8.34095 7.77274 8.00004C7.77274 7.65912 7.65342 7.36936 7.41478 7.13072C7.17615 6.89208 6.88638 6.77276 6.54547 6.77276C6.20455 6.77276 5.91479 6.89208 5.67615 7.13072C5.43751 7.36936 5.31819 7.65912 5.31819 8.00004C5.31819 8.34095 5.43751 8.63072 5.67615 8.86935C5.91479 9.10799 6.20455 9.22731 6.54547 9.22731ZM11.4546 9.22731C11.7955 9.22731 12.0852 9.10799 12.3239 8.86935C12.5625 8.63072 12.6819 8.34095 12.6819 8.00004C12.6819 7.65912 12.5625 7.36936 12.3239 7.13072C12.0852 6.89208 11.7955 6.77276 11.4546 6.77276C11.1136 6.77276 10.8239 6.89208 10.5852 7.13072C10.3466 7.36936 10.2273 7.65912 10.2273 8.00004C10.2273 8.34095 10.3466 8.63072 10.5852 8.86935C10.8239 9.10799 11.1136 9.22731 11.4546 9.22731ZM5.72728 12.5H12.2727V10.8636H5.72728V12.5ZM4.09092 14.1364H13.9091V4.31821H4.09092V14.1364Z" fill="#1A3673" />
                </g>
                <defs>
                    <clipPath id="clip0_179_1715">
                        <rect width="18" height="16" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}

function UserIcon() {
    return (
        <div className="w-9 h-9 rounded-xl rouded flex items-center justify-center flex-shrink-0"
            style={{
                borderRadius: "16777200px",
                background: "rgba(0, 153, 204, 0.10)"
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                <g clip-path="url(#clip0_179_1734)">
                    <path d="M6.50002 6.50002C5.60626 6.50002 4.84116 6.18179 4.2047 5.54533C3.56824 4.90886 3.25 4.14376 3.25 3.25C3.25 2.35626 3.56824 1.59115 4.2047 0.95469C4.84116 0.31823 5.60626 0 6.50002 0C7.39376 0 8.15888 0.31823 8.79533 0.95469C9.43179 1.59115 9.75002 2.35626 9.75002 3.25C9.75002 4.14376 9.43179 4.90886 8.79533 5.54533C8.15888 6.18179 7.39376 6.50002 6.50002 6.50002ZM0 13V10.725C0 10.2646 0.11849 9.84148 0.355469 9.45549C0.592449 9.06955 0.907294 8.77502 1.3 8.5719C2.13958 8.1521 2.99271 7.83725 3.85938 7.62737C4.72605 7.41747 5.60626 7.31252 6.50002 7.31252C7.39376 7.31252 8.27398 7.41747 9.14065 7.62737C10.0073 7.83725 10.8605 8.1521 11.7 8.5719C12.0928 8.77502 12.4076 9.06955 12.6446 9.45549C12.8815 9.84148 13 10.2646 13 10.725V13H0ZM1.62501 11.3751H11.3751V10.725C11.3751 10.576 11.3378 10.4406 11.2633 10.3187C11.1888 10.1969 11.0907 10.1021 10.9688 10.0344C10.2375 9.66878 9.49951 9.39456 8.75471 9.21174C8.00992 9.02893 7.25835 8.93752 6.50002 8.93752C5.74168 8.93752 4.99012 9.02893 4.24533 9.21174C3.50053 9.39456 2.7625 9.66878 2.03125 10.0344C1.90938 10.1021 1.8112 10.1969 1.73672 10.3187C1.66224 10.4406 1.62501 10.576 1.62501 10.725V11.3751ZM6.50002 4.87501C6.94689 4.87501 7.32944 4.7159 7.64768 4.39767C7.96591 4.07944 8.12502 3.69689 8.12502 3.25C8.12502 2.80313 7.96591 2.42058 7.64768 2.10235C7.32944 1.78412 6.94689 1.62501 6.50002 1.62501C6.05314 1.62501 5.67058 1.78412 5.35235 2.10235C5.03412 2.42058 4.87501 2.80313 4.87501 3.25C4.87501 3.69689 5.03412 4.07944 5.35235 4.39767C5.67058 4.7159 6.05314 4.87501 6.50002 4.87501Z" fill="#0099CC" />
                </g>
                <defs>
                    <clipPath id="clip0_179_1734">
                        <rect width="13" height="13" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
}

function StructuredResponse() {
    return (
        <div className="text-sm text-gray-700 leading-relaxed space-y-3">
            <p>For the 2024 plan year, there are a few key updates to premiums depending on your selected tier.</p>
            <ul className="space-y-2">
                <li className="flex items-start gap-2">
                    <span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span><span className="font-medium text-gray-800">PPO Gold:</span> 3% increase in monthly employee contribution.</span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span><span className="font-medium text-gray-800">HDHP Silver:</span> No change to premiums, HSA match remains at $500.</span>
                </li>
            </ul>
            <p className="text-gray-500">Would you like to see the specific breakdown for your current plan?</p>
        </div>
    );
}


export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorNotification, setErrorNotification] = useState("")
    const [apiUrl, setApiUrl] = useState("")
    const agentId = localStorage.getItem("agentId");
    const sesnId = localStorage.getItem("session_Id")
    const userId = localStorage.getItem("user_id")
    const appCode = localStorage.getItem("aplctn_cd");
    const agentName = localStorage.getItem("agentName");

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
        const API_URL = "https://agentbuilder-demo.edl.dev.awsdns.internal.das/";

        if (!agentName || !API_URL) return;

        const formatted = agentName.toLowerCase().trim();
        const base = API_URL.replace(/\/$/, "");

        const generatedUrl = `${base}/${formatted}be-service/`;

        setApiUrl(generatedUrl);
    }, [agentName]);


    const handleSubmit = async () => {
        const content = input.trim();
        if (!content) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            text: content,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        // Always show user message
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        if (!apiUrl) {
            console.error("API URL missing");
            setIsLoading(false);
            return;
        }

        try {
            const endpoint = `${apiUrl.replace(/\/$/, "")}/agent/chat`;

            const payload = {
                agent_id: agentId,
                application_id: appCode,
                user_id: userId,
                session_id: sesnId,
                body: {
                    content_type: "text",
                    messages: [
                        {
                            role: "user",
                            content: content,
                        },
                    ],
                },
            };

            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`API Error ${res.status}`);
            }

            const data = await res.json();

            const assistantText =
                data?.response?.messages?.[0]?.content ||
                data?.response ||
                "No response received.";

            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                text: assistantText,
                time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error(error);

            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 2,
                    role: "assistant",
                    text: "Sorry, something went wrong.",
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-100 text-gray-900 flex flex-col"
            style={{ fontFamily: "'Segoe UI', sans-serif" }}
        >
            {/* ── Header ── */}


            <Header />
            <div className="px-6 py-4">
                <ServiceEndpoint url={apiUrl} />
            </div>

            <div className='flex flex-col h-full flex-1'>
                <div className="flex flex-1 overflow-hidden relative">

                    {/* ── Chat Area ── */}
                    <div className="flex-1 flex flex-col min-w-0 px-4">
                        {/* Agent tag */}
                        <div className="bg-gray-100 border-b border-gray-200 px-6 py-2 flex items-center gap-2">
                            <span className="text-sm text-gray-500">Testing:</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow shadow-blue-200" />
                            <span className="text-sm font-semibold text-gray-700">{agentName || "Agent"}</span>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-5 bg-gray-100">
                            {messages.map(msg => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    {msg.role === "assistant" ? <BotIcon /> : <UserIcon />}
                                    <div className={`max-w-xl flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                        <div
                                            className={`rounded-2xl px-5 py-3.5 shadow-sm text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-blue-50 border border-blue-100 text-gray-700 rounded-tr-sm"
                                                : "bg-white border border-gray-200 text-gray-700 rounded-tl-sm"
                                                }`}
                                        >
                                            {msg.structured
                                                ? <StructuredResponse />
                                                : <p className="whitespace-pre-line">{msg.text}</p>
                                            }
                                        </div>
                                        <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="px-6 py-4 flex space-x-3 items-end">
                            <div className="relative flex-1 bg-white rounded-2xl border border-gray-300 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-all shadow-sm">
                                <textarea
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                    placeholder="Type your message to test the agent..."
                                    rows={2}
                                    className="w-full bg-transparent px-4 pt-3 pb-10 text-sm text-gray-700 placeholder-gray-400 resize-none outline-none"
                                />
                                <div className="absolute bottom-2.5 left-3 flex items-center gap-1 w-full pr-8">
                                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                        </svg>
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <ellipse cx="12" cy="5" rx="9" ry="3" />
                                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                        </svg>
                                    </button>

                                    <div className="flex-1"></div>
                                    <span className="text-xs text-gray-300 select-none">Shift + Enter for new line</span>
                                </div>
                            </div>

                            <div className=" flex items-center gap-2 pb-2">

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-10 h-10 rounded-[50%] bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors shadow"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M0.0183334 15.2577L1.36977 9.40529C1.42312 9.15625 1.63651 8.96058 1.90324 8.925L9.46063 8.14231C9.67402 8.12452 9.67402 7.80433 9.46063 7.76875L1.90324 7.03942C1.63651 7.02163 1.42312 6.82596 1.36977 6.57692L0.0183334 0.74229C-0.106141 0.244212 0.427322 -0.164924 0.889657 0.066327L15.6666 7.46635C16.1111 7.6976 16.1111 8.33798 15.6666 8.56923L0.889657 15.9337C0.427322 16.1649 -0.106141 15.7558 0.0183334 15.2577Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── SSE Debug Panel ── */}
                    <div className="w-96 border border-gray-200 bg-white flex flex-col flex-shrink-0 mx-4 mt-4 mb-3">
                        {/* Panel title */}
                        <div className="px-5 py-3.5 flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">SSE Debug Terminal</span>
                            <div className="flex items-center gap-1 text-gray-400">
                                <button className="p-1 rounded hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                    </svg>
                                </button>
                                <button className="p-1 rounded hover:bg-gray-100 hover:text-gray-600 transition-colors">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Log entries */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 font-mono text-xs">
                            {SSE_LOGS.length > 0 && SSE_LOGS.map((log, i) => (
                                <div key={i}>
                                    <div className="flex items-start gap-2 leading-relaxed">
                                        <span className="text-gray-400 flex-shrink-0 tabular-nums">{log.time}</span>
                                        <span className={`font-bold flex-shrink-0 ${typeColors[log.type]}`}>[{log.type}]</span>
                                        <span className="text-gray-600 whitespace-pre-line">{log.content}</span>
                                    </div>
                                    {/* Tool result JSON block */}
                                    {i === 4 && (
                                        <div className="mt-2 ml-14 bg-gray-50 border border-gray-200 rounded-lg p-3">
                                            <pre className="text-gray-500 text-xs whitespace-pre-wrap leading-relaxed">{TOOL_RESULT}</pre>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {SSE_LOGS.length === 0 && (
                                <div className='text-gray-400 text-sm'>Debug Terminal Coming Soon...</div>
                            )}
                        </div>

                        {/* Metrics grid */}
                        <div className="p-2 grid grid-cols-2 gap-y-2 gap-x-2 bg-white">
                            <div className="bg-[#F8FAFC] p-3">
                                <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase mb-0.5">LATENCY</div>
                                <div className="text-base font-bold text-gray-800">240ms</div>
                            </div>
                            <div className="bg-[#F8FAFC] p-3">
                                <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase mb-0.5">TOKEN</div>
                                <div className="text-base font-bold text-gray-800">1.2k</div>
                            </div>
                            <div className="bg-[#F8FAFC] p-3">
                                <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase mb-0.5">MODEL</div>
                                <div className="text-base font-bold text-gray-800">GPT-4 Turbo</div>
                            </div>
                            <div className="bg-[#F8FAFC] p-3">
                                <div className="text-xs text-gray-400 font-semibold tracking-widest uppercase mb-0.5">MEMORY</div>
                                <div className="text-base font-bold text-green-600">Active</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-gray-400 text-[14px] w-full text-center">© 2024 Elevance Health Agent Studio. All rights reserved.</div>
            </div>
        </div >
    );
}