// import { useState } from "react";
// import {
//   PageLayout,
//   BackToDashboard,
//   Stepper,
//   SectionHeader,
// } from "./SharedComponents";

// // --- Icon Components ---
// const InfoIcon = () => (
//   <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="10" cy="10" r="9" stroke="#0072C6" strokeWidth="1.5" fill="none" />
//     <text x="10" y="14.5" textAnchor="middle" fill="#0072C6" fontSize="12" fontWeight="600" fontFamily="sans-serif">i</text>
//   </svg>
// );

// const CheckCircle = () => (
//   <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//     <circle cx="11" cy="11" r="11" fill="#2E8540" />
//     <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const ChevronDown = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const PencilIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//     <path d="M10.5 1.5L12.5 3.5L4 12H2V10L10.5 1.5Z" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// // --- Agent Profile Card ---
// function AgentProfileCard() {
//   return (
//     <div
//       className="rounded-lg bg-white overflow-hidden"
//       style={{
//         border: "1px solid #E0E0E0",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//       }}
//     >
//       {/* Banner flush to top of card */}
//       <div
//         className="flex items-start gap-3 px-5 py-3.5"
//         style={{
//           backgroundColor: "#EBF5FB",
//           borderBottom: "1px solid #B3D9F2",
//         }}
//       >
//         <div className="mt-0.5 flex-shrink-0">
//           <InfoIcon />
//         </div>
//         <div className="text-sm leading-relaxed">
//           <span className="font-semibold" style={{ color: "#003366" }}>
//             Configuration Note
//           </span>
//           <br />
//           <span style={{ color: "#455A64" }}>
//             The Agent Name and Description are locked by the workspace administrator to maintain organizational standards. System Instructions can be tuned for specific behavior.
//           </span>
//         </div>
//       </div>

//       {/* Avatar section */}
//       <div className="px-5 pt-6 pb-2">
//         <div className="flex items-start gap-5">
//           <div className="relative flex-shrink-0">
//             <div
//               className="rounded-lg overflow-hidden"
//               style={{
//                 width: 80,
//                 height: 80,
//                 background: "linear-gradient(135deg, #C4983A 0%, #9E822F 60%, #6B5A20 100%)",
//               }}
//             >
//               <div className="w-full h-full flex items-center justify-center">
//                 <svg width="50" height="50" viewBox="0 0 50 50">
//                   <rect x="12" y="18" width="22" height="20" rx="3" fill="#FFF8DC" stroke="#B8860B" strokeWidth="1.5" />
//                   <path d="M34 24H38C40 24 41 26 41 28C41 30 40 32 38 32H34" fill="none" stroke="#B8860B" strokeWidth="1.5" />
//                   <ellipse cx="23" cy="18" rx="11" ry="2" fill="#8B4513" opacity="0.6" />
//                   <path d="M18 14C18 12 20 10 20 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
//                   <path d="M23 12C23 10 25 8 25 8" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
//                   <path d="M28 14C28 12 30 10 30 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
//                 </svg>
//               </div>
//             </div>
//             <div
//               className="absolute flex items-center justify-center rounded-full bg-white"
//               style={{
//                 width: 24, height: 24, bottom: -4, right: -4,
//                 border: "1px solid #CFD8DC",
//                 boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//               }}
//             >
//               <PencilIcon />
//             </div>
//           </div>

//           <div>
//             <h3 className="font-semibold text-base" style={{ color: "#1A1A1A" }}>Agent Avatar</h3>
//             <p className="text-sm mt-0.5" style={{ color: "#78909C" }}>
//               Upload a custom image or generate one using DALL·E 3.
//             </p>
//             <button
//               className="mt-3 px-5 py-2 rounded-full text-white text-sm font-medium"
//               style={{ backgroundColor: "#0072C6" }}
//             >
//               Upload Image
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Form fields */}
//       <div className="px-5 pt-5 pb-2">
//         <div className="flex gap-8">
//           <div className="flex-1">
//             <div className="flex items-center">
//               <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Name</label>
//               <input
//                 type="text" defaultValue="HR - Assistant - 01" disabled
//                 className="flex-1 px-3 py-2.5 text-sm rounded-sm"
//                 style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
//               />
//             </div>
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center">
//               <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#37474F", fontWeight: 600 }}>Model Selection</label>
//               <div className="relative flex-1">
//                 <select
//                   className="w-full px-3 py-2.5 text-sm appearance-none rounded-sm pr-8"
//                   style={{ color: "#37474F", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none" }}
//                   defaultValue="HR - Assistant - 01"
//                 >
//                   <option>HR - Assistant - 01</option>
//                 </select>
//                 <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center">
//           <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Description</label>
//           <input
//             type="text" defaultValue="A specialized data agent for HR analytics and policy information retrieval." disabled
//             className="flex-1 px-3 py-2.5 text-sm rounded-sm"
//             style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
//           />
//         </div>

