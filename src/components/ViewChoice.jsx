// src/components/ViewChoice.jsx

import React from 'react';
import TypingLine from "./TypingLine";
import useTypingLines from './UseTypingLine';

export default function ViewChoice() {
  const resultLines = [
    "After the literary part,",
    "I’d like to share with you some movies and songs as part of ‘28 Things’.",
    "I tried to reflect them through photos that I believe somehow capture their essence, accompanied by meaningful, beautiful, or fun quotes and lyrics relevant to their context.",
    "You can choose the version you’d like to see below.",
  ];

  const { currentLine, handleComplete, showAll } = useTypingLines(resultLines);

  return (
    <div className="view-choice-container">
      {resultLines.map((line, i) =>
        i === currentLine ? (
          <TypingLine key={i} text={line} onComplete={handleComplete} />
        ) : i < currentLine ? (
          <p key={i} className="typing-line">{line}</p>
        ) : null
      )}

      {showAll && (
        <div className="view-buttons">
          <a href="#/gallery"><button>Gallery</button></a>
          <a href="#/slider"><button>Slider</button></a>
          <a href="#/timeline"><button>Timeline</button></a>

        </div>
      )}
    </div>
  );
}
