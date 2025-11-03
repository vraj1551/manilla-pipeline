import React, { useState, useRef, useLayoutEffect } from 'react';

const What = () => {
  const text =
    "We help innovators turn raw ideas into registered, enforceable assets. Then we design clear paths to earn, scale, and stay protected. Sound legal rails keep growth on track.";
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
    <div className="relative w-full h-full bg-white  rounded-xl overflow-visible p-4 sm:p-6 flex flex-col">
      {/* Heading at top */}
      <h2
        className="
          text-black font-bold mb-auto
          text-2xl      /* mobile */
          sm:text-2xl   /* tablet */
          lg:text-3xl    /* laptop */
        "
        style={{ lineHeight: 1.2 }}
      >
        What we do?
      </h2>

      {/* Body text with clamp when collapsed */}
      <p
        ref={contentRef}
        className="
          text-black font-normal leading-snug break-words
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

export default What;
