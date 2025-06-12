import React, { useEffect, useState } from "react";

export default function TypingLine({ text, onComplete, showCursor = true }) {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (visibleChars < text.length) {
      const timeout = setTimeout(() => {
        setVisibleChars((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      if (onComplete) {
        const delay = setTimeout(() => onComplete(), 1000); // Son satırda biraz bekletme
        return () => clearTimeout(delay);
      }
    }
  }, [visibleChars, text, onComplete]);

  return (
    <p className="typing-line">
      {text.slice(0, visibleChars)}
      {showCursor && (
        <span className={`blinking-cursor ${visibleChars < text.length ? "" : "final-blink"}`}>
          |
        </span>
      )}
    </p>
  );
}
