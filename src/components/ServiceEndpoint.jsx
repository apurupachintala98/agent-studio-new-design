import { useState } from "react";

const URL =
    "https://infrastructure.cortex-platform.example.com/api/v2/runtime/cluster/environment/staging/build/pipeline/execution/metadata/components/cortex-runtime-v2.1/diagnostics/logs/system/health/status/extended/stream/session/4982374982374982374982374/node/ops/longpath/configuration/assets/resources/cortex-engine/modules/dependencies/v4/security/validation/scan/results/detail/report/index.html";

export default function ServiceEndpoint() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full  px-6 py-5">
            <div className="flex items-start gap-4">
                {/* Icon box */}
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                        className="w-6 h-6 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-gray-800 mb-1.5">Service Endpoint</h2>
                    <p className="text-sm text-gray-500 break-all leading-relaxed">{URL}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-4 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                </button>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            Copy Link
                        </>
                    )}
                </button>
            </div>
        </div>

    );
}