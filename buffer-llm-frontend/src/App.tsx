import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TemplatesPage from "./pages/TemplatesPage";
import InstagramAnalysisPage from "./pages/InstagramAnalysisPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<InstagramAnalysisPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route
            path="/publish"
            element={
              <div className="content-header">
                <h1 className="content-title">Publish</h1>
                <p className="content-subtitle">
                  Schedule and publish your content
                </p>
              </div>
            }
          />
          <Route
            path="/engage"
            element={
              <div className="content-header">
                <h1 className="content-title">Engage</h1>
                <p className="content-subtitle">Engage with your audience</p>
              </div>
            }
          />
          <Route
            path="/analyze"
            element={
              <div className="content-header">
                <h1 className="content-title">Analyze</h1>
                <p className="content-subtitle">Analyze your performance</p>
              </div>
            }
          />
          <Route
            path="/start"
            element={
              <div className="content-header">
                <h1 className="content-title">Start Page</h1>
                <p className="content-subtitle">Get started with Buffer</p>
              </div>
            }
          />
          <Route
            path="/ideas"
            element={
              <div className="content-header">
                <h1 className="content-title">Ideas</h1>
                <p className="content-subtitle">Generate content ideas</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
