import React, { useState } from 'react'
import { ArrowLeft, Upload, Info, CheckCircle, ChevronDown } from 'lucide-react'
import Header from './Header'

export default function AgentProfile() {
  const [agentName, setAgentName] = useState('HR - Assistant - 01')
  const [modelSelection, setModelSelection] = useState('HR - Assistant - 01')
  const [agentDescription, setAgentDescription] = useState('A specialized data agent for HR analytics and policy information retrieval.')
  const [systemInstruction, setSystemInstruction] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', fontFamily: '"Open Sans", sans-serif' }}>
      <Header />

      {/* Main Content */}
      <main style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back to Dashboard */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#0079C2',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '24px',
          padding: '0'
        }}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        {/* Progress Stepper */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#0079C2',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              1
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#0079C2',
              textAlign: 'center',
              maxWidth: '100px'
            }}>Agent Profile &<br />Resources</span>
          </div>

          {/* Connector Line */}
          <div style={{
            width: '80px',
            height: '2px',
            background: '#CBD5E1',
            marginBottom: '30px'
          }} />

          {/* Step 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#E2E8F0',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              2
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#64748B',
              textAlign: 'center',
              maxWidth: '100px'
            }}>Tools &<br />Orchestration</span>
          </div>

          {/* Connector Line */}
          <div style={{
            width: '80px',
            height: '2px',
            background: '#CBD5E1',
            marginBottom: '30px'
          }} />

          {/* Step 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#E2E8F0',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px'
            }}>
              3
            </div>
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#64748B',
              textAlign: 'center',
              maxWidth: '100px'
            }}>Deployment</span>
          </div>
        </div>

        {/* Agent Profile Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Agent Profile
          </h2>

          {/* Configuration Note */}
          <div style={{
            display: 'flex',
            gap: '12px',
            padding: '16px',
            borderRadius: '8px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            marginBottom: '24px'
          }}>
            <Info size={20} style={{ color: '#0079C2', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{
                margin: '0 0 4px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937'
              }}>
                Configuration Note
              </p>
              <p style={{
                margin: 0,
                fontSize: '13px',
                color: '#4B5563',
                lineHeight: '1.5'
              }}>
                The Agent Name and Description are locked by the workspace administrator to maintain organizational standards. System Instructions can be tuned for specific behavior.
              </p>
            </div>
          </div>

          {/* Agent Avatar Section */}
          <div style={{
            display: 'flex',
            gap: '24px',
            padding: '24px',
            borderRadius: '8px',
            background: 'white',
            border: '1px solid #E5E7EB',
            marginBottom: '24px'
          }}>
            {/* Avatar Image */}
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#F3F4F6',
              border: '1px solid #E5E7EB'
            }}>
              <img
                src="/placeholder.svg?height=120&width=120"
                alt="Agent Avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                background: 'white',
                border: '1px solid #D1D5DB',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}>
                <Upload size={14} color="#6B7280" />
              </button>
            </div>

            {/* Avatar Info */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '8px',
                margin: '0 0 8px 0'
              }}>
                Agent Avatar
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#6B7280',
                marginBottom: '16px',
                margin: '0 0 16px 0',
                lineHeight: '1.5'
              }}>
                Upload a custom image or generate one using DALL-E 3.
              </p>
              <button style={{
                padding: '8px 16px',
                background: '#0079C2',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Upload Image
              </button>
            </div>
          </div>

          {/* Agent Name and Model Selection */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* Agent Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Agent Name
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                disabled
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '13px',
                  background: '#F9FAFB',
                  color: '#6B7280',
                  cursor: 'not-allowed'
                }}
              />
            </div>

            {/* Model Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                color: '#6B7280',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Model Selection
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={modelSelection}
                  onChange={(e) => setModelSelection(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: 'white',
                    color: '#1F2937',
                    appearance: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option>HR - Assistant - 01</option>
                  <option>HR - Assistant - 02</option>
                </select>
                <ChevronDown
                  size={16}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#6B7280'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Agent Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Agent Description
            </label>
            <textarea
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#4B5563',
                minHeight: '60px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
          </div>

          {/* System Instruction */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: '600',
              color: '#6B7280',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              System Instruction
            </label>
            <textarea
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              placeholder="Enter system instructions for the agent..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#4B5563',
                minHeight: '120px',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />
            <button style={{
              marginTop: '12px',
              color: '#0079C2',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              View More
            </button>
          </div>
        </div>

        {/* Application Configuration Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Application Configuration
          </h2>

          <div style={{
            display: 'flex',
            gap: '12px',
            padding: '16px',
            borderRadius: '8px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            marginBottom: '16px'
          }}>
            <Info size={20} style={{ color: '#0079C2', flexShrink: 0, marginTop: '2px' }} />
            <p style={{
              margin: 0,
              fontSize: '13px',
              color: '#0B5A9C',
              lineHeight: '1.5'
            }}>
              These settings were configured during agent registration and cannot be modified. <button style={{
                background: 'none',
                border: 'none',
                color: '#0079C2',
                cursor: 'pointer',
                fontWeight: '600',
                textDecoration: 'underline',
                padding: '0'
              }}>Contact admin</button> to update
            </p>
          </div>

          <div style={{
            padding: '20px',
            borderRadius: '8px',
            background: 'white',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Snowflake Database</p>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#1F2937',
                  fontWeight: '600'
                }}>PROD_ANALYTICS_DB</p>
              </div>
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Database Schema</p>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#1F2937',
                  fontWeight: '600'
                }}>CUSTOMER_SERVICE</p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              paddingTop: '16px',
              borderTop: '1px solid #E5E7EB'
            }}>
              <CheckCircle size={18} style={{ color: '#10B981' }} />
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#0B5A9C'
              }}>
                Connected to Snowflake
              </span>
              <button style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                color: '#0079C2',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'underline',
                padding: '0'
              }}>
                View Connection Detail
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1F2937',
            marginBottom: '16px',
            margin: '0 0 16px 0'
          }}>
            Resources
          </h2>

          <div style={{
            padding: '20px',
            borderRadius: '8px',
            background: 'white',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{
                padding: '8px 16px',
                background: '#0079C2',
                color: 'white',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                Auto
              </div>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Tool Choice Strategy</p>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#1F2937'
                }}>Required</p>
              </div>
              <div>
                <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6B7280',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>Response Structure</p>
                <select style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  fontSize: '12px',
                  background: 'white',
                  color: '#1F2937'
                }}>
                  <option>Default</option>
                </select>
              </div>
              <div>
                <select style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  fontSize: '12px',
                  background: 'white',
                  color: '#1F2937'
                }}>
                  <option>Select Tool Resources</option>
                </select>
              </div>
              <div>
                <select style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '4px',
                  fontSize: '12px',
                  background: 'white',
                  color: '#1F2937'
                }}>
                  <option>Select or add resources</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          paddingTop: '24px',
          borderTop: '1px solid #E5E7EB'
        }}>
          <button style={{
            padding: '10px 24px',
            border: '1px solid #0079C2',
            background: 'white',
            color: '#0079C2',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Discard
          </button>
          <button style={{
            padding: '10px 24px',
            border: '1px solid #0079C2',
            background: 'white',
            color: '#0079C2',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Save as Draft
          </button>
          <button style={{
            padding: '10px 24px',
            border: 'none',
            background: '#0079C2',
            color: 'white',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            Save & Continue
          </button>
        </div>
      </main>
    </div>
  )
}
