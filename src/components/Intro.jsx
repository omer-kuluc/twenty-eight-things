import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataContext } from "../App";

export default function Intro() {
  const numbers = ["33550336", "8128", "496", "28", "6"];
  const [index, setIndex] = useState(0);
  const { setIntroFinished } = useContext(DataContext);

  useEffect(() => {
    if (index < numbers.length) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 1800);
      return () => clearTimeout(timer);
    } else if (index === numbers.length) {
      setIntroFinished(true);
      const done = setTimeout(() => {
        window.location.hash = "#/";
      }, 2000);
      return () => clearTimeout(done);
    }
  }, [index]);

  const current = index < numbers.length ? numbers[index] : null;
  const progress =
    index <= numbers.length ? (index / numbers.length) * 100 : 100;

  return (
    <div className="circle-intro-container">
      <div className="circle-wrapper">
        <svg className="progress-ring">
          <circle
            className="progress-ring-bg"
            cx="110"
            cy="110"
            r="100"
            strokeWidth="8"
          />
          <circle
            className="progress-ring-fill"
            cx="110"
            cy="110"
            r="100"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={(1 - progress / 100) * 2 * Math.PI * 100}
          />
        </svg>

        <div className="number-center">
          <AnimatePresence mode="wait">
            {current && (
              <motion.div
                key={current}
                className="number-inside"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                {current}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
