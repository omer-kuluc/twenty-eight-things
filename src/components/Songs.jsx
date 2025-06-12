import { useContext, useState } from "react"
import { DataContext } from "../App"
import React from 'react'

export default function Songs() {

  const { data, setData } = useContext(DataContext);

  return (
    <div>Songs</div>
  )
}
