import { PageLayout, BackToDashboard } from "../components/SharedComponents";
import { useNavigate } from "react-router-dom";

export default function LangraphAgent() {
  const navigate = useNavigate();

  return (
    <PageLayout>


      {/* Back Navigation */}
      <BackToDashboard />

      {/* Center Content */}
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "70vh" }}
      >
        <div
          style={{
            width: "520px",
            background: "#FFFFFF",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
            boxShadow: "0 10px 30px -10px rgba(0, 38, 119, 0.15)",
            border: "1px solid #E5E7EB",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#EBF5FB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0072C6"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "12px",
              color: "#1F2937",
            }}
          >
            LangGraph Integration
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: "24px",
              marginBottom: "32px",
            }}
          >
            This feature is currently under development.
            <br />
            Stay tuned for powerful orchestration capabilities coming soon.
          </p>

          {/* CTA */}
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 24px",
              borderRadius: "6px",
              border: "none",
              background: "#0072C6",
              color: "#FFFFFF",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 121, 194, 0.2)",
            }}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </PageLayout>
  );
}