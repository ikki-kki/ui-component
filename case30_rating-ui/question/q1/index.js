// 필요한 Dom Selector
const $stars = document.querySelector('.stars')
const $stars = document.querySelector('.score')
const $stars = document.querySelector('.reset')

// 별의 갯수 = Score
const MAX_SCORE = 5

// 별의 현재 점수 상태
const state = {
  score: 0,
}

// 별의 갯수만큼 별 DOM 추가 (별은 empty, half, full 클래스를 가질수 있음)
Array(MAX_SCORE)
  .fill()
  .forEach(() => {
    const star = document.createElement('div')
    star.className = 'star empty'
    $stars.appendChild(star)
  })

// Write your solution here.
