import React, { useState, useEffect } from 'react';

const views = ['gallery', 'timeline', 'slider'];

export default function TopNav({ currentView }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAdjacent = () => {
    const index = views.indexOf(currentView);
    const left = views[(index + 2) % 3];
    const right = views[(index + 1) % 3];
    return { left, right };
  };

  const { left, right } = getAdjacent();

  return (
    <div className="top-nav">
      <a className="nav-button home" href="#/">
        <img src="/data/img/home-icon.svg" alt="" />
      </a>

      {isMobile ? (
        <>
          <img
            className="hamburger-toggle"
            src={menuOpen ? "/data/img/cross.svg" : "/data/img/hamburger-menu.svg"}
            alt="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="mobile-menu">
              <a
                href={`#/${left}`}
                className={`mobile-menu-link ${currentView === left ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {left.toUpperCase()}
              </a>

              <a
                href={`#/${right}`}
                className={`mobile-menu-link ${currentView === right ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {right.toUpperCase()}
              </a>

              <a
                href={`#/${currentView}`}
                className="mobile-menu-link active"
                onClick={() => setMenuOpen(false)}
              >
                {currentView.toUpperCase()}
              </a>

            </div>
          )}
        </>
      ) : (
        <>
          <a
            className={`nav-button left ${currentView === left ? 'active' : ''}`}
            href={`#/${left}`}
          >
            {left.toUpperCase()}
          </a>

          <a
            className={`nav-button center ${views.includes(currentView) ? 'active' : ''}`}
            href={`#/${currentView}`}
          >
            {currentView.toUpperCase()}
          </a>

          <a
            className={`nav-button right ${currentView === right ? 'active' : ''}`}
            href={`#/${right}`}
          >
            {right.toUpperCase()}
          </a>
        </>
      )}
    </div>
  );
}
