import React, { useState } from 'react'
import './StarRate.scss'
import EmptyStar from '../../assets/star-empty.svg'
import HalfStar from '../../assets/star-half.svg'
import FullStar from '../../assets/star-full.svg'
import Reset from '../../assets/reset.svg'

// 별의 갯수 = Score
const MAX_SCORE = 5

export const StarRate = ({ onChange, score }) => {
  // 표시되는 별의 상태
  const [displayScore, setDisplayScore] = useState(score)

  const handleMove = (e) => {
    const { width, left } = e.currentTarget.getBoundingClientRect()
    let x
    if ('offsetX' in e.nativeEvent) {
      x = e.nativeEvent.offsetX
    } else {
      x = e.nativeEvent.targetTouches[0].clientX - left
    }
    Array(MAX_SCORE * 2)
      .fill(0)
      .find(
        (_, i) =>
          x <= (width / (MAX_SCORE * 2)) * i + 1 || setDisplayScore((i + 1) / 2)
      )
  }

  return (
    <section>
      <div
        className="stars"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onTouchEnd={() => onChange(displayScore)}
        onMouseEnter={() => setDisplayScore(score)}
        onMouseLeave={() => setDisplayScore(score)}
        onClick={() => onChange(displayScore)}
      >
        {[...Array(MAX_SCORE)].map((_, i) => (
          <Star score={displayScore} idx={i} key={i} />
        ))}
      </div>
      <Reset
        className="reset"
        onClick={() => {
          onChange(0)
          setDisplayScore(0)
        }}
      />
    </section>
  )
}

const Star = ({ score, idx }) =>
  score > idx ? (
    score - idx === 0.5 ? (
      <HalfStar />
    ) : (
      <FullStar />
    )
  ) : (
    <EmptyStar />
  )