//         <div className="mt-6 flex items-start">
//           <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#37474F", fontWeight: 500 }}>System Instruction</label>
//           <textarea
//             className="flex-1 rounded-sm p-3 text-sm resize-none" rows={6}
//             style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
//           />
//         </div>
//       </div>

//       <div className="flex justify-end px-5 py-4">
//         <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>View More</a>
//       </div>
//     </div>
//   );
// }

// // --- Application Configuration Card ---
// function AppConfigCard() {
//   return (
//     <div
//       className="rounded-lg bg-white overflow-hidden"
//       style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
//     >
//       <div
//         className="flex items-start gap-3 px-5 py-3.5"
//         style={{ backgroundColor: "#EBF5FB", borderBottom: "1px solid #B3D9F2" }}
//       >
//         <div className="mt-0.5 flex-shrink-0"><InfoIcon /></div>
//         <div className="text-sm leading-relaxed" style={{ color: "#455A64" }}>
//           These settings were configured during agent registration and cannot be modified.{" "}
//           <a href="#" style={{ color: "#0072C6", textDecoration: "none", fontWeight: 500 }}>Contact admin</a> to update
//         </div>
//       </div>

//       <div className="px-5 pt-5 pb-2">
//         <div className="flex gap-6">
//           <div className="flex-1">
//             <div className="flex items-center gap-3">
//               <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Snowflake Database</label>
//               <input type="text" defaultValue="PROD_ANALYTICS_DB" disabled
//                 className="flex-1 px-3 py-2.5 text-sm rounded-md"
//                 style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
//               />
//             </div>
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center gap-3">
//               <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Database Schema</label>
//               <input type="text" defaultValue="CUSTOMER_SERVICE" disabled
//                 className="flex-1 px-3 py-2.5 text-sm rounded-md"
//                 style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between px-5 py-4">
//         <div className="flex items-center gap-2">
//           <CheckCircle />
//           <span className="text-sm font-semibold" style={{ color: "#00695C" }}>Connected to Snowflake</span>
//         </div>
//         <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>View Connection Detail</a>
//       </div>
//     </div>
//   );
// }

// // --- Resources Card ---
// function ResourcesCard() {
//   const [toolChoice, setToolChoice] = useState("auto");

//   return (
//     <div
//       className="rounded-lg bg-white"
//       style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
//     >
//       <div className="px-5 py-5">
//         <div className="mb-4">
//           <label className="text-xs font-medium block mb-2.5" style={{ color: "#546E7A" }}>Tool Choice Strategy</label>
//           <div className="flex">
//             <button
//               className="px-6 py-2 text-sm font-medium rounded-l-md"
//               style={{
//                 backgroundColor: toolChoice === "auto" ? "#0072C6" : "#FFFFFF",
//                 color: toolChoice === "auto" ? "#FFFFFF" : "#546E7A",
//                 border: `1px solid ${toolChoice === "auto" ? "#0072C6" : "#CFD8DC"}`,
//               }}
//               onClick={() => setToolChoice("auto")}
//             >Auto</button>
//             <button
//               className="px-6 py-2 text-sm font-medium rounded-r-md"
//               style={{
//                 backgroundColor: toolChoice === "required" ? "#0072C6" : "#FFFFFF",
//                 color: toolChoice === "required" ? "#FFFFFF" : "#546E7A",
//                 border: `1px solid ${toolChoice === "required" ? "#0072C6" : "#CFD8DC"}`,
//                 borderLeft: "none",
//               }}
//               onClick={() => setToolChoice("required")}
//             >Required</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Footer Buttons ---
// function FooterButtons() {
//   return (
//     <div className="flex items-center justify-end gap-3 py-6 px-2">
//       <button className="px-6 py-2.5 rounded-full text-sm font-medium"
//         style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent" }}>Discard</button>
//       <button className="px-6 py-2.5 rounded-full text-sm font-medium"
//         style={{ color: "#0072C6", border: "1.5px solid #0072C6", backgroundColor: "transparent" }}>Save as Draft</button>
//       <button className="px-6 py-2.5 rounded-full text-sm font-medium text-white"
//         style={{ backgroundColor: "#0072C6", border: "1.5px solid #0072C6" }}>Save & Continue</button>
//     </div>
//   );
// }

