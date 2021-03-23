import React, { useState } from 'react'
import { StarRate } from './components/StarRate'

export const App = () => {
  // 별의 현재 점수
  const [score, setScore] = useState(0)
  const handleChange = (v) => setScore(v)

  return (
    <>
      <span>{score}</span>
      <StarRate onChange={handleChange} score={score} />
    </>
  )
}
