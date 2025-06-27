import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewChoice() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const lines = [
    "After the literary part,",
    "I’d like to share with you some movies and songs as part of ‘28 Things’.",
    "I tried to reflect them through photos that I believe somehow capture their essence, accompanied by meaningful, beautiful, or fun quotes and lyrics relevant to their context.",
    "You can choose the version you’d like to see below.",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => setShowContent(true), 500); // İçeriği gecikmeli aç
    }, 3000); // intro süresi (3sn)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="view-choice-container">
      {/* INTRO ANIMASYONU */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="intro-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="intro-circle" />
            <div className="intro-text">twenty eight things</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANA İÇERİK */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="view-choice-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="text-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
              >
                {line}
              </motion.p>
            ))}

            <motion.div
              className="view-buttons"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: lines.length * 0.4 + 0.3 }}
            >
              <a href="#/gallery"><button>Gallery</button></a>
              <a href="#/slider"><button>Slider</button></a>
              <a href="#/timeline"><button>Timeline</button></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
