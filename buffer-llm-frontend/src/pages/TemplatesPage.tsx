import React, { useState, useEffect } from "react";
import { Template } from "../types";
import { api } from "../services/api";
import ContentGeneratorModal from "../components/ContentGeneratorModal";

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [aiTemplates, setAiTemplates] = useState<Template[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const filters = [
    { name: "All", icon: "📝" },
    { name: "AI", icon: "🤖" },
    { name: "Tip", icon: "💡" },
    { name: "Case Study", icon: "📊" },
    { name: "Story", icon: "📖" },
    { name: "How-to", icon: "🔧" },
    { name: "Question", icon: "❓" },
    { name: "Opinion", icon: "💭" },
  ];

  const defaultTemplates: Template[] = [
    {
      _id: "default-1",
      title: "Walk through your midday reset ritual",
      promptTemplate:
        "Walk your audience through the small habits or actions that help you reset and refocus halfway through the day.",
      tags: ["tip"],
      icon: "🔄",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
    {
      _id: "default-2",
      title: "Share how you wind down at night",
      promptTemplate:
        "Show your audience how you disconnect, reflect, or prep for the next day.",
      tags: ["tip"],
      icon: "🌙",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
    {
      _id: "default-3",
      title: "Share how you optimize your morning workflow",
      promptTemplate:
        "Walk your audience through a personal morning routine or work setup that boosts productivity.",
      tags: ["how-to"],
      icon: "☀️",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
    {
      _id: "default-4",
      title: "Introduce (or reintroduce) yourself",
      promptTemplate:
        "Tell your audience who you are, what you create content about, and who it's for.",
      tags: ["story"],
      icon: "✋",
      badge: "New",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
    {
      _id: "default-5",
      title: "One habit I swear by — and one I'm quitting",
      promptTemplate:
        "Share a personal contrast and invite your audience to do the same.",
      tags: ["story"],
      icon: "🔄",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
    {
      _id: "default-6",
      title: "5 newsletters I never miss",
      promptTemplate:
        "Curate a list of high-value newsletters for your niche — and share why they're worth it.",
      tags: ["tip"],
      icon: "📧",
      badge: "Creator Camp",
      editable: false,
      createdAt: "",
      updatedAt: "",
      examplePostIds: [],
    },
  ];

  const loadTemplates = async () => {
    setIsLoading(true);

    // Load default templates
    setTemplates(defaultTemplates);

    // Load AI-generated templates (using the test account for now)
    try {
      const fetchedAiTemplates = await api.getTemplates("funk_yuee");
      setAiTemplates(fetchedAiTemplates);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Failed to load AI templates:", error);
      setAiTemplates([]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Combine default templates and AI templates
  const allTemplates = [...templates, ...aiTemplates];

  const filteredTemplates =
    selectedFilter === "All"
      ? allTemplates
      : selectedFilter === "AI"
      ? aiTemplates
      : allTemplates.filter((template) =>
          template.tags.includes(selectedFilter.toLowerCase())
        );

  const handleGenerateTemplates = async () => {
    setIsGenerating(true);
    try {
      const success = await api.generateTemplates(
        "funk_yuee",
        "dance and personal growth"
      );
      if (success) {
        // Reload all templates after generation
        await loadTemplates();
        alert("New AI templates generated successfully!");
      } else {
        alert("Failed to generate templates. Please try again.");
      }
    } catch (error) {
      console.error("Error generating templates:", error);
      alert("An error occurred while generating templates.");
    }
    setIsGenerating(false);
  };

  const handleUseTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsContentModalOpen(true);
  };

  const handleCloseContentModal = () => {
    setIsContentModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <>
      <div className="content-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 className="content-title">Templates</h1>
            <p className="content-subtitle">
              Choose a template to get started with your content creation
            </p>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              background: "transparent",
              border: "1px solid #e8ecef",
              borderRadius: "6px",
              color: "#5c6970",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <span>💬</span>
            Share Feedback
          </button>
        </div>
      </div>

      <div className="content-body">
        {/* AI Templates Status */}
        {aiTemplates.length > 0 && (
          <div
            style={{
              background: "#e8f5e8",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✅</span>
              <span style={{ color: "#2e7d32", fontWeight: "500" }}>
                {aiTemplates.length} AI-generated templates loaded from your
                Instagram analysis
              </span>
            </div>
            {lastRefresh && (
              <span style={{ color: "#2e7d32", fontSize: "12px" }}>
                Last updated: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}

        {/* Filter Bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setSelectedFilter(filter.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                border:
                  selectedFilter === filter.name
                    ? "1px solid #4285f4"
                    : "1px solid #e8ecef",
                borderRadius: "20px",
                background:
                  selectedFilter === filter.name ? "#e8f0fe" : "white",
                color: selectedFilter === filter.name ? "#4285f4" : "#5c6970",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span>{filter.icon}</span>
              {filter.name}
            </button>
          ))}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              border: "1px solid #e8ecef",
              borderRadius: "20px",
              background: "white",
              color: "#5c6970",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            More
            <span>⬇️</span>
          </button>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#5c6970", fontSize: "16px" }}>
              Loading templates...
            </p>
          </div>
        ) : (
          <div className="template-grid">
            {filteredTemplates.map((template) => (
              <div key={template._id} className="template-card">
                <div className="template-icon">
                  {template.icon || (template.editable ? "🤖" : "📝")}
                </div>
                <div style={{ position: "relative" }}>
                  <h3 className="template-title">{template.title}</h3>
                  {template.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "0",
                        background:
                          template.badge === "New" ? "#34a853" : "#4285f4",
                        color: "white",
                        fontSize: "11px",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {template.badge}
                    </span>
                  )}
                  {template.editable && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: template.badge ? "60px" : "0",
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
                </div>
                <p className="template-description">
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
                {template.tags && template.tags.length > 0 && (
                  <div
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                    }}
                  >
                    {template.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#f1f3f4",
                          color: "#5c6970",
                          fontSize: "11px",
                          padding: "2px 6px",
                          borderRadius: "8px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  style={{
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop: "1px solid #f1f3f4",
                  }}
                >
                  <button
                    onClick={() => handleUseTemplate(template)}
                    style={{
                      background: "#4285f4",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      margin: "0 auto",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3367d6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#4285f4";
                    }}
                  >
                    <span>✨</span>
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content Generator Modal */}
        {selectedTemplate && (
          <ContentGeneratorModal
            template={selectedTemplate}
            isOpen={isContentModalOpen}
            onClose={handleCloseContentModal}
          />
        )}

        {/* Generate AI Templates Section */}
        <div
          style={{
            marginTop: "48px",
            padding: "32px",
            background: "linear-gradient(135deg, #e8f0fe 0%, #f3e5f5 100%)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "12px",
            }}
          >
            Generate AI-Powered Templates
          </h2>
          <p
            style={{
              color: "#5c6970",
              fontSize: "16px",
              marginBottom: "24px",
              maxWidth: "600px",
              margin: "0 auto 24px",
            }}
          >
            Analyze your Instagram content to create personalized templates that
            match your unique style and voice
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleGenerateTemplates}
            disabled={isGenerating}
            style={{
              opacity: isGenerating ? 0.6 : 1,
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
          >
            <span>{isGenerating ? "⏳" : "🤖"}</span>
            {isGenerating
              ? "Generating Templates..."
              : "Start Instagram Analysis"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TemplatesPage;
