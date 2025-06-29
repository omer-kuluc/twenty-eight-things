import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { DataContext } from '../App';

export default function Gallery() {
  const { data } = useContext(DataContext);
  const loopedData = [...data, ...data.slice(0, 3)]; // İlk 3 kart sona eklenir

  return (
    <div className="gallery-fullpage-wrapper">
      {loopedData.map(item => (
        <motion.div
          key={`${item.id}-${Math.random()}`} // key benzersiz olmalı
          className="gallery-fullpage-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        >
          <div className="gallery-fullpage-overlay">
            <h2>{item.title}</h2>
            {item.type === "song" ? (
              <>
                <p><strong>Singer:</strong> {item.singer}</p>
                <p className="gallery-fullpage-text">
                  {item.lyric.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </>
            ) : item.type === "movie" ? (
              <>
                <p><strong>Director:</strong> {item.director}</p>
                <p><strong>Stars:</strong> {item.stars}</p>
                <p className="gallery-fullpage-text">
                  {item.line.split('\n').map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </>
            ) : null}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
