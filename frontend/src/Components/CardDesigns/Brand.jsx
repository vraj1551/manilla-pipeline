// frontend/src/Components/CardDesigns/Brand.jsx
import React, { useRef, useState, useEffect } from "react";
import api from "../../lib/api"; // shared axios instance

const POLL_MS = 5000; // keep in sync with backend rotate interval for predictable updates

const Brand = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [quoteText, setQuoteText] = useState(
    "Anywhere, anytime ordinary people are given the chance to choose, the choice is the same: freedom, not tyranny."
  );
  const [loading, setLoading] = useState(true);

  // Fetch current quote on interval
  useEffect(() => {
    let mounted = true;

    const fetchQuote = async () => {
      try {
        const res = await api.get("/api/quotes/current");
        const next = res.data?.text?.trim();
        if (mounted && next && next !== quoteText) {
          setQuoteText(next);
        }
      } catch (err) {
        // Log once per failure without spamming UI
        if (mounted) console.error("Error fetching quote:", err?.message || err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchQuote();
    const iv = setInterval(fetchQuote, POLL_MS);
    return () => {
      mounted = false;
      clearInterval(iv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once; interval handles updates

  // Measure container width responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) setWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Responsive sizes
  const multiplier = width < 300 ? 0.07 : 0.05;
  const fontSize = Math.max(14, Math.min(width * multiplier, 24));
  const imgSize = Math.max(80, Math.min(width * 0.25, 160));

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full border-3 bg-white rounded-xl overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10"
    >
      {/* Logo top-right */}
      <img
        src="logo.png"
        alt="Manilla Logo"
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          width: `${imgSize}px`,
          height: `${imgSize}px`,
        }}
      />

      {/* Text bottom-left */}
      <div
        className="absolute bottom-4 left-4"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.3 }}
      >
        <div className="mb-2 font-normal text-black">{today}</div>
        <div className="font-bold text-black">
          “{loading ? "Loading…" : quoteText}”
        </div>
      </div>
    </div>
  );
};

export default Brand;
