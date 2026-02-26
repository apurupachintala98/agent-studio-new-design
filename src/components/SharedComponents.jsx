// // --- Shared Icon Components ---
// import Header from "../components/Header";

// export const ArrowLeft = () => (
//   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}>
//     <path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const CheckCircleStep = () => (
//   <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
//     <circle cx="16" cy="16" r="15" fill="#0072C6" stroke="#0072C6" strokeWidth="2" />
//     <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // --- Navbar ---
// export function Navbar() {
//   return (
//      <Header/>
//   );
// }

// // --- Stepper ---
// export function Stepper({ activeStep = 1 }) {
//   const steps = [
//     { num: 1, label: <>Agent Profile &<br />Resources</> },
//     { num: 2, label: <>Tools &<br />Orchestration</> },
//     { num: 3, label: <>Deployment</> },
//   ];

//   const renderCircle = (step) => {
//     if (step.num < activeStep) {
//       // Completed
//       return <CheckCircleStep />;
//     }
//     if (step.num === activeStep) {
//       // Active
//       return (
//         <div
//           className="flex items-center justify-center rounded-full font-semibold"
//           style={{
//             width: 32,
//             height: 32,
//             backgroundColor: "#0072C6",
//             color: "#FFFFFF",
//             fontSize: 14,
//             flexShrink: 0,
//           }}
//         >
//           {step.num}
//         </div>
//       );
//     }
//     // Upcoming
//     return (
//       <div
//         className="flex items-center justify-center rounded-full font-semibold"
//         style={{
//           width: 32,
//           height: 32,
//           backgroundColor: "transparent",
//           border: "2px solid #B0BEC5",
//           color: "#78909C",
//           fontSize: 14,
//           flexShrink: 0,
//         }}
//       >
//         {step.num}
//       </div>
//     );
//   };

//   return (
//     <div className="flex justify-center pt-6 pb-4">
//       <div className="flex flex-col items-center">
//         {/* Circles and lines row */}
//         <div className="flex items-center">
//           {steps.map((step, i) => (
//             <div key={step.num} className="flex items-center">
//               {renderCircle(step)}
//               {i < steps.length - 1 && (
//                 <div style={{ width: 120, height: 2, backgroundColor: "#B0BEC5" }} />
//               )}
//             </div>
//           ))}
//         </div>
//         {/* Labels row */}
//         <div className="flex items-start" style={{ marginTop: 8 }}>
//           {steps.map((step) => (
//             <div key={step.num} className="text-center" style={{ width: step.num === 2 ? 152 : 130 }}>
//               <span
//                 style={{
//                   fontSize: 13,
//                   color: step.num === activeStep ? "#0072C6" : "#78909C",
//                   fontWeight: step.num === activeStep ? 600 : 400,
//                   lineHeight: 1.3,
//                   display: "inline-block",
//                 }}
//               >
//                 {step.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Back to Dashboard ---
// export function BackToDashboard() {
//   return (
//     <div className="pt-4 pb-1">
//       <a
//         href="/dashboard"
//         className="text-sm font-medium inline-flex items-center"
//         style={{ color: "#0072C6", textDecoration: "none" }}
//       >
//         <ArrowLeft />
//         Back to Dashboard
//       </a>
//     </div>
//   );
// }

// // --- Section Header ---
// export function SectionHeader({ children }) {
//   return (
//     <h2
//       className="font-semibold mb-3"
//       style={{
//         fontSize: 15,
//         color: "#1A1A1A",
//       }}
//     >
//       {children}
//     </h2>
//   );
// }

// // --- Page Layout Wrapper ---
// export function PageLayout({ children }) {
//   return (
//     <div
//       className="min-h-screen"
//       style={{
//         backgroundColor: "#F0F2F5",
//         fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
//       }}
//     >
//       <Navbar />
//       <main className="px-6 pb-6">
//         {children}
//         {/* Copyright */}
//         <div className="text-center pb-4">
//           <span className="text-xs" style={{ color: "#90A4AE" }}>
//             © 2024 Elevance Health Agent Studio. All rights reserved.
//           </span>
//         </div>
//       </main>
//     </div>
//   );
// }

