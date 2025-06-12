import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import Movies from "./Movies";
import Songs from "./Songs";
import TypingLine from "./TypingLine";
import { motion } from "framer-motion";

export default function MainPage() {
  const { data, setData } = useContext(DataContext);

  const introLines = [
    "28 is one of the 51 known perfect numbers.",
    "Perfect number = A number whose divisors (excluding itself) add up to the number itself",
  ];

  const explanationLines = [
    "For 28 to be 'perfect', it needs these 5 numbers — just as they need 28 to be seen as part of something 'perfect'..",
    "Numbers are just symbols; you can think of anything you care about in life in place of numbers.",
    "I hope you live a life where your contribution to something 'perfect' is valued, and you appreciate the things that contribute to your own 'perfection'.",
    "Because people may forget — I hope you don’t.."
  ];


  const [currentLine, setCurrentLine] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [colorState, setColorState] = useState({
    yellow: false,
    blue: false,
    green: false,
  });
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [explanationStep, setExplanationStep] = useState(0);

  const handleComplete = () => {
    if (currentLine < introLines.length - 1) {
      setCurrentLine((prev) => prev + 1);
    } else {
      setShowAll(true);
    }
  };

  useEffect(() => {
    if (showAll) {
      setAnimationStarted(true);

      const timer1 = setTimeout(() => {
        setColorState((prev) => ({ ...prev, yellow: true }));
      }, 2000);
      const timer2 = setTimeout(() => {
        setColorState((prev) => ({ ...prev, blue: true }));
      }, 4000);
      const timer3 = setTimeout(() => {
        setColorState((prev) => ({ ...prev, green: true }));
      }, 6000);
      const showExplanationTimer = setTimeout(() => {
        setShowExplanations(true);
      }, 6500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(showExplanationTimer);
      };
    }
  }, [showAll]);

  const divisors = ["1", "2", "4", "7", "14"];

  return (
    <div className="main-page-container">
      <h2 className="header-text">28 THINGS</h2>

      <div className="intro-text-section">
        {introLines.map((line, i) =>
          i === currentLine ? (
            <TypingLine key={i} text={line} onComplete={handleComplete} showCursor={!showAll} />
          ) : i < currentLine ? (
            <p key={i} className="typing-line">
              {line}
            </p>
          ) : null
        )}

        {showAll && (
          <div className="result-section">
            <motion.p
              className={`divisor ${colorState.green ? "green-28" : "delayed-color"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              28
            </motion.p>

            <div className="divisors-list-horizontal">
              {divisors.map((d) => {
                let colorClass = "delayed-color";
                if (["1", "4", "14"].includes(d) && colorState.yellow) {
                  colorClass = "yellow-divisor";
                } else if (["2", "7"].includes(d) && colorState.blue) {
                  colorClass = "blue-divisor";
                }
                return (
                  <motion.p
                    key={d}
                    className={`divisor ${colorClass}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {d}
                  </motion.p>
                );
              })}
            </div>

            {showExplanations && (
              <div className="explanation-text">
                {explanationLines.map((line, i) =>
                  i === explanationStep ? (
                    <TypingLine
                      key={i}
                      text={line}
                      onComplete={() => setExplanationStep((prev) => prev + 1)}
                      showCursor={true}
                    />
                  ) : i < explanationStep ? (
                    <p key={i} className="typing-line">{line}</p>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="other-pages-area">
        <a href="#/movies">
          <Movies />
        </a>
        <a href="#/songs">
          <Songs />
        </a>
      </div>
    </div>
  );
}