// // --- Main Page ---
// export default function AgentProfile() {
//   return (
//     <PageLayout>
//       <BackToDashboard />
//       <Stepper activeStep={1} />

//       <div className="mt-5">
//         <SectionHeader>Agent Profile</SectionHeader>
//         <AgentProfileCard />
//       </div>

//       <div className="mt-7">
//         <SectionHeader>Application Configuration</SectionHeader>
//         <AppConfigCard />
//       </div>

//       <div className="mt-7">
//         <SectionHeader>Resources</SectionHeader>
//         <ResourcesCard />
//       </div>

//       <FooterButtons />
//     </PageLayout>
//   );
// }


import { useState } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "./SharedComponents";

// --- Icon Components ---
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="#0072C6" strokeWidth="1.5" fill="none" />
    <text x="10" y="14.5" textAnchor="middle" fill="#0072C6" fontSize="12" fontWeight="600" fontFamily="sans-serif">i</text>
  </svg>
);

const CheckCircle = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="11" fill="#2E8540" />
    <path d="M6.5 11.5L9.5 14.5L15.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M10.5 1.5L12.5 3.5L4 12H2V10L10.5 1.5Z" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Agent Profile Card ---
function AgentProfileCard() {
  return (
    <div
      className="rounded-lg bg-white overflow-hidden"
      style={{
        border: "1px solid #E0E0E0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Banner flush to top of card */}
      <div
        className="flex items-start gap-3 px-5 py-3.5"
        style={{
          backgroundColor: "#EBF5FB",
          borderBottom: "1px solid #B3D9F2",
        }}
      >
        <div className="mt-0.5 flex-shrink-0">
          <InfoIcon />
        </div>
        <div className="text-sm leading-relaxed">
          <span className="font-semibold" style={{ color: "#003366" }}>
            Configuration Note
          </span>
          <br />
          <span style={{ color: "#455A64" }}>
            The Agent Name and Description are locked by the workspace administrator to maintain organizational standards. System Instructions can be tuned for specific behavior.
          </span>
        </div>
      </div>

      {/* Avatar section */}
      <div className="px-5 pt-6 pb-2">
        <div className="flex items-start gap-5">
          <div className="relative flex-shrink-0">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #C4983A 0%, #9E822F 60%, #6B5A20 100%)",
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <rect x="12" y="18" width="22" height="20" rx="3" fill="#FFF8DC" stroke="#B8860B" strokeWidth="1.5" />
                  <path d="M34 24H38C40 24 41 26 41 28C41 30 40 32 38 32H34" fill="none" stroke="#B8860B" strokeWidth="1.5" />
                  <ellipse cx="23" cy="18" rx="11" ry="2" fill="#8B4513" opacity="0.6" />
                  <path d="M18 14C18 12 20 10 20 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M23 12C23 10 25 8 25 8" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M28 14C28 12 30 10 30 10" stroke="#DDD" strokeWidth="1" fill="none" opacity="0.5" />
                </svg>
              </div>
            </div>
            <div
              className="absolute flex items-center justify-center rounded-full bg-white"
              style={{
                width: 24, height: 24, bottom: -4, right: -4,
                border: "1px solid #CFD8DC",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              <PencilIcon />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base" style={{ color: "#1A1A1A" }}>Agent Avatar</h3>
            <p className="text-sm mt-0.5" style={{ color: "#78909C" }}>
              Upload a custom image or generate one using DALL·E 3.
            </p>
            <button
              className="mt-3 px-5 py-2 rounded-full text-white text-sm font-medium"
              style={{ backgroundColor: "#0072C6" }}
            >
              Upload Image
            </button>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="flex items-center">
              <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Name</label>
              <input
                type="text" defaultValue="HR - Assistant - 01" disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-sm"
                style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#37474F", fontWeight: 600 }}>Model Selection</label>
              <div className="relative flex-1">
                <select
                  className="w-full px-3 py-2.5 text-sm appearance-none rounded-sm pr-8"
                  style={{ color: "#37474F", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none" }}
                  defaultValue="HR - Assistant - 01"
                >
                  <option>HR - Assistant - 01</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <label className="text-sm flex-shrink-0 pr-3" style={{ color: "#C0C8CC" }}>Agent Description</label>
          <input
            type="text" defaultValue="A specialized data agent for HR analytics and policy information retrieval." disabled
            className="flex-1 px-3 py-2.5 text-sm rounded-sm"
            style={{ color: "#A0AEB5", backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", cursor: "not-allowed" }}
          />
        </div>

        <div className="mt-6 flex items-start">
          <label className="text-sm flex-shrink-0 pr-3 pt-3" style={{ color: "#37474F", fontWeight: 500 }}>System Instruction</label>
          <textarea
            className="flex-1 rounded-sm p-3 text-sm resize-none" rows={6}
            style={{ backgroundColor: "#F5F7F8", border: "1px solid #ECEFF1", outline: "none", color: "#263238" }}
          />
        </div>
      </div>

      <div className="flex justify-end px-5 py-4">
        <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>View More</a>
      </div>
    </div>
  );
}

// --- Application Configuration Card ---
function AppConfigCard() {
  return (
    <div
      className="rounded-lg bg-white overflow-hidden"
      style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div
        className="flex items-start gap-3 px-5 py-3.5"
        style={{ backgroundColor: "#EBF5FB", borderBottom: "1px solid #B3D9F2" }}
      >
        <div className="mt-0.5 flex-shrink-0"><InfoIcon /></div>
        <div className="text-sm leading-relaxed" style={{ color: "#455A64" }}>
          These settings were configured during agent registration and cannot be modified.{" "}
          <a href="#" style={{ color: "#0072C6", textDecoration: "none", fontWeight: 500 }}>Contact admin</a> to update
        </div>
      </div>

      <div className="px-5 pt-5 pb-2">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Snowflake Database</label>
              <input type="text" defaultValue="PROD_ANALYTICS_DB" disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-md"
                style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="text-xs font-medium" style={{ color: "#90A4AE", whiteSpace: "nowrap" }}>Database Schema</label>
              <input type="text" defaultValue="CUSTOMER_SERVICE" disabled
                className="flex-1 px-3 py-2.5 text-sm rounded-md"
                style={{ color: "#78909C", backgroundColor: "#F5F7FA", border: "1px solid #E0E0E0", outline: "none", cursor: "not-allowed" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle />
          <span className="text-sm font-semibold" style={{ color: "#00695C" }}>Connected to Snowflake</span>
        </div>
        <a href="#" className="text-sm font-medium" style={{ color: "#0072C6", textDecoration: "none" }}>View Connection Detail</a>
      </div>
    </div>
  );
}

// --- Resources Card ---
function ResourcesCard() {
  const [toolChoice, setToolChoice] = useState("auto");

  return (
    <div
      className="rounded-lg bg-white"
      style={{ border: "1px solid #E0E0E0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="px-5 py-5">
        <div className="mb-4">
          <label className="text-xs font-medium block mb-2.5" style={{ color: "#546E7A" }}>Tool Choice Strategy</label>
          <div className="flex">
            <button
              className="px-6 py-2 text-sm font-medium rounded-l-md"
              style={{
                backgroundColor: toolChoice === "auto" ? "#0072C6" : "#FFFFFF",
                color: toolChoice === "auto" ? "#FFFFFF" : "#546E7A",
                border: `1px solid ${toolChoice === "auto" ? "#0072C6" : "#CFD8DC"}`,
              }}
              onClick={() => setToolChoice("auto")}
            >Auto</button>
            <button
              className="px-6 py-2 text-sm font-medium rounded-r-md"
              style={{
                backgroundColor: toolChoice === "required" ? "#0072C6" : "#FFFFFF",
                color: toolChoice === "required" ? "#FFFFFF" : "#546E7A",
                border: `1px solid ${toolChoice === "required" ? "#0072C6" : "#CFD8DC"}`,
                borderLeft: "none",
              }}
              onClick={() => setToolChoice("required")}
            >Required</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function AgentProfile({ onSaveAndContinue }) {
  const [isSaving, setIsSaving] = useState(false);

  const handleDiscard = () => {
    console.log("Discard clicked");
  };

  const handleSaveDraft = () => {
    console.log("Save as Draft clicked");
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      // Save form data here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSaveAndContinue();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="mt-5">
        <SectionHeader>Agent Profile</SectionHeader>
        <AgentProfileCard />
      </div>

      <div className="mt-7">
        <SectionHeader>Application Configuration</SectionHeader>
        <AppConfigCard />
      </div>

      <div className="mt-7">
        <SectionHeader>Resources</SectionHeader>
        <ResourcesCard />
      </div>

      <FooterButtons
        loading={isSaving}
        buttons={[
          { label: "Discard", variant: "outline", onClick: handleDiscard },
          { label: "Save as Draft", variant: "outline", onClick: handleSaveDraft },
          { label: "Save & Continue", variant: "primary", onClick: handleSaveAndContinue },
        ]}
      />
    </>
  );
}
