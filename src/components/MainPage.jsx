// src/components/MainPage.jsx

import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import Movies from "./Movies";
import TypingLine from "./TypingLine";
import { motion, AnimatePresence } from "framer-motion";
import useTypingLines from "./UseTypingLine";

const perfectNumbers = ["33550336", "8128", "496", "28", "6"];

function CountdownCircle({ onComplete, finished }) {
  useEffect(() => {
    const totalDuration = 4000;
    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`box ${finished ? "intro-finished" : ""}`}>
      <div className="inner-box">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="niddle"></div>
        <div className="number">
          <div>33550336</div>
          <div>8128</div>
          <div>496</div>
          <div>28</div>
          <div>6</div>
        </div>
      </div>
    </div>
  );
}

export default function MainPage() {
  const { data } = useContext(DataContext);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [introFadeOut, setIntroFadeOut] = useState(false);
  const introLines = [
    "28 is one of the 51 known perfect numbers. (6, 28, 496, 8128, 33550336)",
    "Perfect number = A number whose divisors (excluding itself) add up to the number itself",
  ];

  const explanationLines = [
    "For 28 to be 'perfect', it needs these 5 numbers, just as they need 28 to be seen as part of something 'perfect'.",
    "Digits and perfection are nothing more than symbols created by humans.",
    "There are many things that you make better than they are, or that make you better than you are.",
    "Most people overlook or forget this in life’s rush.",
    "Hope you’re someone who sees or remembers.",
  ];

  const {
    currentLine,
    handleComplete,
    showAll
  } = useTypingLines(introLines);

  const [colorState, setColorState] = useState({ yellow: false, blue: false, green: false });
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [explanationStep, setExplanationStep] = useState(0);

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

  return (
    <div className="main-page-container">
      <AnimatePresence>
        {!countdownFinished && !introFadeOut && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <CountdownCircle
              onComplete={() => {
                setTimeout(() => {
                  setIntroFadeOut(true);
                  setTimeout(() => setCountdownFinished(true), 350);
                }, 0);
              }}
              finished={countdownFinished}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {countdownFinished && (
        <motion.div
          className="intro-text-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="main-title">28 THINGS</h1>

          {introLines.map((line, i) =>
            i === currentLine ? (
              <TypingLine key={i} text={line} onComplete={handleComplete} showCursor={!showAll} />
            ) : i < currentLine ? (
              <p key={i} className="typing-line">{line}</p>
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
                {["1", "2", "4", "7", "14"].map((d) => {
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
                        onComplete={() =>
                          setTimeout(() => {
                            setExplanationStep((prev) => prev + 1);
                          }, 300)
                        }
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
        </motion.div>
      )}

      {(showAll && explanationStep === explanationLines.length) && (
        <div className="other-pages-area">
          <a href="#/view-choice">
            <h2 data-text="&nbsp; Continue &nbsp;">&nbsp; Continue &nbsp;</h2>
          </a>
        </div>
      )}
    </div>
  );
}
