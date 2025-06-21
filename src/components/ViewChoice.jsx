// src/components/ViewChoice.jsx

import React from 'react';
import TypingLine from "./TypingLine";
import useTypingLines from './UseTypingLine';

export default function ViewChoice() {
  const resultLines = [
    "Projeyi yapmamın amacı '28 mükemmel şey' demek isterdim; ama mükemmel ifadesi biraz fazla iddialı geliyor kulağa, bunun yerine : ",
    "'Bulunduğu bağlamı yansıttığını düşündüğüm ya da en azından bana anlamlı veya eğlenceli gelen replik ve sözleri,\n ait oldukları film ve şarkılarla birlikte paylaşmak istedim' diyebilirim",
    "Film ve şarkıları görmek istediğiniz versiyonu seçebilirsiniz"
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
        </div>
      )}
    </div>
  );
}
