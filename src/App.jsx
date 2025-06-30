import { createContext, useEffect, useState } from 'react';
import { getPage } from './helper';
import './App.css';
import React from 'react';

export const DataContext = createContext(null);

function App() {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState(location.hash.substring(1) || '/intro');
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(x => x.json());
      setData(data);
    }
    getData();
  }, []);

  useEffect(() => {
    function handleHashChange() {
      const current = location.hash.substring(1) || '/intro';
      setRoute(current);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 🚨 Önemli çözüm: Eğer ana sayfaya geldi ama intro bitmemişse, intro'ya yönlendir
  useEffect(() => {
    if (location.hash === '#/' && !introFinished) {
      window.location.hash = '#/intro';
    }
  }, [introFinished]);

  return (
    <DataContext.Provider value={{ data, setData, introFinished, setIntroFinished }}>
      {getPage(route)}
    </DataContext.Provider>
  );
}

export default App;
