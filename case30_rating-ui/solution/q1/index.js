// 필요한 DOM Select
const $stars = document.querySelector('.stars')
const $score = document.querySelector('.score')
const $reset = document.querySelector('.reset')

// 별의 갯수 = Score
const MAX_SCORE = 5

// 별의 현재 점수 상태
const state = {
  score: 0,
}

// 별의 갯수만큼 별 DOM 추가
Array(MAX_SCORE)
  .fill()
  .forEach(() => {
    const star = document.createElement('div')
    star.className = 'star empty'
    $stars.appendChild(star)
  })

// Score를 받아 별의 점수 표시를 바꿔주는 함수
const setDisplayScore = (score) => {
  const starList = [...$stars.children]
  starList.forEach((star, i) => {
    if (score > i) {
      if (score - i === 0.5) {
        star.className = 'star half'
      } else {
        star.className = 'star full'
      }
    } else {
      star.className = 'star empty'
    }
  })
}

// Score를 받아 점수 상태를 업데이트해주는 함수
const setScore = (score) => {
  setDisplayScore(score)
  $score.textContent = score
  state.score = score
}

// MouseEvent를 받아 Score를 0~N까지 0.5 scale 로 점수를 계산해주는 함수
const calculateScore = (e) => {
  const { width, left } = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - left
  const scale = width / MAX_SCORE / 2
  return (Math.floor(x / scale) + 1) / 2
}

// 마우스를 움직일때마다 마우스 위치에 해당하는 점수를 계산하여 별표시를 업데이트해주는 이벤트리스너
$stars.addEventListener('mousemove', (e) => {
  const score = calculateScore(e)
  setDisplayScore(score)
})

// 마우스가 별영역을 빠져나가면 기존 점수로 별점수 표시를 업데이트해주는 이벤트 리스너
$stars.addEventListener('mouseleave', () => {
  setDisplayScore(state.score)
})

// 마우스로 별 영역을 클릭하면 마우스 위치에 해당하는 점수를 상태로 업데이트해주는 이벤트 리스너
$stars.addEventListener('click', (e) => {
  const score = calculateScore(e)
  setScore(score)
})

// Reset 버튼을 누르면 점수 상태를 0점으로 초기화해주는 이벤트 리스너
$reset.addEventListener('click', () => {
  setScore(0)
})
