import React, { useState, useRef, useLayoutEffect } from 'react';

const GetInTouch = () => {
  const text =
    "We're always open to conversations with thinkers, leaders, and creators. Reach out, and let's explore how we can bring clarity and structure to your vision.";
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);

  // Detect overflow whenever text or expanded changes, or on resize
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const checkOverflow = () => {
      // scrollHeight > clientHeight means it’s clipped
      setIsOverflowed(el.scrollHeight > el.clientHeight + 1);
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text, expanded]);

  return (
    <div className="relative w-full h-full bg-[#ff7300] rounded-xl overflow-visible p-4 sm:p-6 flex flex-col">
      {/* Heading at top */}
      <h2
        className="
          text-white font-bold mb-auto
          text-2xl      /* mobile */
          sm:text-2xl   /* tablet */
          lg:text-3xl    /* laptop */
        "
        style={{ lineHeight: 1.2 }}
      >
        Get in touch!
      </h2>

      {/* Body text with clamp when collapsed */}
      <p
        ref={contentRef}
        className="
          text-white font-normal leading-snug break-words
          text-base      /* mobile */
          sm:text-lg   /* tablet */
          lg:text-lg  /* laptop */
        "
        style={
          !expanded && isOverflowed
            ? {
                display: '-webkit-box',
                WebkitLineClamp: 3,        // show 3 lines when collapsed
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : {}
        }
      >
        {text}
      </p>

      {/* Only show toggle if overflowed */}
      {isOverflowed && (
        <button
          onClick={() => setExpanded(exp => !exp)}
          className="self-start mt-1 text-blue-600 hover:underline text-base"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};

export default GetInTouch;
