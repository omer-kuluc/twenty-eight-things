import { useState } from "react";

export default function useTypingLines(lines, onFinished = () => { }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const handleComplete = () => {
    if (currentLine < lines.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      setShowAll(true);
      onFinished(); // Dışarıdan verilen işlem varsa çağırılır
    }
  };

  return { currentLine, handleComplete, showAll };
}
