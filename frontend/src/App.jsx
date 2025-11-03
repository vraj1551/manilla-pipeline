// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch,
} from "react-router-dom";
import "./App.css";

import DisclaimerGate from "./pages/DisclaimerGate";
import Home from "./pages/Home";
import BlogModal from "./Components/Modal/BlogModal";
import BlogModalWrapper from "./Components/Modal/BlogModalWrapper";

function App() {
  // ─── Gate state ────────────────────────────────────────────────────────────
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("disclaimerAccepted");
    setAccepted(stored === "true");
  }, []);

  const handleAccept = () => {
    localStorage.setItem("disclaimerAccepted", "true");
    setAccepted(true);
  };

  // ─── Routing & modal hooks (always call these!) ───────────────────────────
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const match = useMatch("/blog/:slug");
  const isBlogRoute = Boolean(match);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isBlogRoute) {
        background ? navigate(-1) : navigate("/");
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isBlogRoute, background, navigate]);

  // ─── If disclaimer not accepted, show only the gate ────────────────────────
  if (!accepted) {
    return <DisclaimerGate onAccept={handleAccept} />;
  }

  // ─── Otherwise render the real app ─────────────────────────────────────────
  return (
    <div className="md:h-screen md:w-screen md:overflow-hidden">
      {/* Base routes */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={null} />
      </Routes>

      {/* Blog‑modal overlay when on /blog/:slug */}
      {isBlogRoute &&
        (background ? (
          <Routes>
            <Route path="/blog/:slug" element={<BlogModal />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/blog/:slug" element={<BlogModalWrapper />} />
            <Route path="*" element={null} />
          </Routes>
        ))}
    </div>
  );
}

export default App;