// --- Shared Icon Components ---
import { Link, useNavigate } from "react-router-dom";

export const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}>
    <path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="#0072C6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckCircleStep = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" fill="#0072C6" stroke="#0072C6" strokeWidth="2" />
    <path d="M10 16.5L14 20.5L22 12.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Navbar ---
export function Navbar() {
  return (
    <header
      className="relative flex items-center justify-between px-6 bg-white"
      style={{
        height: 56,
        borderBottom: "1px solid #E0E0E0",
        overflow: "hidden",
      }}
    >
      {/* Decorative lines top-right */}
      <svg
        className="absolute top-0 right-0"
        width="320"
        height="56"
        viewBox="0 0 320 56"
        fill="none"
        style={{ pointerEvents: "none" }}
      >
        <line x1="160" y1="-20" x2="320" y2="56" stroke="#D6E4ED" strokeWidth="1" />
        <line x1="180" y1="-20" x2="340" y2="56" stroke="#D6E4ED" strokeWidth="1" />
        <line x1="200" y1="-20" x2="360" y2="56" stroke="#D6E4ED" strokeWidth="1" />
        <line x1="220" y1="-20" x2="380" y2="56" stroke="#D6E4ED" strokeWidth="1" />
        <line x1="140" y1="56" x2="280" y2="-10" stroke="#D6E4ED" strokeWidth="1" />
        <line x1="160" y1="56" x2="300" y2="-10" stroke="#D6E4ED" strokeWidth="1" />
      </svg>

      <div className="flex items-center gap-3 z-10">
        <div className="flex flex-col leading-none" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 300,
              color: "#003366",
              letterSpacing: "-0.5px",
              lineHeight: 1,
            }}
          >
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>E</span>levance
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#003366",
              letterSpacing: "1.5px",
              marginTop: 1,
              paddingLeft: 2,
            }}
          >
            Health
          </span>
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 300,
            color: "#263238",
            letterSpacing: "3px",
            marginLeft: 12,
            textTransform: "uppercase",
          }}
        >
          AGENT STUDIO
        </span>
      </div>

      <nav className="flex items-center gap-8 z-10">
        <a
          href="#"
          className="text-sm"
          style={{
            color: "#263238",
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "2px solid #263238",
            paddingBottom: 2,
          }}
        >
          My Agents
        </a>
        <a href="#" className="text-sm" style={{ color: "#546E7A", textDecoration: "none" }}>
          Reference
        </a>
        <a href="#" className="text-sm" style={{ color: "#546E7A", textDecoration: "none" }}>
          Contact Us
        </a>
      </nav>
    </header>
  );
}

