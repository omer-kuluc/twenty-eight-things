import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../App';
import { AnimatePresence, motion } from 'framer-motion';

export default function Timeline() {
  const { data } = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const [yearDisplay, setYearDisplay] = useState(null);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const currentYear = parseInt(data[index]['release-date']);
      setYearDisplay(currentYear);
    }
  }, [data, index]);

  if (!data || data.length === 0) {
    return (
      <div className="timeline-wrapper">
        <div className="timeline-overlay">Yükleniyor...</div>
      </div>
    );
  }

  const current = data[index];
  const currentYear = parseInt(current['release-date']);
  const text = current?.type === 'song' ? current.lyric : current?.line;

  const animateYears = (from, to, onComplete) => {
    clearInterval(intervalRef.current);
    const step = from < to ? 1 : -1;
    const dir = from < to ? 1 : -1; // küçükten büyüğe sağa, büyükten küçüğe sola
    setDirection(dir);

    if (from === to) {
      onComplete();
      return;
    }

    let years = [];
    for (let y = from + step; step > 0 ? y <= to : y >= to; y += step) {
      years.push(y);
    }

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < years.length) {
        setYearDisplay(years[i]);
        i++;
      } else {
        clearInterval(intervalRef.current);
        onComplete();
      }
    }, 25); // geçiş hızı
  };

  const handleNavigation = (newIndex) => {
    const nextYear = parseInt(data[newIndex]['release-date']);
    animateYears(currentYear, nextYear, () => {
      setIndex(newIndex);
    });
  };

  const goNext = () => {
    const next = (index + 1) % data.length;
    handleNavigation(next);
  };

  const goPrev = () => {
    const prev = (index - 1 + data.length) % data.length;
    handleNavigation(prev);
  };

  return (
    <div className="timeline-wrapper">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.image}
          className="timeline-bg"
          style={{ backgroundImage: `url(${current.image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      <div className="timeline-content">
        <div className="timeline-year-slider">
          <AnimatePresence mode="popLayout">
            {yearDisplay && (
              <motion.div
                key={yearDisplay}
                className="timeline-year"
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {yearDisplay}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="timeline-slide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{current.title}</h2>
            <p className="timeline-meta">
              {current.type === 'song'
                ? `🎵 ${current.singer}`
                : `🎬 ${current.director}`}
            </p>
            <p className="timeline-text">{text}</p>
          </motion.div>
        </AnimatePresence>

        <div className="timeline-controls">
          <button onClick={goPrev}>←</button>
          <button onClick={goNext}>→</button>
        </div>
      </div>
    </div>
  );
}
