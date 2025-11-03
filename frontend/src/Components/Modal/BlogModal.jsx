// src/Components/Modal/BlogModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import ModalContainer from "./ModalContainer";
import "../../styles/tinymce-content.css";

export default function BlogModal({ isOpen = true, onClose }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  // Load blog data
  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const res = await api.get(`/api/blogs/slug/${slug}`);
        if (!cancel) setBlog(res.data);
      } catch (e) {
        console.error("Failed to load blog:", e);
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, [slug]);

  // Ensure blog links open in new tab + don’t close modal
  useEffect(() => {
    if (!blog?.content || !contentRef.current) return;
    const root = contentRef.current;
    const anchors = root.querySelectorAll("a[href]");
    const handler = (ev) => ev.stopPropagation();

    anchors.forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
      a.addEventListener("click", handler);
    });

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", handler));
    };
  }, [blog?.content]);

  const handleClose = () => (onClose ? onClose() : navigate(-1));

  const imageUrl = blog?.image
    ? `${import.meta.env.VITE_API_BASE_URL}${blog.image}`
    : null;

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose}>
      {loading ? (
        <div className="rounded-xl p-6 w-full mx-auto">
          Loading…
        </div>
      ) : !blog ? (
        <div className="rounded-xl p-6 w-full mx-auto">
          <p className="mb-4">Blog not found.</p>
        </div>
      ) : (
        // relative so floating share/copy buttons can anchor to bottom-right
        <div className=" relative rounded-xl p-6 w-full mx-auto">
          {/* UPDATED: larger size + centered */}
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-center mb-4">
            {blog.title}
          </h2>

          {imageUrl && (
            <img
              src={imageUrl}
              alt={blog.title}
              className="w-full max-h-96 object-cover rounded my-4"
            />
          )}

          {/* Render TinyMCE HTML exactly as authored */}
          <div
            ref={contentRef}
            className="tinymce-content not-prose"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      )}
    </ModalContainer>
  );
}
