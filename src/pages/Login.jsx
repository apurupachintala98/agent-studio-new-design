import React from 'react'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [appCodes, setAppCodes] = useState([])   // array from API
  const [appCode, setAppCode] = useState("")    // selected value
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isValidated, setIsValidated] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const validateLDAP = async () => {
    try {
      if (!userId || !password) {
        setError("User ID and Password are required")
        return
      }

      setIsValidating(true)
      setError("")
      setIsValidated(false)

      const response = await fetch(
        "https://pbee9gz5pe-vpce-0bd9a454888e84407.execute-api.us-east-1.amazonaws.com/prod/validateldapcredentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            password: password,
            env: "dev",
            app_id: "Metadata"
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials")
      }

      const codes = data.app_cd || []

      if (!codes.length) {
        throw new Error("No application codes found")
      }

      setAppCodes(Array.isArray(codes) ? codes : [])
      setIsValidated(true)

    } catch (err) {
      console.error(err)
      setError(err.message || "Validation failed")
      setIsValidated(false)
    } finally {
      setIsValidating(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!appCode) {
      setError("Please select Application Code")
      return
    }

    localStorage.setItem("user_id", userId)
    localStorage.setItem("aplctn_cd", appCode)

    // store selected application
    navigate("/dashboard")
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Left Side - Blue Section */}
      <div style={{
        display: 'flex',
        width: '512px',
        padding: '64px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: '#0079C2',
        color: 'white',
        minHeight: '100vh',
        boxSizing: 'border-box',
        flexShrink: 0
      }}>
        {/* Logo Section - Stays at Top */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          {/* Letter E */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '6px',
            background: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0079C2',
            fontWeight: 'bold',
            fontSize: '28px',
            flexShrink: 0
          }}>
            E
          </div>

          {/* Elevance and Health Text */}
          <div>
            {/* Elevance */}
            <div style={{
              color: '#FFF',
              fontFamily: '"Source Sans 3"',
              fontSize: '30px',
              fontWeight: '700',
              lineHeight: '30px',
              letterSpacing: '-0.75px',
              margin: '0 0 2px 0'
            }}>
              Elevance
            </div>
            {/* Health */}
            <div style={{
              color: '#FFF',
              fontFamily: '"Source Sans 3"',
              fontSize: '24px',
              fontWeight: '300',
              lineHeight: '30px',
              letterSpacing: '0.6px',
              margin: 0
            }}>
              Health
            </div>
          </div>
        </div>

        {/* Enterprise Portal and Agent Studio Container - Expands with flex:1 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          width: '100%',
          flex: 1,
          justifyContent: 'center'
        }}>
          {/* Enterprise Portal Badge */}
          {/* <div style={{
            display: 'flex',
            padding: '4px 12px',
            alignItems: 'center',
            borderRadius: '2px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.1)'
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: '"Source Sans 3"',
              fontSize: '12px',
              fontWeight: '600',
              lineHeight: '16px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              margin: 0
            }}>
              ENTERPRISE PORTAL
            </span>
          </div> */}

          {/* Agent Studio Title */}
          <h2 style={{
            color: '#FFF',
            fontFamily: '"Source Sans 3"',
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '60px',
            margin: 0
          }}>
            Agent Studio
          </h2>

          {/* Description */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '"Source Sans 3"',
            fontSize: '20px',
            fontWeight: '400',
            lineHeight: '32.5px',
            margin: 0,
            maxWidth: '320px'
          }}>
            The enterprise-grade no-code and low-code agent builder for professional agent registration and secure management.
          </p>

          {/* Decorative Lines */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '40px'
          }}>
            {/* 1st Line */}
            <div style={{
              width: '48px',
              height: '6px',
              borderRadius: '9999px',
              background: '#00AEEF'
            }} />
            {/* 2nd Line */}
            <div style={{
              width: '16px',
              height: '6px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.2)'
            }} />
            {/* 3rd Line */}
            <div style={{
              width: '16px',
              height: '6px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.2)'
            }} />
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div style={{
          color: 'rgba(255, 255, 255, 0.5)',
          fontFamily: '"Source Sans 3"',
          fontSize: '14px',
          fontWeight: '300',
          lineHeight: '20px'
        }}>
          <p style={{ margin: '0 0 4px 0' }}>© 2026 Elevance Health. All rights reserved.</p>
          <p style={{ margin: 0 }}>Authorized Personnel Only.</p>
        </div>
      </div>

      {/* Right Side - Form Section with Stripe Pattern */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        background: '#F8F9FA',
        width: '768px',
        padding: '48px',
      }}>
        {/* Form Card Container */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          width: '448px',
          height: '673px',
          boxShadow: '0 10px 40px -10px rgba(0, 38, 119, 0.15)',
          zIndex: 2,
          // position: 'absolute',
          // top: '50px',
          // bottom: '50px',
          // left: '50%',
          // transform: 'translateX(-50%)',
          margin: '50px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          {/* Title and Description Container */}
          <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '57px 57px 0 57px'
          }}>
            {/* Title */}
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h1 style={{
                color: '#0079C2',
                textAlign: 'center',
                fontFamily: '"Source Sans 3"',
                fontSize: '30px',
                fontWeight: '700',
                lineHeight: '36px',
                margin: '0 0 12px 0'
              }}>
                Welcome Back
              </h1>
              <p style={{
                color: '#4D4D4D',
                textAlign: 'center',
                fontFamily: '"Source Sans 3"',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                margin: 0
              }}>
                Please enter your credentials to access<br />Agent Studio.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '28px',
            padding: '28px 57px 35px 57px'
          }}>
            {/* User ID */}
            <div style={{ width: '100%' }}>
              <label style={{
                color: '#333',
                fontFamily: '"Source Sans 3"',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
                display: 'block',
                marginBottom: '8px'
              }}>
                User ID
              </label>
              <div style={{
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
                gap: '8px'
              }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33331 7.33334C6.32498 7.33334 5.46179 6.97432 4.74373 6.25626C4.02567 5.5382 3.66665 4.67501 3.66665 3.66668C3.66665 2.65834 4.02567 1.79515 4.74373 1.07709C5.46179 0.359038 6.32498 1.06096e-05 7.33331 1.06096e-05C8.34165 1.06096e-05 9.20484 0.359038 9.9229 1.07709C10.641 1.79515 11 2.65834 11 3.66668C11 4.67501 10.641 5.5382 9.9229 6.25626C9.20484 6.97432 8.34165 7.33334 7.33331 7.33334ZM-2.02358e-05 14.6667V12.1C-2.02358e-05 11.5806 0.13366 11.1031 0.401021 10.6677C0.668382 10.2323 1.02359 9.90001 1.46665 9.67084C2.41387 9.19723 3.37637 8.84202 4.35415 8.60522C5.33192 8.36841 6.32498 8.25001 7.33331 8.25001C8.34165 8.25001 9.3347 8.36841 10.3125 8.60522C11.2903 8.84202 12.2528 9.19723 13.2 9.67084C13.643 9.90001 13.9982 10.2323 14.2656 10.6677C14.533 11.1031 14.6666 11.5806 14.6666 12.1V14.6667H-2.02358e-05ZM1.83331 12.8333H12.8333V12.1C12.8333 11.932 12.7913 11.7792 12.7073 11.6417C12.6232 11.5042 12.5125 11.3972 12.375 11.3208C11.55 10.9083 10.7173 10.599 9.87706 10.3927C9.03679 10.1865 8.18887 10.0833 7.33331 10.0833C6.47776 10.0833 5.62984 10.1865 4.78956 10.3927C3.94929 10.599 3.11665 10.9083 2.29165 11.3208C2.15415 11.3972 2.04338 11.5042 1.95935 11.6417C1.87533 11.7792 1.83331 11.932 1.83331 12.1V12.8333ZM7.33331 5.50001C7.83748 5.50001 8.26908 5.3205 8.6281 4.96147C8.98713 4.60244 9.16665 4.17084 9.16665 3.66668C9.16665 3.16251 8.98713 2.73091 8.6281 2.37188C8.26908 2.01286 7.83748 1.83334 7.33331 1.83334C6.82915 1.83334 6.39755 2.01286 6.03852 2.37188C5.67949 2.73091 5.49998 3.16251 5.49998 3.66668C5.49998 4.17084 5.67949 4.60244 6.03852 4.96147C6.39755 5.3205 6.82915 5.50001 7.33331 5.50001Z" fill="#94A3B8" />
                </svg>
                <input
                  type="text"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  placeholder="Enter your User ID"
                  style={{
                    flex: 1,
                    outline: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    fontFamily: '"Source Sans 3"',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    background: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Password */}
            {/* <div style={{ width: '100%' }}>
              <label style={{
                color: '#333',
                fontFamily: '"Source Sans 3"',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
                display: 'block',
                marginBottom: '8px'
              }}>
                Password
              </label>
              <div style={{
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
                gap: '8px'
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => {
                    if (userId && password) {
                      validateLDAP()
                    }
                  }}
                  placeholder="••••••••"
                  style={{
                    flex: 1,
                    outline: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    fontFamily: '"Source Sans 3"',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    background: 'transparent'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94A3B8',
                    padding: '0'
                  }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div> */}

            <div style={{ width: '100%' }}>
              <label style={{
                color: '#333',
                fontFamily: '"Source Sans 3"',
                fontSize: '14px',
                fontWeight: '700',
                lineHeight: '20px',
                display: 'block',
                marginBottom: '8px'
              }}>
                Password
              </label>

              <div style={{
                borderRadius: '6px',
                border: isValidated ? '1px solid #16A34A' : '1px solid #CBD5E1',
                background: '#FFF',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
                gap: '8px'
              }}>

                {/* Lock Icon */}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>

                {/* Password Input */}
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setIsValidated(false) // reset validation if user edits
                  }}
                  placeholder="••••••••"
                  style={{
                    flex: 1,
                    outline: 'none',
                    border: 'none',
                    color: '#333',
                    fontFamily: '"Source Sans 3"',
                    fontSize: '16px',
                    background: 'transparent'
                  }}
                />

                {/* Eye Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94A3B8',
                    padding: 0
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {/* Validate Tick Button */}
                <button
                  type="button"
                  onClick={validateLDAP}
                  disabled={isValidating}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: '6px',
                    color: isValidated ? '#16A34A' : '#94A3B8'
                  }}
                >
                  {isValidating ? (
                    <span style={{ fontSize: '12px' }}>...</span>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>

              </div>
            </div>

            {/* Application Code */}
            <div style={{ width: '100%' }}>
              <label
                style={{
                  color: isValidated ? '#333' : '#94A3B8',
                  fontFamily: '"Source Sans 3"',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '20px',
                  display: 'block',
                  marginBottom: '8px',
                  opacity: isValidated ? 1 : 0.6
                }}
              >
                Application Code
              </label>

              <div
                style={{
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 12px',
                  height: '48px',
                  width: '100%',
                  position: 'relative'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#94A3B8" style={{ marginRight: '8px' }}>
                  <circle cx="5" cy="5" r="1.5" />
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="19" cy="5" r="1.5" />
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                  <circle cx="5" cy="19" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                  <circle cx="19" cy="19" r="1.5" />
                </svg>

                <select
                  value={appCode}
                  disabled={!isValidated}
                  onChange={(e) => setAppCode(e.target.value)}
                  style={{
                    width: '100%',
                    minWidth: 0,
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    fontFamily: '"Source Sans 3"',
                    background: 'transparent',
                    color: appCode ? '#333' : '#94A3B8',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    cursor: isValidated ? 'pointer' : 'not-allowed',
                    // padding: '0 32px 0 0',
                    padding: '0 40px 0 16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" style={{ padding: '10px' }}>
                    Select Application Code
                  </option>

                  {Array.isArray(appCodes) &&
                    appCodes.map((code) => (
                      <option key={code} value={code} style={{ padding: '10px' }} >
                        {code}
                      </option>
                    ))}
                </select>
                <div
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}
                >

                  {/* Custom Arrow */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'not-allowed',
                fontSize: '14px',
                fontFamily: '"Source Sans 3"',
                color: '#333',
                opacity: 0.7
              }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  disabled
                  onChange={() => setRememberMe(!rememberMe)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'not-allowed'
                  }}
                />
                Remember me
              </label>
              <button
                disabled
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#B0BEC5',
                  cursor: 'not-allowed',
                  fontSize: '14px',
                  fontFamily: '"Source Sans 3"',
                  fontWeight: '600',
                  opacity: 0.7
                }}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div style={{
                color: 'red',
                fontSize: '14px',
                marginBottom: '8px'
              }}>
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              onClick={handleLogin}
              style={{
                padding: '16px 0',
                width: '100%',
                borderRadius: '6px',
                background: '#0079C2',
                color: '#FFF',
                height: '56px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
                fontSize: '16px',
                fontFamily: '"Source Sans 3"',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              Sign in
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Request access */}
          <div style={{
            width: '100%',
            textAlign: 'center',
            padding: '0 57px 57px 57px',
            fontSize: '14px',
            fontFamily: '"Source Sans 3"',
            color: '#4D4D4D'
          }}>
            New agent?{' '}
            <a
    href="https://aedl-dashboard.edl.prod.awsdns.internal.das/write-mode/genai/agent-config"
    target="_blank"
    rel="noopener noreferrer" 
    style={{
              background: 'none',
              border: 'none',
              color: '#0079C2',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              Request access
             </a>
          </div>
        </div>
      </div>
    </div>
  )
}
