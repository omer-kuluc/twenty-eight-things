import React, { createContext, useEffect, useState } from 'react';
import { getPage } from './helper';
import './App.css';

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState(location.hash.substring(1) || '/intro');
  const [introFinished, setIntroFinished] = useState(false);

  // ✅ Veriyi çek
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/data/data.json');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Veri çekilirken hata oluştu:", err);
      }
    }
    fetchData();
  }, []);

  // ✅ Hash değişimini dinle
  useEffect(() => {
    const handleHashChange = () => {
      const current = location.hash.substring(1) || '/';
      setRoute(current);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ✅ Siyah ekranı engelleyen sağlam yönlendirme
  let pageToRender;

  if (route === '/' && !introFinished) {
    // Ana sayfa açılmış ama intro bitmemiş, Intro'ya gönder
    pageToRender = getPage('/intro');
    if (location.hash !== '#/intro') {
      window.location.hash = '#/intro';
    }
  } else {
    pageToRender = getPage(route);
  }

  return (
    <DataContext.Provider value={{ data, setData, introFinished, setIntroFinished }}>
      {pageToRender}
    </DataContext.Provider>
  );
}

export default App;
