import React, { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown, ExternalLink } from 'lucide-react'
import Header from '../components/Header'
import AgentCard from '../components/AgentCard'
import { fetchAgentsByAppCode } from "../services/agents"
import { agentApi } from "../services/api"
import { useLocation } from "react-router-dom"

const getStatusColor = (status) => {
  return status === 'Active' ? 'text-badge-active' : 'text-badge-draft'
}

const getStatusBgColor = (status) => {
  return status === 'Active' ? 'bg-emerald-50' : 'bg-yellow-50'
}

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [agents, setAgents] = useState([])
  const [agentCount, setAgentCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const { appCode, userId } = location.state || {}
  const hasFetched = useRef(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedAgentName, setSelectedAgentName] = useState("")


  useEffect(() => {
    if (!appCode || hasFetched.current) return

    hasFetched.current = true

    const loadDashboardData = async () => {
      try {
        setLoading(true)

        // Call both APIs but only use agent information response
        const [_, agentInfoResponse] = await Promise.all([
          fetchAgentsByAppCode(appCode),
          agentApi.fetchAgentInformation(appCode),
        ])

        setAgentCount(agentInfoResponse)

        const formattedAgents = agentInfoResponse.agents.map((agent) => ({
          id: agent.agnt_id,
          name: agent.agnt_nm,
          status: agent.status?.toLowerCase() === "active" ? "Active" : "Draft",
          description: agent.agnt_desc,
          agentType: agent.agnt_type,
          modelName: agent.llm_nm || null,
        }))

        setAgents(formattedAgents)

      } catch (error) {
        console.error("Dashboard API Error:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [appCode])

  const filteredAgents = agents.filter(agent => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType =
      selectedType === "" || agent.agentType === selectedType

    const matchesName =
      selectedAgentName === "" || agent.name === selectedAgentName

    return matchesSearch && matchesType && matchesName
  })

  const totalItems = filteredAgents.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gray-50 font-open-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-open-sans text-base font-semibold text-black" style={{ lineHeight: '24px' }}>Key Performance Indicators</h1>
          <button style={{
            color: '#0079C2',
            textAlign: 'center',
            fontFamily: 'Open Sans',
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '16px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '0',
            margin: '0'
          }}>Register New Agent
          </button>
        </div>

        {loading && (
          <div className="mb-4 text-gray-500 text-sm">
            Loading metrics...
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-6 gap-4 mb-12">
          <KPICard
            label="Total Agents"
            value={agentCount?.total_agents?.total_count || 0}
            change="+5 | 0%"
            changeType="up"
          />

          <KPICard
            label="Total Cortex Agents"
            value={agentCount?.total_agents?.cortex_count || 0}
            change="-$12 | 1%"
            changeType="up"
          />

          <KPICard
            label="Total LangGraph Agents"
            value={agentCount?.total_agents?.langgraph_count || 0}
            change="+$16 | 0.8%"
            changeType="up"
          />

          <KPICard
            label="Active Agents"
            value={agentCount?.active_agents?.total_count || 0}
            change="+$16 | 0.8%"
            changeType="up"
          />

          <KPICard
            label="Active Cortex Agents"
            value={agentCount?.active_agents?.cortex_count || 0}
            change="+0.1 | 0.12%"
            changeType="up"
          />

          <KPICard
            label="Active LangGraph Agents"
            value={agentCount?.active_agents?.langgraph_count || 0}
            change="+0.4 | 0.09%"
            changeType="up"
          />
        </div>

        {/* Agents Section */}
        <div>
          <h2 className="mb-6" style={{
            color: "#000",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Open Sans",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "24px",
          }}>{appCode} Agents</h2>


          {/* Search and Filters - Main Container */}
          <div
            style={{
              width: "1408px",
              height: '24px',
              display: "flex",
              alignItems: "center",
              gap: "32px"

            }}
          >
            {/* ================= SEARCH AGENT ================= */}
            <div
              style={{
                display: "inline-flex",
                height: "24px",
                paddingRight: "16px",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              {/* Label */}
              <span
                style={{
                  color: "var(--Colors-color-text, #5B6770)",
                  textAlign: "right",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Search Agent:
              </span>

              {/* Field */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "24px",
                  width: "420px",
                  padding: "0 8px",
                  borderRadius: "3px",
                  background: "rgba(91,103,112,0.05)"
                }}
              >
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    flex: 1,
                    fontSize: "12px",
                    fontFamily: "Open Sans",
                    color: "#5B6770",
                    gap: '555px'
                  }}
                />
                <Search size={11} color="#5B6770" />
              </div>
            </div>

            {/* ================= AGENT TYPE ================= */}
            <div
              style={{
                display: "inline-flex",
                height: "24px",
                paddingRight: "12px",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              {/* Label */}
              <span
                style={{
                  color: "var(--Colors-color-text, #5B6770)",
                  textAlign: "right",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Agent Type:
              </span>

              {/* Field */}
              <div
                style={{
                  display: "flex",
                  padding: "0 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "233px",
                  alignSelf: "stretch",
                  position: 'relative',
                  borderRadius: "3px",
                  background: "rgba(91, 103, 112, 0.05)",
                }}
              >
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: "284px",
                    height: "100%",
                    border: "none",
                    background: "transparent",
                    padding: "0 24px 0 8px",
                    fontSize: "12px",
                    fontFamily: "Open Sans",
                    color: "#5B6770",
                    appearance: "none",
                    outline: "none",
                    cursor: "pointer",
                    gap: '254px'
                  }}
                >
                  <option value="">Select</option>
                  {[...new Set(agents.map(a => a.agentType))].map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 10L13 5H3L8 10Z"
                    fill="#2F3A40"   // darker color for visibility
                  />
                </svg>
              </div>
            </div>

            {/* ================= AGENT NAME ================= */}
            <div
              style={{
                display: "inline-flex",
                height: "24px",
                paddingRight: "12px",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              {/* Label */}
              <span
                style={{
                  color: "var(--Colors-color-text, #5B6770)",
                  textAlign: "right",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "24px",
                }}
              >
                Agent Name:
              </span>

              {/* Field */}
              <div
                style={{
                  display: "flex",
                  padding: "0 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "233px",
                  alignSelf: "stretch",
                  position: 'relative',
                  borderRadius: "3px",
                  background: "rgba(91, 103, 112, 0.05)",
                }}
              >
                <select
                  value={selectedAgentName}
                  onChange={(e) => setSelectedAgentName(e.target.value)}
                  style={{
                    width: "284px",
                    height: "100%",
                    border: "none",
                    background: "transparent",
                    padding: "0 24px 0 8px",
                    fontSize: "12px",
                    fontFamily: "Open Sans",
                    color: "#5B6770",
                    appearance: "none",
                    outline: "none",
                    cursor: "pointer",
                    gap: '254px'
                  }}
                >
                  <option value="">Select</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 10L13 5H3L8 10Z"
                    fill="#2F3A40"   // darker color for visibility
                  />
                </svg>
              </div>
            </div>
          </div>


          {/* Agent Cards Grid */}
          <div style={{
            display: 'inline-grid',
            rowGap: '24px',
            columnGap: '24px',
            gridTemplateRows: 'repeat(3, fit-content(100%))',
            gridTemplateColumns: 'repeat(3, fit-content(100%))',
            padding: '30px 88px 0 60px',
          }}>
            {paginatedAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>


          {/* Pagination */}
          <div
            style={{
              display: "flex",
              width: "1407px",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: '20px',

            }}
          >
            {/* Top Horizontal Line */}
            <div
              style={{
                display: "flex",
                height: "1px",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                backgroundColor: "#D9D9D9",
              }}
            />

            <div
              style={{
                display: "flex",
                height: "24px",
                paddingRight: "24px",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "32px",
                alignSelf: "stretch",
                background: "#FFF",
              }}
            >
              {/* 1 of 100 of 8,618 */}
              <div
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "var(--color-text, #5B6770)",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: "Open Sans",
                  fontSize: "11px",
                  fontStyle: "normal",
                  lineHeight: "16px",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>
                <span style={{ fontWeight: 400 }}> of </span>
                <span style={{ fontWeight: 600 }}>
                  {Math.min(currentPage * itemsPerPage, totalItems)}
                </span>
                <span style={{ fontWeight: 400 }}> of </span>
                <span style={{ fontWeight: 600 }}>
                  {totalItems}
                </span>
              </div>

              {/* Right Side Controls */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {/* First Page Arrow */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    opacity: currentPage === 1 ? 0.4 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                  >
                    <path
                      d="M6.43821 7.45455L2.96696 3.97727L6.43821 0.5M0.5 6.84091V1.11364"
                      stroke="#AAAAAA"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Previous Arrow */}
                <button disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    opacity: currentPage === 1 ? 0.4 : 1,
                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      d="M4.94922 9L0.706578 4.75L4.94922 0.5"
                      stroke="#AAAAAA"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Page 1 of 87 */}
                <div
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "var(--color-text, #5B6770)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: "Open Sans",
                    fontSize: "11px",
                    fontStyle: "normal",
                    lineHeight: "16px",
                  }}
                >
                  <span style={{ fontWeight: 400 }}>Page </span>
                  <span style={{ fontWeight: 600 }}>{currentPage}</span>
                  <span style={{ fontWeight: 400 }}> of </span>
                  <span style={{ fontWeight: 600 }}>{totalPages}</span>
                </div>

                {/* Next Arrow */}
                <button disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      d="M1.05078 1L5.29342 5.25L1.05078 9"
                      stroke="#AAAAAA"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Last Page Arrow */}
                <button disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    opacity: currentPage === totalPages ? 0.4 : 1,
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer"
                  }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="7"
                    height="8"
                    viewBox="0 0 7 8"
                    fill="none"
                  >
                    <path
                      d="M0.56179 0.54545L4.03304 4.02273L0.56179 7.5M6.5 1.15909V6.88636"
                      stroke="#AAAAAA"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function KPICard({ label, value, change, changeType }) {
  // Parse change string to separate number and percentage
  const changeMatch = change.match(/([\+\-\$\s\d.]+)\s*\|\s*([\d.]+%)/);
  const changeNumber = changeMatch ? changeMatch[1].trim() : change;
  const changePercent = changeMatch ? changeMatch[2] : '';

  const UpArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none" style={{ width: '8.901px', height: '10.881px' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.757 0.298058C4.14018 -0.0992929 4.76158 -0.0994126 5.14469 0.298058L8.61344 3.89864C8.99664 4.29635 8.99664 4.94136 8.61344 5.33907C8.23024 5.73675 7.60894 5.73677 7.22575 5.33907L5.45036 3.4963V9.88107C5.45035 10.4334 5.00264 10.8811 4.45036 10.8811C3.89821 10.8809 3.45036 10.4332 3.45036 9.88107V3.4963L1.67496 5.33907C1.29176 5.73677 0.670466 5.73678 0.287269 5.33907C-0.0956676 4.94134 -0.0958451 4.29626 0.287269 3.89864L3.757 0.298058Z" fill="#53B1A3" />
    </svg>
  );

  const DownArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none" style={{ width: '8.901px', height: '10.881px' }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.14401 10.583C4.76083 10.9804 4.13943 10.9805 3.75632 10.583L0.287567 6.98243C-0.0956354 6.58472 -0.0956354 5.93971 0.287567 5.542C0.670773 5.14432 1.29207 5.1443 1.67526 5.542L3.45065 7.38477L3.45065 1.00001C3.45065 0.447722 3.89837 6.67572e-06 4.45065 6.67572e-06C5.0028 0.000173569 5.45065 0.447825 5.45065 1.00001L5.45065 7.38477L7.22604 5.542C7.60925 5.14431 8.23054 5.14429 8.61374 5.542C8.99668 5.93973 8.99685 6.58481 8.61374 6.98243L5.14401 10.583Z" fill="#D90026" />
    </svg>
  );

  return (
    <div className="flex flex-col items-start flex-1 p-4 rounded-lg bg-white" style={{ boxShadow: '0 13px 19px -13px rgba(17, 17, 17, 0.30)' }}>
      {/* Label */}
      <p style={{
        color: '#5B6770',
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '16px',
        marginBottom: '12px',
        width: '100%'
      }}>
        {label}
      </p>

      {/* Value */}
      <p style={{
        color: '#5B6770',
        fontFamily: 'Open Sans',
        fontSize: '36px',
        fontWeight: '300',
        lineHeight: '48px',
        marginBottom: '8px'
      }}>
        {value}
      </p>

      {/* Change Indicator */}
      <div
        className="flex items-center"
        style={{
          display: 'flex',
          padding: '0 8px',
          alignItems: 'center',
          gap: '5px',
          borderRadius: '8px',
          backgroundColor: changeType === 'up' ? 'rgba(83, 177, 163, 0.10)' : 'rgba(217, 0, 38, 0.10)'
        }}
      >
        {changeType === 'up' ? <UpArrow /> : <DownArrow />}
        <span style={{
          color: '#5B6770',
          fontFamily: 'Open Sans',
          fontSize: '11px',
          fontWeight: '300',
          lineHeight: '16px'
        }}>
          {changeNumber} | {changePercent}
        </span>
      </div>
    </div>
  )
}
