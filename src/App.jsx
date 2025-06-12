import { createContext, useEffect, useState } from 'react'
import { getPage } from './helper';
import './App.css'
import React from 'react'

export const DataContext = createContext(null);


function App() {

  const [data, setData] = useState([]);
  const [route, setRoute] = useState(location.hash.substring(1) || '/');
  useEffect(() => {
    async function getData() {
      const data = await fetch('/data/data.json').then(x => x.json());
      setData(data);
    }
    getData();

    window.addEventListener('hashchange', (e) => setRoute(location.hash.substring(1) || '/'));

  }, []);

  return (
    <>
      <DataContext.Provider value={{ data, setData }}>
        {getPage(route)}
      </DataContext.Provider>
    </>
  )
}

export default App
