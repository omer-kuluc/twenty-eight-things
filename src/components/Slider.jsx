import { useContext, useState } from 'react';
import { DataContext } from '../App';
import React from 'react';
import TopNav from './TopNav';

export default function Slider() {
  const { data } = useContext(DataContext);
  const [centerIndex, setCenterIndex] = useState(0);

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="slider-wrapper">
      <TopNav currentView="slider" />
      {/* FULLSCREEN BACKGROUND IMAGE */}
      <div
        className="slider-full-bg"
        style={{
          backgroundImage: `url(${data[centerIndex].image})`
        }}
      ></div>

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
                      <p>Lyric :</p>
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
                      <p>Line :</p>
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
