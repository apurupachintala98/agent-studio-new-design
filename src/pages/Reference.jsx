import React, { useState } from 'react'
import { Search } from 'lucide-react'
import Header from '../components/Header'

export default function Reference() {
  const [searchQuery, setSearchQuery] = useState('')

  const referenceCards = [
    {
      id: 1,
      title: 'Platform Architecture',
      description: 'Overview of the AI platform\'s technical architecture, components, and system design principles.'
    },
    {
      id: 2,
      title: 'Getting Started Guide',
      description: 'Step-by-step guide to begin developing applications with the EHAP platform and accessing developer resources.'
    },
    {
      id: 3,
      title: 'Frequently Asked Questions',
      description: 'Common questions and answers about the EHAP platform, development process, and troubleshooting.'
    },
    {
      id: 4,
      title: 'Estimating Cost',
      description: 'Tools and methods for estimating the costs associated with using the EHAP platform and services.'
    },
    {
      id: 5,
      title: 'Tokens',
      description: 'Overview of how token-based usage works across the AI platform\'s endpoints and workflows.'
    },
    {
      id: 6,
      title: 'Rate Limits & Prod Credentials',
      description: 'Overview of the AI platform\'s rate limiting strategies and production credentials.'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: '"Open Sans"' }}>
      <Header />

      {/* Main Content */}
      <main
        style={{
          display: "flex",
          width: "100%",
          margin: "0 auto",  
          minHeight: "717px",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "48px",
          padding: '20px 96px 32px 96px',
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          {/* ===================== TOP REFERENCE SECTION ===================== */}
          <div
            style={{
              height: "199px",
              flexShrink: 0,
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",      // horizontal center
              justifyContent: "center",  // vertical center
              textAlign: "center",
              gap: "24px",
            }}
          >
            <h1
              style={{
                color: "#030213",
                fontFamily: "Open Sans",
                fontSize: "42px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "56px",
                display: "inline-flex",


              }}

            >
              References
            </h1>

            <p
              style={{
                width: "683px",
                flexShrink: 0,
                color: "#5B6770",
                textAlign: "center",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: "Open Sans",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "24px",
              }}
            >
              Explore a variety of resources to help you develop and integrate
              with the Elevance Health AI Platform.
            </p>

            {/* Search */}
            <div style={{
              width: "600px",
              height: "47px",
              boxShadow: "0 13px 19px -13px rgba(17, 17, 17, 0.30)",
            }}>
              <div
                style={{
                  display: "flex",
                  width: "600px",
                  height: "47px",
                  padding: "12px 48px 12px 16px",
                  alignItems: "center",
                  borderRadius: "8px",
                  border: "1px solid #D9D9D9",
                  background: "#FFF",
                }}
              >
                <input
                  type="text"
                  placeholder="Search references..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "14px",
                    fontFamily: "Open Sans",
                    color: "#5B6770",
                  }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17.5001 17.5L13.9167 13.9167" stroke="#9CA3AF" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* ===================== OVERVIEW SECTION ===================== */}
          <div style={{
            height: "406px",
            flexShrink: 0,
            alignSelf: "stretch",
            marginBottom: '40px',
          }}>
            <h2
              style={{
                color: "#030213",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: "Open Sans",
                fontSize: "21px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "24px",
                display: "flex",
                width: "100%",
                padding: "0.5px 1168px 7.5px 0",
                alignItems: "center",
              }}

            >
              Overview
            </h2>

            <p
              style={{
                color: "#5B6770",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontFamily: "Open Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "16px",
                marginTop: '24.5px',
              }}
            >
              Get a high-level understanding of the Elevance Health AI Platform
              and its capabilities.
            </p>

            {/* Cards Grid */}
            <div style={{
              width: "100%",
              height: "296px",
              marginTop: '37px',
            }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {referenceCards.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      display: "flex",
                      width: "405.328px",
                      height: "146px",
                      padding: "24px 0 0 24px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "12px",
                      borderRadius: "8px",
                      border: "1px solid #E0E0E0",
                      background: "#FFF",
                      boxShadow: "0 13px 19px -13px rgba(17, 17, 17, 0.30)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        color: "#030213",
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#5B6770",
                        margin: 0,
                      }}
                    >
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
