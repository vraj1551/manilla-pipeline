// src/Components/Share/ShareButtons.jsx
import React, { useMemo, useState } from "react";

export default function ShareButtons({ title, summary }) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  const shareText = title || "Check this out";
  const shareBody = summary || "";

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareText,
          text: shareBody || shareText,
          url: shareUrl,
        });
      } else {
        // Fallback: copy the URL and briefly show feedback
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setFallback(true);
        setTimeout(() => {
          setCopied(false);
          setFallback(false);
        }, 1500);
      }
    } catch {
      // user cancelled or share failed — no-op
    }
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    // stays pinned to bottom-right of the modal card
    <div className="pointer-events-none absolute bottom-4 right-4 flex gap-2">
      {/* Copy on the LEFT */}
      <button
        type="button"
        onClick={handleCopy}
        className={`pointer-events-auto px-3 py-1.5 rounded-md transition border-1 border-gray-400 cursor-pointer
          ${copied ? "bg-green-600 text-white" : "bg-white text-gray-800 hover:bg-gray-50 active:scale-95"}`}
        title="Copy link"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Share on the RIGHT (brand orange, shorter height) */}
      <button
        type="button"
        onClick={handleShare}
        className="pointer-events-auto px-4 py-1.5 rounded-md text-white transition active:scale-95 cursor-pointer"
        style={{ backgroundColor: fallback ? "#16a34a" : "#ff7300" }}
        title="Share"
      >
        {fallback ? "Copied!" : "Share"}
      </button>
    </div>
  );
}
