import { useContext, useState } from "react"
import { DataContext } from "../App"
import React from 'react'

export default function Movies() {

  const { data, setData } = useContext(DataContext);


  return (
    <div>Movies</div>
  )
}
