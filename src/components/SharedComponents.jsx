// // --- Shared Icon Components ---
// import { Link, useNavigate } from "react-router-dom";
// import Header from "./Header";

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
//    <Header />
//   );
// }

// // --- Default step configs ---
// const CORTEX_STEPS = [
//   { num: 1, label: <>Agent Profile &<br />Resources</> },
//   { num: 2, label: <>Tools &<br />Orchestration</> },
//   { num: 3, label: <>Deployment</> },
// ];

// const LANGGRAPH_STEPS = [
//   { num: 1, label: <>Agent Profile</> },
//   { num: 2, label: <>Memory<br />Configuration</> },
//   { num: 3, label: <>Tools &<br />Orchestration</> },
//   { num: 4, label: <>API & UI</> },
//   { num: 5, label: <>Deployment</> },
// ];

// export { CORTEX_STEPS, LANGGRAPH_STEPS };

// // --- Stepper ---
// // Pass steps prop to override default 3-step Cortex flow
// export function Stepper({ activeStep = 1, steps = CORTEX_STEPS }) {
//   const LINE_WIDTH = 120;
//   const LABEL_WIDTH = 120;

//   const getCircle = (step) => {
//     if (step.num < activeStep) {
//       return <CheckCircleStep />;
//     }
//     if (step.num === activeStep) {
//       return (
//         <div
//           className="flex items-center justify-center rounded-full font-semibold"
//           style={{
//             width: 32, height: 32,
//             backgroundColor: "#0072C6", color: "#FFFFFF",
//             fontSize: 14, flexShrink: 0,
//           }}
//         >
//           {step.num}
//         </div>
//       );
//     }
//     return (
//       <div
//         className="flex items-center justify-center rounded-full font-semibold"
//         style={{
//           width: 32, height: 32,
//           backgroundColor: "transparent",
//           border: "2px solid #B0BEC5", color: "#78909C",
//           fontSize: 14, flexShrink: 0,
//         }}
//       >
//         {step.num}
//       </div>
//     );
//   };

//   const getLineColor = (index) => {
//     return (index + 1 <= activeStep) ? "#0072C6" : "#B0BEC5";
//   };

//   return (
//     <div className="flex justify-center pt-6 pb-4">
//       <div style={{ paddingBottom: 40 }}>
//         {/* Circles and lines */}
//         <div className="flex items-center">
//           {steps.map((step, i) => (
//             <div key={step.num} className="flex items-center" style={{ position: "relative" }}>
//               {getCircle(step)}
//               {/* Label positioned absolutely, centered under circle */}
//               <div
//                 style={{
//                   position: "absolute",
//                   top: 40,
//                   left: 16,
//                   transform: "translateX(-50%)",
//                   width: LABEL_WIDTH,
//                   textAlign: "center",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: 13,
//                     color: step.num <= activeStep ? "#0072C6" : "#78909C",
//                     fontWeight: step.num <= activeStep ? 600 : 400,
//                     lineHeight: 1.3,
//                     display: "inline-block",
//                   }}
//                 >
//                   {step.label}
//                 </span>
//               </div>
//               {/* Connector line */}
//               {i < steps.length - 1 && (
//                 <div style={{ width: LINE_WIDTH, height: 2, backgroundColor: getLineColor(i) }} />
//               )}
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
//       <Link
//         to="/dashboard"
//         className="text-sm font-medium inline-flex items-center"
//         style={{ color: "#0072C6", textDecoration: "none" }}
//       >
//         <ArrowLeft />
//         Back to Dashboard
//       </Link>
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

// // --- Spinner ---
// const Spinner = () => (
//   <svg
//     className="animate-spin"
//     width="16"
//     height="16"
//     viewBox="0 0 16 16"
//     fill="none"
//     style={{ marginRight: 6 }}
//   >
//     <circle cx="8" cy="8" r="6.5" stroke="white" strokeWidth="2.5" opacity="0.3" />
//     <path
//       d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
//       stroke="white"
//       strokeWidth="2.5"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// // --- Footer Buttons ---
// // Props:
// //   buttons: Array of { label, onClick, variant, disabled }
// //     variant: "outline" | "disabled-outline" | "primary"
// //   loading: boolean — shows spinner on the primary button when true
// //
// // Example usage:
// //   <FooterButtons
// //     loading={isSaving}
// //     buttons={[
// //       { label: "Discard", variant: "outline", onClick: handleDiscard },
// //       { label: "Save as Draft", variant: "outline", onClick: handleDraft },
// //       { label: "Save & Continue", variant: "primary", onClick: handleSave },
// //     ]}
// //   />
// export function FooterButtons({ buttons = [], loading = false }) {
//   const getButtonStyle = (variant, disabled) => {
//     if (variant === "primary") {
//       return {
//         color: "#FFFFFF",
//         backgroundColor: loading ? "#5BA3D9" : "#0072C6",
//         border: "1.5px solid #0072C6",
//         cursor: loading ? "not-allowed" : "pointer",
//         opacity: loading ? 0.85 : 1,
//       };
//     }
//     if (variant === "disabled-outline" || disabled) {
//       return {
//         color: "#B0BEC5",
//         border: "1.5px solid #CFD8DC",
//         backgroundColor: "transparent",
//         cursor: "not-allowed",
//       };
//     }
//     // outline (default)
//     return {
//       color: "#0072C6",
//       border: "1.5px solid #0072C6",
//       backgroundColor: "transparent",
//       cursor: "pointer",
//     };
//   };

