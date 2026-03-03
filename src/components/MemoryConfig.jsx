import { useState, useEffect } from "react";
import {
  SectionHeader,
  FooterButtons,
} from "../components/SharedComponents";
import { useNavigate } from "react-router-dom";

// --- Icons ---
const ClockIcon = () => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{ width: 40, height: 40, backgroundColor: "#EBF5FB" }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="#546E7A" strokeWidth="1.5" fill="none" />
      <path d="M10 6V10L13 12" stroke="#546E7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const DatabaseIcon = () => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{ width: 40, height: 40, backgroundColor: "#F0F0F0" }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="5" rx="7" ry="2.5" stroke="#546E7A" strokeWidth="1.5" fill="none" />
      <path d="M3 5V15C3 16.38 6.13 17.5 10 17.5C13.87 17.5 17 16.38 17 15V5" stroke="#546E7A" strokeWidth="1.5" fill="none" />
      <path d="M3 10C3 11.38 6.13 12.5 10 12.5C13.87 12.5 17 11.38 17 10" stroke="#546E7A" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

const EnvelopeIcon = () => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{ width: 36, height: 36, backgroundColor: "#F0F0F0" }}
  >
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="#90A4AE" strokeWidth="1.5" fill="none" />
      <path d="M2 6L10 11L18 6" stroke="#90A4AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CheckFilled = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" fill="#0072C6" />
    <path d="M8 14.5L12 18L20 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircleOutline = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#B0BEC5" strokeWidth="1.5" fill="none" />
  </svg>
);

const CircleOutlineSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#0072C6" strokeWidth="1.5" fill="none" />
  </svg>
);

const CheckFilledSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#0072C6" />
    <path d="M7 12.5L10 15.5L17 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CircleOutlineDisabled = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#D5D5D5" strokeWidth="1.5" fill="none" />
  </svg>
);

