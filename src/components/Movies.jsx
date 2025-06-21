import { useContext, useState } from "react"
import { DataContext } from "../App"
import React from 'react'
import Gallery from "./Gallery";

export default function Movies() {

  const { data, setData } = useContext(DataContext);


  return (
    <div className="show-style-container">
      <button onClick={() => window.location.hash = "#/gallery"}>Gallery</button>
      <button>Card</button>
    </div>
  )
}