//   return (
//     <div className="flex items-center justify-end gap-3 py-6 px-2">
//       {buttons.map((btn, i) => (
//         <button
//           key={i}
//           className="px-6 py-2.5 rounded-full text-sm font-medium inline-flex items-center justify-center"
//           style={getButtonStyle(btn.variant, btn.disabled)}
//           disabled={btn.disabled || (btn.variant === "primary" && loading)}
//           onClick={btn.onClick}
//         >
//           {btn.variant === "primary" && loading && <Spinner />}
//           {btn.label}
//         </button>
//       ))}
//     </div>
//   );
// }


// --- Shared Icon Components ---
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

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
   <Header />
  );
}

// --- Default step configs ---
const CORTEX_STEPS = [
  { num: 1, label: <>Agent Profile &<br />Resources</> },
  { num: 2, label: <>Tools &<br />Orchestration</> },
  { num: 3, label: <>Deployment</> },
];

const LANGGRAPH_STEPS = [
  { num: 1, label: <>Agent Profile</> },
  { num: 2, label: <>Memory<br />Configuration</> },
  { num: 3, label: <>Tools &<br />Orchestration</> },
  { num: 4, label: <>API & UI</> },
  { num: 5, label: <>Deployment</> },
];

export { CORTEX_STEPS, LANGGRAPH_STEPS };

// --- Stepper ---
// Pass steps prop to override default 3-step Cortex flow
export function Stepper({ activeStep = 1, steps = CORTEX_STEPS }) {
  const LINE_WIDTH = 120;
  const LABEL_WIDTH = 120;

  const getCircle = (step) => {
    if (step.num < activeStep) {
      return <CheckCircleStep />;
    }
    if (step.num === activeStep) {
      return (
        <div
          className="flex items-center justify-center rounded-full font-semibold"
          style={{
            width: 32, height: 32,
            backgroundColor: "#0072C6", color: "#FFFFFF",
            fontSize: 14, flexShrink: 0,
          }}
        >
          {step.num}
        </div>
      );
    }
    return (
      <div
        className="flex items-center justify-center rounded-full font-semibold"
        style={{
          width: 32, height: 32,
          backgroundColor: "transparent",
          border: "2px solid #B0BEC5", color: "#78909C",
          fontSize: 14, flexShrink: 0,
        }}
      >
        {step.num}
      </div>
    );
  };

  const getLineColor = (index) => {
    return (index + 1 <= activeStep) ? "#0072C6" : "#B0BEC5";
  };

  return (
    <div className="flex justify-center pt-6 pb-4">
      <div style={{ paddingBottom: 40 }}>
        {/* Circles and lines */}
        <div className="flex items-center">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center" style={{ position: "relative" }}>
              {getCircle(step)}
              {/* Label positioned absolutely, centered under circle */}
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 16,
                  transform: "translateX(-50%)",
                  width: LABEL_WIDTH,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: step.num <= activeStep ? "#0072C6" : "#78909C",
                    fontWeight: step.num <= activeStep ? 600 : 400,
                    lineHeight: 1.3,
                    display: "inline-block",
                  }}
                >
                  {step.label}
                </span>
              </div>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{ width: LINE_WIDTH, height: 2, backgroundColor: getLineColor(i) }} />
              )}
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
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: "#F0F2F5",
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Navbar />
      <main className="px-6 w-full flex-1">
        {children}
      </main>
      {/* Copyright - always at bottom */}
      <div className="text-center py-4">
        <span className="text-xs" style={{ color: "#90A4AE" }}>
          © 2026 Elevance Health Agent Studio. All rights reserved.
        </span>
      </div>
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