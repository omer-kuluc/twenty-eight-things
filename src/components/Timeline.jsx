import React, { useContext, useState } from 'react';
import { DataContext } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

export default function Timeline() {
  const { data } = useContext(DataContext);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Eğer data yüklenmemişse veya boşsa, yükleniyor mesajı ver
  if (!data || data.length === 0) {
    return (
      <div className="timeline-wrapper">
        <div className="timeline-overlay">Yükleniyor...</div>
      </div>
    );
  }

  const current = data[index];
  const currentYear = parseInt(current?.['release-date']);
  const text = current?.type === 'song' ? current.lyric : current?.line;

  const handleNavigation = (newIndex) => {
    const newYear = parseInt(data[newIndex]?.['release-date']);
    setDirection(newYear > currentYear ? 1 : -1);
    setIndex(newIndex);
  };

  const goNext = () => {
    const nextIndex = (index + 1) % data.length;
    handleNavigation(nextIndex);
  };

  const goPrev = () => {
    const prevIndex = (index - 1 + data.length) % data.length;
    handleNavigation(prevIndex);
  };

  const getYearStyle = (i) => {
    const offset = i - index;
    const distance = Math.abs(offset);
    const x = offset * 80;
    const scale = 1 - distance * 0.1;
    const opacity = 1 - distance * 0.3;
    return {
      x,
      scale,
      opacity,
      position: 'absolute',
      left: '50%',
      top: 0,
      translateX: '-50%',
    };
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

      <div className="timeline-overlay">
        {/* YIL KAYDIRMALI BÖLÜM */}
        <div className="timeline-year-slider" style={{ position: 'relative', height: '4rem', marginBottom: '2rem' }}>
          <AnimatePresence initial={false} mode="wait">
            {data.map((item, i) => {
              const year = item['release-date'];
              const style = getYearStyle(i);

              if (Math.abs(i - index) > 2) return null;

              return (
                <motion.div
                  key={i}
                  className="timeline-year"
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={style}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontSize: i === index ? '2.5rem' : '1.5rem',
                    fontWeight: i === index ? 'bold' : 'normal',
                    color: 'white',
                    position: 'absolute',
                    left: `calc(50% + ${style.x}px)`,
                    top: 0,
                    opacity: style.opacity,
                    transform: `translateX(-50%) scale(${style.scale})`,
                    pointerEvents: 'none',
                  }}
                >
                  {year}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
