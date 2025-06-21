import { useContext, useState } from 'react';
import React from 'react';
import { DataContext } from '../App';

export default function Gallery() {
  const { data } = useContext(DataContext);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className='gallery-card-container'>
      {data.map(item => {
        const isHovered = hoveredId === item.id;
        const hasImage = !!item.image;
        const overlayOpacity = isHovered ? 0.2 : 0.5;

        const backgroundImage = hasImage
          ? `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url(${item.image})`
          : 'none';

        return (
          <div
            key={item.id}
            className={`gallery-card-content ${hasImage ? 'has-bg' : ''}`}
            style={
              hasImage
                ? {
                  backgroundImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  transition: 'background-image 0.4s ease-in-out',
                }
                : {}
            }
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <h2>{item.title}</h2>

            {/* Özel içerik bloğu - sadece Benjamin Button için */}
            {item.title === "The Curious Case of Benjamin Button" && (
              <div className="benjamin-button-clock">
                <span style={{ '--i': 1 }}><b>1</b></span>
                <span style={{ '--i': 2 }}><b>2</b></span>
                <span style={{ '--i': 3 }}><b>3</b></span>
                <span style={{ '--i': 4 }}><b>4</b></span>
                <span style={{ '--i': 5 }}><b>5</b></span>
                <span style={{ '--i': 6 }}><b>6</b></span>
                <span style={{ '--i': 7 }}><b>7</b></span>
                <span style={{ '--i': 8 }}><b>8</b></span>
                <span style={{ '--i': 9 }}><b>9</b></span>
                <span style={{ '--i': 10 }}><b>10</b></span>
                <span style={{ '--i': 11 }}><b>11</b></span>
                <span style={{ '--i': 12 }}><b>12</b></span>
              </div>
            )}


            {item.type === "song" ? (
              <>
                <p><strong>Singer:</strong> {item.singer}</p>
                <p><strong>Lyric:</strong><br />
                  {item.lyric.split('\n').map((line, i) => (
                    <span className='gallery-card-lyric' key={i}>{line}<br /></span>
                  ))}
                </p>
              </>
            ) : item.type === "movie" ? (
              <>
                <p><strong>Director:</strong> {item.director}</p>
                <p><strong>Stars:</strong> {item.stars}</p>
                <p><strong>Line:</strong><br />
                  {item.line.split('\n').map((line, i) => (
                    <span className='gallery-card-line' key={i}>{line}<br /></span>
                  ))}
                </p>
              </>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
