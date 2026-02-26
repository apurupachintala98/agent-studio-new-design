import React, { useState } from 'react'
import { ChevronDown, CheckCircle, Info } from 'lucide-react'
import Header from "../components/Header";

const BLUE = "#0079c2";

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

export default function AgentProfile({ onNext }) {
    const [uploadedImage, setUploadedImage] = useState(null)
    const [selectedTab, setSelectedTab] = useState('auto')



    const WIZARD_STEPS = [
        { label: "Agent Profile &\nResources", active: true, number: 1 },
        { label: "Tools &\nOrchestration", number: 2 },
        { label: "Deployment", number: 3 },
    ];

    return (
        <div style={{
            backgroundColor: '#F5F5F5',
            minHeight: '100vh',
            fontFamily: 'Open Sans, sans-serif'
        }}>
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
            {/* Main Content */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '24px 32px'
            }}>


                {/* Agent Profile Title */}
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    marginBottom: '24px',
                    marginTop: '0'
                }}>
                    Agent Profile
                </h2>

                {/* Agent Profile Card Container */}
                <div style={{
                    background: '#FFF',
                    borderRadius: '8px',
                    border: '1px solid #E0E7F1',
                    padding: '24px',
                    marginBottom: '24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    {/* Configuration Note Section */}
                    <div style={{
                        background: '#F0F7FF',
                        border: '1px solid #E0EFFE',
                        borderRadius: '6px',
                        padding: '16px',
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        <Info size={20} style={{ color: '#0079C2', flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#0079C2',
                                marginBottom: '4px'
                            }}>
                                Configuration Note
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#5B6770',
                                lineHeight: '1.5'
                            }}>
                                The Agent Name and Description are locked by the workspace administrator to maintain organizational standards. System Instructions can be tuned for specific behavior.
                            </div>
                        </div>
                    </div>

                    {/* Agent Avatar Section */}
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        alignItems: 'flex-start',
                        marginBottom: '24px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid #E0E7F1'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '8px',
                                background: '#F5F5F5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=200&h=200&fit=crop"
                                    alt="Agent Avatar"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <button style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                background: '#FFF',
                                border: '2px solid #0079C2',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                position: 'relative',
                                top: '-12px',
                                left: '54px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}>
                                ✎
                            </button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#1A1A1A',
                                marginBottom: '8px',
                                margin: '0 0 8px 0'
                            }}>
                                Agent Avatar
                            </h3>
                            <p style={{
                                fontSize: '13px',
                                color: '#5B6770',
                                marginBottom: '12px',
                                lineHeight: '1.4'
                            }}>
                                Upload a custom image or generate one using DALL-E 3.
                            </p>
                            <button style={{
                                background: '#0079C2',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}>
                                Upload Image
                            </button>
                        </div>
                    </div>

                    {/* Agent Name and Model Selection */}
                    <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* Agent Name */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: '#94A3B8',
                                marginBottom: '6px'
                            }}>
                                Agent Name
                            </label>
                            <div style={{
                                fontSize: '13px',
                                color: '#5B6770',
                                padding: '10px 12px',
                                background: '#F5F5F5',
                                borderRadius: '4px',
                                border: '1px solid #E0E7F1'
                            }}>
                                HR - Assistant - 01
                            </div>
                        </div>

                        {/* Model Selection */}
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#1A1A1A',
                                marginBottom: '6px'
                            }}>
                                Model Selection
                            </label>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <select style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    border: '1px solid #CBD5E1',
                                    borderRadius: '4px',
                                    fontSize: '13px',
                                    color: '#5B6770',
                                    background: 'white',
                                    appearance: 'none',
                                    cursor: 'pointer',
                                    paddingRight: '32px'
                                }}>
                                    <option>HR - Assistant - 01</option>
                                </select>
                                <ChevronDown size={16} style={{
                                    position: 'absolute',
                                    right: '8px',
                                    pointerEvents: 'none',
                                    color: '#94A3B8'
                                }} />
                            </div>
                        </div>
                    </div>

                    {/* Agent Description */}
                    <div style={{ marginTop: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#94A3B8',
                            marginBottom: '6px'
                        }}>
                            Agent Description
                        </label>
                        <textarea style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #CBD5E1',
                            borderRadius: '4px',
                            fontSize: '13px',
                            color: '#5B6770',
                            fontFamily: 'Open Sans, sans-serif',
                            minHeight: '60px',
                            resize: 'vertical'
                        }}
                            defaultValue="A specialized data agent for HR analytics and policy information retrieval."
                        />
                    </div>

                    {/* System Instruction */}
                    <div style={{ marginTop: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '500',
                            color: '#94A3B8',
                            marginBottom: '6px'
                        }}>
                            System Instruction
                        </label>
                        <textarea style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #CBD5E1',
                            borderRadius: '4px',
                            fontSize: '13px',
                            color: '#94A3B8',
                            fontFamily: 'Open Sans, sans-serif',
                            minHeight: '80px',
                            resize: 'vertical',
                            background: '#F5F5F5'
                        }}
                            placeholder="Enter system instructions..."
                        />
                    </div>

                    {/* View More Link */}
                    <div style={{
                        marginTop: '16px',
                        textAlign: 'right'
                    }}>
                        <a href="#" style={{
                            color: '#0079C2',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}>
                            View More →
                        </a>
                    </div>
                </div>

                {/* Application Configuration Title - Outside Card */}
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    marginBottom: '16px',
                    marginTop: '32px'
                }}>
                    Application Configuration
                </h2>

                {/* Application Configuration Card */}
                <div style={{
                    background: 'white',
                    border: '1px solid #E0E7F1',
                    borderRadius: '8px',
                    padding: '24px',
                    marginBottom: '24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    {/* Info Note */}
                    <div style={{
                        background: '#F0F7FF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        display: 'flex',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        <Info size={18} color="#0079C2" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <div style={{
                            fontSize: '13px',
                            color: '#5B6770',
                            lineHeight: '1.4'
                        }}>
                            These settings were configured during agent registration and cannot be modified. <a href="#" style={{ color: '#0079C2', textDecoration: 'none', fontWeight: '600' }}>Contact admin</a> to update
                        </div>
                    </div>

                    {/* Database Configuration - Inline */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '24px',
                        marginBottom: '24px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid #E0E7F1'
                    }}>
                        {/* Snowflake Database */}
                        <div>
                            <label style={{
                                fontSize: '12px',
                                color: '#94A3B8',
                                fontWeight: '600',
                                marginBottom: '6px',
                                display: 'block'
                            }}>
                                Snowflake Database
                            </label>
                            <input
                                type="text"
                                value="PROD_ANALYTICS_DB"
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    fontSize: '13px',
                                    color: '#94A3B8',
                                    border: '1px solid #E0E7F1',
                                    borderRadius: '4px',
                                    background: '#F5F5F5',
                                    fontFamily: 'Open Sans, sans-serif',
                                    cursor: 'not-allowed'
                                }}
                            />
                        </div>

                        {/* Database Schema */}
                        <div>
                            <label style={{
                                fontSize: '12px',
                                color: '#94A3B8',
                                fontWeight: '600',
                                marginBottom: '6px',
                                display: 'block'
                            }}>
                                Database Schema
                            </label>
                            <input
                                type="text"
                                value="CUSTOMER_SERVICE"
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '10px 12px',
                                    fontSize: '13px',
                                    color: '#94A3B8',
                                    border: '1px solid #E0E7F1',
                                    borderRadius: '4px',
                                    background: '#F5F5F5',
                                    fontFamily: 'Open Sans, sans-serif',
                                    cursor: 'not-allowed'
                                }}
                            />
                        </div>
                    </div>

                    {/* Snowflake Connection Status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={18} color="#22C55E" />
                            <span style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#1A1A1A'
                            }}>
                                Connected to Snowflake
                            </span>
                        </div>
                        <a href="#" style={{
                            color: '#0079C2',
                            textDecoration: 'none',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}>
                            View Connection Detail →
                        </a>
                    </div>
                </div>

                {/* Resources Title - Outside Card */}
                <h2 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1A1A1A',
                    marginBottom: '16px',
                    marginTop: '32px'
                }}>
                    Resources
                </h2>

                {/* Resources Card */}
                <div style={{
                    background: 'white',
                    border: '1px solid #E0E7F1',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    marginBottom: '32px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    {/* Tool Choice Strategy Heading */}
                    <div style={{
                        padding: '24px',
                        borderBottom: '1px solid #E0E7F1'
                    }}>
                        <h3 style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#1A1A1A',
                            margin: '0 0 16px 0'
                        }}>
                            Tool Choice Strategy
                        </h3>

                        {/* Tab Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '0',
                            borderBottom: '1px solid #E0E7F1'
                        }}>
                            <button
                                onClick={() => setSelectedTab('auto')}
                                style={{
                                    padding: '12px 16px',
                                    background: selectedTab === 'auto' ? '#0079C2' : 'transparent',
                                    color: selectedTab === 'auto' ? 'white' : '#5B6770',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Auto
                            </button>
                            <button
                                onClick={() => setSelectedTab('required')}
                                style={{
                                    padding: '12px 16px',
                                    background: selectedTab === 'required' ? '#0079C2' : 'transparent',
                                    color: selectedTab === 'required' ? 'white' : '#5B6770',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Required
                            </button>
                        </div>
                    </div>


                </div>

                {/* ── Footer ── */}
                <footer className="bg-gray-100 border-t border-gray-200 px-8 py-4 flex items-center justify-end gap-3">
                    <button className="px-5 py-2 rounded-full border border-primary-color text-sm font-medium text-primary-color bg-white hover:bg-gray-50 transition-colors">
                        Discard
                    </button>
                    <button className="px-5 py-2 rounded-full border border-primary-color text-sm font-medium text-primary-color bg-white hover:bg-gray-50 transition-colors">
                        Save as Draft
                    </button>
                    <button
                        onClick={onNext}
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
        </div>
    )
}
