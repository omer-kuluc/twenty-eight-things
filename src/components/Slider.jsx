import React, { useContext, useState } from 'react';
import { DataContext } from '../App';
import TopNav from './TopNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function Slider() {
  const { data } = useContext(DataContext);
  const [centerIndex, setCenterIndex] = useState(0);

  // VERİ YOKSA HİÇBİR ŞEY GÖSTERME (veya yükleniyor yazısı)
  if (!data || data.length === 0) {
    return (
      <div className="slider-wrapper">
        <TopNav currentView="slider" />
        <div style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="slider-wrapper">
      <TopNav currentView="slider" />

      {/* FADE GEÇİŞLİ FULLSCREEN BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={data[centerIndex].image}
          className="slider-full-bg"
          style={{
            backgroundImage: `url(${data[centerIndex].image})`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      <div className="slider-track">
        {data.map((item, index) => {
          const offset = index - centerIndex;
          let className = 'slider-card';

          if (offset === 0) className += ' center';
          else if (offset === -1) className += ' left';
          else if (offset === 1) className += ' right';
          else className += ' hidden';

          return (
            <div key={item.id} className={className}>
              <div
                className="card-bg"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="card-content">
                <h2>{item.title}</h2>
                <p>Release Date: <i>{item["release-date"]}</i></p>
                {item.type === 'song' && (
                  <>
                    <p><strong>Singer:</strong> {item.singer}</p>
                    <blockquote>
                      {item.lyric.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </blockquote>
                  </>
                )}
                {item.type === 'movie' && (
                  <>
                    <p><strong>Director:</strong> {item.director}</p>
                    <p><strong>Stars:</strong> {item.stars}</p>
                    <blockquote>
                      {item.line.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </blockquote>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="slider-btn left" onClick={prevSlide}>‹</button>
      <button className="slider-btn right" onClick={nextSlide}>›</button>
    </div>
  );
}