// --- Stepper ---
// activeStep: 1 = Agent Profile, 2 = Tools, 3 = Deployment
export function Stepper({ activeStep = 1 }) {
  const steps = [
    { num: 1, label: <>Agent Profile &<br />Resources</> },
    { num: 2, label: <>Tools &<br />Orchestration</> },
    { num: 3, label: <>Deployment</> },
  ];

  const renderCircle = (step) => {
    if (step.num < activeStep) {
      // Completed
      return <CheckCircleStep />;
    }
    if (step.num === activeStep) {
      // Active
      return (
        <div
          className="flex items-center justify-center rounded-full font-semibold"
          style={{
            width: 32,
            height: 32,
            backgroundColor: "#0072C6",
            color: "#FFFFFF",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {step.num}
        </div>
      );
    }
    // Upcoming
    return (
      <div
        className="flex items-center justify-center rounded-full font-semibold"
        style={{
          width: 32,
          height: 32,
          backgroundColor: "transparent",
          border: "2px solid #B0BEC5",
          color: "#78909C",
          fontSize: 14,
          flexShrink: 0,
        }}
      >
        {step.num}
      </div>
    );
  };

  return (
    <div className="flex justify-center pt-6 pb-4">
      <div className="flex flex-col items-center">
        {/* Circles and lines row */}
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center">
              {renderCircle(step)}
              {i < steps.length - 1 && (
                <div style={{ width: 120, height: 2, backgroundColor: "#B0BEC5" }} />
              )}
            </div>
          ))}
        </div>
        {/* Labels row */}
        <div className="flex items-start" style={{ marginTop: 8 }}>
          {steps.map((step) => (
            <div key={step.num} className="text-center" style={{ width: step.num === 2 ? 152 : 130 }}>
              <span
                style={{
                  fontSize: 13,
                  color: step.num === activeStep ? "#0072C6" : "#78909C",
                  fontWeight: step.num === activeStep ? 600 : 400,
                  lineHeight: 1.3,
                  display: "inline-block",
                }}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Back to Dashboard ---
export function BackToDashboard() {
  return (
    <div className="pt-4 pb-1">
      <Link
        to="/dashboard"
        className="text-sm font-medium inline-flex items-center"
        style={{ color: "#0072C6", textDecoration: "none" }}
      >
        <ArrowLeft />
        Back to Dashboard
      </Link>
    </div>
  );
}

// --- Section Header ---
export function SectionHeader({ children }) {
  return (
    <h2
      className="font-semibold mb-3"
      style={{
        fontSize: 15,
        color: "#1A1A1A",
      }}
    >
      {children}
    </h2>
  );
}

// --- Page Layout Wrapper ---
export function PageLayout({ children }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F0F2F5",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Navbar />
      <main className="px-6 pb-6">
        {children}
        {/* Copyright */}
        <div className="text-center pb-4">
          <span className="text-xs" style={{ color: "#90A4AE" }}>
            © 2024 Elevance Health Agent Studio. All rights reserved.
          </span>
        </div>
      </main>
    </div>
  );
}

// --- Spinner ---
const Spinner = () => (
  <svg
    className="animate-spin"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ marginRight: 6 }}
  >
    <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="2.5" opacity="0.3" />
    <path
      d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// --- Footer Buttons ---
// Props:
//   buttons: Array of { label, onClick, variant, disabled }
//     variant: "outline" | "disabled-outline" | "primary"
//   loading: boolean — shows spinner on the primary button when true
//
// Example usage:
//   <FooterButtons
//     loading={isSaving}
//     buttons={[
//       { label: "Discard", variant: "outline", onClick: handleDiscard },
//       { label: "Save as Draft", variant: "outline", onClick: handleDraft },
//       { label: "Save & Continue", variant: "primary", onClick: handleSave },
//     ]}
//   />
export function FooterButtons({ buttons = [], loading = false }) {
  const getButtonStyle = (variant, disabled) => {
    if (variant === "primary") {
      return {
        color: "#FFFFFF",
        backgroundColor: loading ? "#5BA3D9" : "#0072C6",
        border: "1.5px solid #0072C6",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.85 : 1,
      };
    }
    if (variant === "disabled-outline" || disabled) {
      return {
        color: "#B0BEC5",
        border: "1.5px solid #CFD8DC",
        backgroundColor: "transparent",
        cursor: "not-allowed",
      };
    }
    // outline (default)
    return {
      color: "#0072C6",
      border: "1.5px solid #0072C6",
      backgroundColor: "transparent",
      cursor: "pointer",
    };
  };

  return (
    <div className="flex items-center justify-end gap-3 py-6 px-2">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center justify-center"
          style={getButtonStyle(btn.variant, btn.disabled)}
          disabled={btn.disabled || (btn.variant === "primary" && loading)}
          onClick={btn.onClick}
        >
          {btn.variant === "primary" && loading && <Spinner />}
          {btn.label}
        </button>
      ))}
    </div>
  );
}
