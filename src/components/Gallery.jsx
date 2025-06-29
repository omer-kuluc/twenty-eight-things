import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../App';

export default function Gallery() {
  const { data } = useContext(DataContext);

  const loopedData = [
    ...data.slice(-3),
    ...data,
    ...data.slice(0, 3)
  ];

  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScroll = (direction) => {
    if (isAnimating) return;

    setIsAnimating(true);

    const nextIndex = direction === 'down'
      ? currentIndex + 1
      : currentIndex - 1;

    setCurrentIndex(nextIndex);
  };

  // Döngü kontrolü
  useEffect(() => {
    if (currentIndex === loopedData.length - 3) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(3);
      }, 500);
    } else if (currentIndex === 2) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(loopedData.length - 4);
      }, 500);
    } else {
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  }, [currentIndex, loopedData.length]);

  // Wheel scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isAnimating) return;

      handleScroll(e.deltaY > 0 ? 'down' : 'up');
    };

    const container = document.querySelector('.gallery-scroll-wrapper');
    container?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, [isAnimating, currentIndex]);

  // Touch swipe
  useEffect(() => {
    let touchStartY = 0;

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

    const container = document.querySelector('.gallery-scroll-wrapper');
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
      <div
        className="gallery-scroll-inner"
        style={{
          height: `${loopedData.length * 100}vh`,
          transform: `translateY(-${currentIndex * 100}vh)`,
          transition: isAnimating ? 'transform 0.5s ease-in-out' : 'none',
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
            <div className="gallery-scroll-overlay">
              <h2>{item.title}</h2>
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
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