// --- Memory Type Sub-Card (for long-term options) ---
function MemorySubCard({ name, description, selected, disabled = false, onToggle }) {
  return (
    <div
      className="rounded-xl p-4 cursor-pointer transition-all"
      style={{
        backgroundColor: disabled ? "#FAFAFA" : "#FFFFFF",
        border: selected ? "2px solid #0072C6" : "1px solid #E0E0E0",
        boxShadow: selected ? "0 0 0 1px #0072C6" : "0 1px 3px rgba(0,0,0,0.04)",
        minHeight: 130,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onClick={() => !disabled && onToggle()}
    >
      {/* Top row: icon left, check right */}
      <div className="flex items-start justify-between">
        <EnvelopeIcon />
        {disabled ? <CircleOutlineDisabled /> : selected ? <CheckFilledSmall /> : <CircleOutlineSmall />}
      </div>

      {/* Bottom: name + description */}
      <div className="mt-3">
        <p
          className="font-semibold"
          style={{
            fontSize: 13,
            color: disabled ? "#B0BEC5" : "#1A1A1A",
            lineHeight: 1.3,
          }}
        >
          {name}
        </p>
        <p
          className="mt-0.5"
          style={{
            fontSize: 12,
            color: disabled ? "#CFD8DC" : "#90A4AE",
            lineHeight: 1.3,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// --- Main Memory Config Component ---
export default function MemoryConfig({
  agentDetails,
  defaultConfig,
  stepOneData,
  onSaveAndContinue,
  onBack,
}) {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Initialize from defaultConfig if available
  const memDefaults = defaultConfig?.memory_config;

  // Memory selection
  const [shortTermSelected, setShortTermSelected] = useState(true);
  const [longTermSelected, setLongTermSelected] = useState(false);

  // Long-term sub-types (multi-select)
  const [semanticMemory, setSemanticMemory] = useState(false);
  const [episodicMemory, setEpisodicMemory] = useState(false);
  const [proceduralMemory, setProceduralMemory] = useState(false);

  // Sync defaults when defaultConfig loads
  useEffect(() => {
    if (!memDefaults) return;
    setShortTermSelected(memDefaults.short_term_memory_needed ?? true);
    setLongTermSelected(memDefaults.long_term_memory_needed ?? false);
    const ltConfig = memDefaults.long_term_memory_config;
    if (ltConfig) {
      setSemanticMemory(ltConfig.semantic_user_profile ?? false);
      setEpisodicMemory(ltConfig.episodic_user_experience ?? false);
      setProceduralMemory(ltConfig.procedural_user_instructions ?? false);
    }
  }, [memDefaults]);

  const handleDiscard = () => {
    navigate("/dashboard");
  };

  const handleSaveDraft = () => {
    console.log("Save as Draft clicked");
  };

  const handleSaveAndContinue = async () => {
    setIsSaving(true);
    try {
      const memoryPayload = {
        short_term_memory_needed: shortTermSelected,
        long_term_memory_needed: longTermSelected,
        long_term_memory_config: {
          semantic_user_profile: semanticMemory,
          episodic_user_experience: episodicMemory,
          procedural_user_instructions: proceduralMemory,
          custom: false,
        },
      };

      onSaveAndContinue({
        ...stepOneData,
        memoryConfig: memoryPayload,
      });
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="mt-5">
        <SectionHeader>Memory Configuration</SectionHeader>

        {/* Short Term Memory Card */}
        <div
          className="rounded-xl cursor-pointer transition-all"
          style={{
            border: shortTermSelected ? "2px solid #0072C6" : "1px solid #E0E0E0",
            boxShadow: shortTermSelected ? "0 0 0 1px #0072C6" : "0 1px 3px rgba(0,0,0,0.04)",
            backgroundColor: "#FFFFFF",
            padding: "20px 24px",
            marginBottom: 20,
          }}
          onClick={() => setShortTermSelected(!shortTermSelected)}
        >
          <div className="flex items-start justify-between">
            <ClockIcon />
            {shortTermSelected ? <CheckFilled /> : <CircleOutline />}
          </div>
          <div className="mt-3">
            <h3 className="font-bold" style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.3 }}>
              Short Term Memory
            </h3>
            <p className="mt-1" style={{ fontSize: 13, color: "#78909C", lineHeight: 1.5 }}>
              Volatile memory that persists only during the current active session. Ideal for single-purpose tasks.
            </p>
          </div>
        </div>

        {/* Long Term Memory Card */}
        <div
          className="rounded-xl transition-all"
          style={{
            border: longTermSelected ? "2px solid #0072C6" : "1px solid #E0E0E0",
            boxShadow: longTermSelected ? "0 0 0 1px #0072C6" : "0 1px 3px rgba(0,0,0,0.04)",
            backgroundColor: "#FFFFFF",
            padding: "20px 24px",
          }}
        >
          {/* Header area - clickable to toggle */}
          <div
            className="cursor-pointer"
            onClick={() => setLongTermSelected(!longTermSelected)}
          >
            <div className="flex items-start justify-between">
              <DatabaseIcon />
              {longTermSelected ? <CheckFilled /> : <CircleOutline />}
            </div>
            <div className="mt-3">
              <h3 className="font-bold" style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.3 }}>
                Long Term Memory
              </h3>
              <p className="mt-1" style={{ fontSize: 13, color: "#78909C", lineHeight: 1.5 }}>
                {longTermSelected
                  ? "Persistent database storage allowing agents to remember users and preferences across multiple days or sessions."
                  : "Volatile memory that persists only during the current active session. Ideal for single-purpose tasks."
                }
              </p>
            </div>
          </div>

          {/* Sub-cards - shown when long term is selected */}
          {longTermSelected && (
            <div
              className="grid gap-4 mt-5"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              <MemorySubCard
                name="Semantic Memory"
                description="Lorem Ipsum is simply dummy text"
                selected={semanticMemory}
                onToggle={() => setSemanticMemory(!semanticMemory)}
              />
              <MemorySubCard
                name="Episodic Memory"
                description="Lorem Ipsum is simply dummy text"
                selected={episodicMemory}
                onToggle={() => setEpisodicMemory(!episodicMemory)}
              />
              <MemorySubCard
                name="Procedural Memory"
                description="Lorem Ipsum is simply dummy text"
                selected={proceduralMemory}
                onToggle={() => setProceduralMemory(!proceduralMemory)}
              />
              <MemorySubCard
                name="Custom Memory (coming soon)"
                description="Lorem Ipsum is simply dummy text"
                selected={false}
                disabled={true}
                onToggle={() => {}}
              />
            </div>
          )}
        </div>
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