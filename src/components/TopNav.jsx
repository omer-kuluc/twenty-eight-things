// src/components/TopNav.jsx
import React from 'react';

const views = ['gallery', 'timeline', 'slider'];

export default function TopNav({ currentView }) {
  const getAdjacent = () => {
    const index = views.indexOf(currentView);
    const left = views[(index + 2) % 3];
    const right = views[(index + 1) % 3];
    return { left, right };
  };

  const { left, right } = getAdjacent();

  return (
    <div className="top-nav">
      <a className="nav-button left" href={`#/${left}`}>{left.toUpperCase()}</a>
      <div className="nav-center">{currentView.toUpperCase()}</div>
      <a className="nav-button right" href={`#/${right}`}>{right.toUpperCase()}</a>
    </div>
  );
}
