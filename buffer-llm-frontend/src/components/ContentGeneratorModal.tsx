import React, { useState } from "react";
import { Template } from "../types";
import { api } from "../services/api";

interface ContentGeneratorModalProps {
  template: Template;
  isOpen: boolean;
  onClose: () => void;
}

const ContentGeneratorModal: React.FC<ContentGeneratorModalProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  const [baseText, setBaseText] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!baseText.trim()) {
      setError("Please enter some base text to get started");
      return;
    }

    setIsGenerating(true);
    setError("");
    setGeneratedContent("");

    try {
      const result = await api.generateContentWithTemplate(
        template._id,
        baseText,
        additionalContext || undefined
      );

      if (result.success && result.content) {
        setGeneratedContent(result.content);
      } else {
        setError(result.error || "Failed to generate content");
      }
    } catch (err) {
      setError("An error occurred while generating content");
    }

    setIsGenerating(false);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    // You could add a toast notification here
  };

  const handleReset = () => {
    setBaseText("");
    setAdditionalContext("");
    setGeneratedContent("");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "700px",
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1a1a1a",
                marginBottom: "8px",
              }}
            >
              Generate Content with Template
            </h2>
            <div
              style={{
                background: "#f8f9fa",
                border: "1px solid #e8ecef",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {template.icon || "📝"} {template.title}
                {template.editable && (
                  <span
                    style={{
                      background: "#9c27b0",
                      color: "white",
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontWeight: "600",
                    }}
                  >
                    AI
                  </span>
                )}
              </h3>
              <p style={{ fontSize: "14px", color: "#5c6970", margin: 0 }}>
                {template.promptTemplate}
              </p>
              {template.tone && (
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#5c6970",
                  }}
                >
                  <strong>Tone:</strong> {template.tone}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#5c6970",
              padding: "4px",
              marginLeft: "16px",
            }}
          >
            ×
          </button>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            Your base text or topic *
          </label>
          <textarea
            value={baseText}
            onChange={(e) => setBaseText(e.target.value)}
            placeholder="e.g., Today I learned a new dance move and it reminded me of the importance of practice..."
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              border: "1px solid #e8ecef",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            Additional context (optional)
          </label>
          <textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Any specific details, context, or style preferences..."
            style={{
              width: "100%",
              minHeight: "80px",
              padding: "12px",
              border: "1px solid #e8ecef",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "24px",
              color: "#dc2626",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Generate Button */}
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !baseText.trim()}
            style={{
              background:
                isGenerating || !baseText.trim() ? "#f1f3f4" : "#4285f4",
              color: isGenerating || !baseText.trim() ? "#9aa0a6" : "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor:
                isGenerating || !baseText.trim() ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "0 auto",
            }}
          >
            <span>{isGenerating ? "⏳" : "✨"}</span>
            {isGenerating ? "Generating..." : "Generate Content"}
          </button>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  margin: 0,
                }}
              >
                Generated Content
              </h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={handleCopyContent}
                  style={{
                    background: "#34a853",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  📋 Copy
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    background: "#5c6970",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
            <div
              style={{
                background: "white",
                border: "1px solid #e8ecef",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "14px",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
                fontFamily:
                  "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                color: "#1a1a1a",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
              }}
            >
              {generatedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGeneratorModal;
