import { useNavigate } from "react-router-dom";

export default function AgentCard({ agent }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '411px',
        height: '243px',
        borderRadius: '8px',
        background: '#FFF',
        boxShadow: '0 13px 19px -13px rgba(17, 17, 17, 0.30)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Icon and Status Container */}
      <div
        style={{
          display: 'flex',
          width: '362.664px',
          height: '48px',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            flexShrink: 0,
            aspectRatio: '1/1',
            borderRadius: '8px',
            background: '#0079C2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle cx="24" cy="24" r="24" fill="#0079C2" />
            <rect
              x="14.16"
              y="10.56"
              width="19.68"
              height="26.88"
              rx="1.344"
              stroke="white"
              strokeWidth="1.92"
            />
            <path
              d="M18 15H30"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
            <path
              d="M18 18.6H30"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
            <path
              d="M18 22.2H30"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
            <path
              d="M18 25.8H24"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
            <path
              d="M25.2 31.8H30"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
            <path
              d="M27.6 29.4V34.2"
              stroke="white"
              strokeWidth="1.92"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'flex',
            padding: '2px 10px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '16px',
            background: agent.status === 'Active' ? '#F1F9F7' : '#FEF8E7'
          }}
        >
          <span
            style={{
              color: agent.status === 'Active' ? '#53B1A3' : '#F3C246',
              textAlign: 'center',
              fontFamily: 'Open Sans',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '20px'
            }}
          >
            {agent.status}
          </span>
        </div>
      </div>

      {/* Agent Name */}
      <h3
        style={{
          color: '#5B6770',
          fontFamily: 'Open Sans',
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '27px',
          margin: '0',
          marginTop: '4px'
        }}
      >
        {agent.name}
      </h3>

      {/* Description */}
      <p
        style={{
          width: '338px',
          color: '#5B6770',
          fontFamily: 'Open Sans',
          fontSize: '13px',
          fontWeight: '300',
          lineHeight: '18px',
          margin: '0',
          marginBottom: '8px'
        }}
      >
        {agent.description}
      </p>

      {/* Models Container */}
      <div
        style={{
          display: 'flex',
          width: '362.664px',
          height: '36px',
          alignItems: 'flex-start',
          gap: '8px',
          marginTop: 'auto'
        }}
      >

        {/* {agent.models.map((model, index) => {

          const isAgentType =
            model === "Cortex" || model === "LangGraph"

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                padding: '9px 11px 10px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                border: isAgentType
                  ? '1px solid rgba(0, 121, 194, 0.20)'
                  : '1px solid #E2E8F0',
                background: isAgentType
                  ? 'rgba(0, 121, 194, 0.10)'
                  : '#F1F5F9'
              }}
            >
              <span
                style={{
                  color: isAgentType ? '#0079C2' : '#5B6770',
                  fontFamily: 'Open Sans',
                  fontSize: '11px',
                  fontWeight: '600',
                  lineHeight: '16.5px'
                }}
              >
                {model}
              </span>
            </div>
          )
        })} */}
       {/* Agent Type Box */}
<div
  style={{
    display: 'flex',
    padding: '9px 11px 10px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    border: '1px solid rgba(0, 121, 194, 0.20)',
    background: 'rgba(0, 121, 194, 0.10)'
  }}
>
  <span
    style={{
      color: '#0079C2',
      fontFamily: 'Open Sans',
      fontSize: '11px',
      fontWeight: '600',
      lineHeight: '16.5px'
    }}
  >
    {agent.agentType}
  </span>
</div>

{/* Model Name Box */}
{agent.modelName && (
  <div
    style={{
      display: 'flex',
      padding: '9px 11px 10px 12px',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
      background: '#F1F5F9'
    }}
  >
    <span
      style={{
        color: '#5B6770',
        fontFamily: 'Open Sans',
        fontSize: '11px',
        fontWeight: '600',
        lineHeight: '16.5px'
      }}
    >
      {agent.modelName}
    </span>
  </div>
)}
        {/* Edit Icon Container */}
        <div
          onClick={() => navigate("/cortex-agent")}
          style={{
            display: "flex",
            width: "31px",
            height: "32px",
            padding: "8.5px 8px 0 8px",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "16px",
            marginLeft: "auto",
            cursor: "pointer",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            style={{
              height: "15px",
              flexShrink: 0,
              alignSelf: "stretch",
              transition: "transform 0.2s ease",
            }}
          >
            <path
              d="M9.375 1.875H13.125V5.625"
              stroke="#94A3B8"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.25 8.75L13.125 1.875"
              stroke="#94A3B8"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.25 8.125V11.875C11.25 12.2065 11.1183 12.5245 10.8839 12.7589C10.6495 12.9933 10.3315 13.125 10 13.125H3.125C2.79348 13.125 2.47554 12.9933 2.24112 12.7589C2.0067 12.5245 1.875 12.2065 1.875 11.875V5C1.875 4.66848 2.0067 4.35054 2.24112 4.11612C2.47554 3.8817 2.79348 3.75 3.125 3.75H6.875"
              stroke="#94A3B8"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
