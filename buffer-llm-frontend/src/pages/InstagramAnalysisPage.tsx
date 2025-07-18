import React, { useState, useEffect } from "react";
import axios from "axios";
import { Account, Post, ApiResponse } from "../types";

const InstagramAnalysisPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "allPosts">("input");
  const [account, setAccount] = useState<Account | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");

  // Helper function to get the appropriate image URL for display
  const getPostImageUrl = (post: Post): string => {
    // For video posts, use thumbnail_url if available, otherwise fall back to media_url
    if (post.mediaType === "VIDEO" && post.thumbnailUrl) {
      return post.thumbnailUrl;
    }

    // For images and other types, use media_url
    if (post.mediaUrl) {
      return post.mediaUrl;
    }

    // Final fallback - a placeholder or empty string
    return "";
  };

  // Helper function to get media type display
  const getMediaTypeIcon = (mediaType?: string): string => {
    switch (mediaType) {
      case "VIDEO":
        return "🎥";
      case "CAROUSEL_ALBUM":
        return "📸";
      case "IMAGE":
      default:
        return "🖼️";
    }
  };

  // Load existing posts when component mounts
  useEffect(() => {
    loadExistingPosts();
  }, []);

  const loadExistingPosts = async () => {
    try {
      const response = await axios.get<
        ApiResponse<{
          posts: Post[];
          account: Account | null;
          totalCount: number;
        }>
      >("/api/latest-account");

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.account
      ) {
        setAccount(response.data.data.account);
        setAllPosts(response.data.data.posts);
        if (response.data.data.posts.length > 0) {
          setStep("allPosts");
        }
      }
    } catch (err) {
      // Silently fail - user will see empty state which is fine
      console.log("No existing posts found");
    }
  };

  const handleViewAllPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get<
        ApiResponse<{
          posts: Post[];
          account: Account | null;
          totalCount: number;
        }>
      >("/api/latest-account");

      if (response.data.success && response.data.data) {
        setAccount(response.data.data.account);
        setAllPosts(response.data.data.posts);
        setStep("allPosts");
      } else {
        setError("No posts found in database");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="content-header">
        <h1 className="content-title">Instagram Content Analysis</h1>
        <p className="content-subtitle">
          Analyze your Instagram posts to generate personalized content
          templates
        </p>
      </div>

      <div className="content-body">
        {error && (
          <div className="alert alert-error">
            <span>❌</span>
            {error}
          </div>
        )}

        {step === "input" && (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Instagram Content Templates</h2>
              <p className="card-description">
                View your previously crawled Instagram posts or generate
                AI-powered content templates
              </p>
            </div>

            <div className="alert alert-info">
              <span>📱</span>
              Templates are generated based on your Instagram content analysis
              (processed on the backend)
            </div>

            <div
              style={{
                paddingTop: "24px",
                borderTop: "1px solid #e8ecef",
                marginTop: "24px",
              }}
            >
              <p
                style={{
                  color: "#5c6970",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                View previously crawled posts:
              </p>
              <button
                onClick={handleViewAllPosts}
                disabled={loading}
                className="btn btn-secondary"
              >
                {loading && <div className="loading-spinner" />}
                {loading ? "Loading..." : "📋 View All Posts"}
              </button>
            </div>
          </div>
        )}

        {step === "allPosts" && (
          <div>
            {account && (
              <div className="account-card">
                {account.profilePicUrl ? (
                  <img
                    src={account.profilePicUrl}
                    alt={account.fullName || account.username}
                    className="profile-avatar"
                  />
                ) : (
                  <div
                    className="profile-avatar"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {account.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="account-details">
                  <h3>@{account.username}</h3>
                  <p className="subtitle">
                    {account.fullName || "Instagram User"}
                  </p>
                </div>
              </div>
            )}

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">📋 All Posts ({allPosts.length})</h2>
                <p className="card-description">
                  Previously crawled Instagram posts from your account
                </p>
              </div>

              <div className="posts-grid">
                {allPosts.map((post) => (
                  <div
                    key={post._id}
                    className="post-card"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <img
                      src={getPostImageUrl(post)}
                      alt={`${getMediaTypeIcon(post.mediaType)} Post`}
                      className="post-image"
                    />
                    <div
                      className="post-content"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                      }}
                    >
                      <p
                        className="post-caption"
                        style={{ flex: 1, marginBottom: "12px" }}
                      >
                        {post.caption
                          ? post.caption.substring(0, 120) +
                            (post.caption.length > 120 ? "..." : "")
                          : "No caption"}
                      </p>
                      <div className="post-meta" style={{ marginTop: "auto" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#5c6970",
                            marginBottom: "8px",
                          }}
                        >
                          {formatDate(post.timestamp)}
                        </div>
                        <div className="post-stats">
                          <span>
                            {getMediaTypeIcon(post.mediaType)}{" "}
                            {post.mediaType === "CAROUSEL_ALBUM"
                              ? "ALBUM"
                              : post.mediaType || "POST"}
                          </span>
                          <span>❤️ {formatNumber(post.likesCount || 0)}</span>
                          <span>
                            💬 {formatNumber(post.commentsCount || 0)}
                          </span>
                          {post.analyzed && <span>✅ Analyzed</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InstagramAnalysisPage;
