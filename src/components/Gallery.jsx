import React, { useContext, useState, useEffect, useRef } from 'react';
import { DataContext } from '../App';
import TopNav from './TopNav';
import { motion } from 'framer-motion';

export default function Gallery() {
  const { data } = useContext(DataContext);

  const loopedData = [...data.slice(-3), ...data, ...data.slice(0, 3)];
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [disableTransition, setDisableTransition] = useState(false);
  const innerRef = useRef(null);

  const handleScroll = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = direction === 'down' ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    let timeout;

    if (currentIndex === loopedData.length - 3) {
      timeout = setTimeout(() => jumpToIndex(3), 500);
    } else if (currentIndex === 2) {
      timeout = setTimeout(() => jumpToIndex(loopedData.length - 4), 500);
    } else {
      timeout = setTimeout(() => setIsAnimating(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, loopedData.length]);

  const jumpToIndex = (index) => {
    if (!innerRef.current) return;
    setDisableTransition(true);
    innerRef.current.style.transform = `translateY(-${index * 100}vh)`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableTransition(false);
        setCurrentIndex(index);
        setIsAnimating(false);
      });
    });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;
      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    };

    const container = document.querySelector('.gallery-scroll-wrapper');
    container?.addEventListener('wheel', handleWheel, { passive: false });

    return () => container?.removeEventListener('wheel', handleWheel);
  }, [isAnimating, currentIndex]);

  useEffect(() => {
    let touchStartY = 0;
    const container = document.querySelector('.gallery-scroll-wrapper');

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (isAnimating) return;
      if (Math.abs(deltaY) > 50) {
        handleScroll(deltaY > 0 ? 'down' : 'up');
      }
    };

    container?.addEventListener('touchstart', handleTouchStart, { passive: true });
    container?.addEventListener('touchmove', handleTouchMove, { passive: false });
    container?.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating, currentIndex]);

  return (
    <div className="gallery-scroll-wrapper">
      <TopNav currentView="gallery" />
      <div
        ref={innerRef}
        className="gallery-scroll-inner"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
          transition: disableTransition
            ? 'none'
            : isAnimating
              ? 'transform 0.5s ease-in-out'
              : 'none',
        }}
      >
        {loopedData.map((item, index) => (
          <section
            key={`${item.id}-${index}`}
            className="gallery-scroll-section"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <motion.div
              className="gallery-scroll-overlay"
              initial={false}
              animate={{ opacity: 0.2 }}
              whileHover={{ opacity: 0.8 }}
              whileTap={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <h5>{item.title}</h5>
              <i>Release date : {item["release-date"]}</i>

              {item.type === 'song' ? (
                <>
                  <p><strong>Singer:</strong> {item.singer}</p>
                  <div className="gallery-lyric">
                    <p>Lyric :</p>
                    {item.lyric.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </div>
                </>
              ) : item.type === 'movie' ? (
                <>
                  <p><strong>Director:</strong> {item.director}</p>
                  <p><strong>Stars:</strong> {item.stars}</p>
                  <div className="gallery-line">
                    <p>Line :</p>
                    {item.line.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </div>
                </>
              ) : null}
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
}
