import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: "Create", href: "/", icon: "✏️" },
    { name: "Publish", href: "/publish", icon: "📤" },
    { name: "Engage", href: "/engage", icon: "💬" },
    { name: "Analyze", href: "/analyze", icon: "📊" },
    { name: "Start Page", href: "/start", icon: "🏠" },
  ];

  const sidebarItems = [
    { name: "Ideas", href: "/ideas", icon: "💡" },
    { name: "Templates", href: "/templates", icon: "📋", badge: "New" },
    { name: "Instagram Analysis", href: "/", icon: "📱" },
  ];

  const channels = [
    { name: "All Channels", count: 0, icon: "📡" },
    {
      name: "Instagram",
      count: 0,
      icon: "📷",
      avatar: "/api/placeholder/24/24",
    },
  ];

  return (
    <div className="App">
      {/* Buffer Header */}
      <header className="buffer-header">
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link to="/" className="buffer-logo">
            📦 Buffer
          </Link>
          <nav className="buffer-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${
                  location.pathname === item.href ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="header-actions">
          <button className="header-button primary">+</button>
          <button className="header-button secondary">🔔</button>
          <button className="header-button secondary">❓</button>
          <button className="header-button secondary">🎁</button>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#4285f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            U
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Create</h3>
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`sidebar-item ${
                  location.pathname === item.href ? "active" : ""
                }`}
              >
                <span className="icon">{item.icon}</span>
                {item.name}
                {item.badge && <span className="badge">{item.badge}</span>}
              </Link>
            ))}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-title">Channels</h3>
            {channels.map((channel) => (
              <button key={channel.name} className="sidebar-item">
                <span className="icon">{channel.icon}</span>
                {channel.name}
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#5c6970",
                    fontSize: "13px",
                  }}
                >
                  {channel.count}
                </span>
              </button>
            ))}

            <button className="sidebar-item">
              <span className="icon">🔗</span>
              Connect Threads
            </button>
            <button className="sidebar-item">
              <span className="icon">💼</span>
              Connect LinkedIn
            </button>
            <button className="sidebar-item">
              <span className="icon">🐦</span>
              Connect Bluesky
            </button>
            <button
              className="sidebar-item"
              style={{ color: "#4285f4", marginTop: "8px" }}
            >
              <span className="icon">⬇️</span>
              Show more channels
            </button>
          </div>

          <div style={{ marginTop: "auto", padding: "24px" }}>
            <button className="sidebar-item">
              <span className="icon">🏷️</span>
              Manage Tags
            </button>
            <button className="sidebar-item">
              <span className="icon">⚙️</span>
              Manage Channels
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
