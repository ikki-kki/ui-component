## Case17 : Carousel
  

### 케이스 주제
Q. 캐러셀(이미지슬라이더) 구현

  
### 기능 요구사항
1. 오른쪽, 왼쪽 화살표로 슬라이더 컨트롤
2. 슬라이더 갯수는 3개 이상
3. 슬라이더가 이동하는 동안 화살표 작동안됨
4. 슬라이더 지연시간은 0.5초
5. 첫 로딩시 현재위치는 0번째 슬라이더

  
### 기능 작동 이미지
![carousel](https://user-images.githubusercontent.com/12206933/106652679-25b72400-65d9-11eb-8acc-00e9e43f4c1d.gif)

  
### 문제
q1. javaScript - 주어진 템플릿(`q_index.html`)으로 캐러셀 구현
q2. jQuery - Javascript로 구현한 기능을 동일하게 Jquery로도 구현해보는 문제
q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성

  
### 풀이 참고
1. 슬라이더 갯수가 5개라면 첫로딩시 아래 클래스 활성화
   - 0번째에 active
   - 1번째에 next
   - 4번째 prev
 
2. css 설명
   - .carousel_item 의 transition 딜레이 조절
   - transform: translateX(-100%) x축 왼쪽이동
   - .carousel 의 preserve-3d 효과


### 주요 학습 키워드
- prototype을 사용하여 메소드와 속성을 정의한 뒤, new 연산자를 사용헤 함수로 호출하여 기능을 구현
- 각각의 슬라이드 이동은 translateX의 값으로 슬라이드의 위치를 조절
- 반복문을 사용하여 슬라이드 위치에 맞게 className을 지정
- useState, useRef, useEffect hook 사용


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/q1_js/q1_index.js`

**q2**
`./question/q2_jquery/q2_index.js`

**q3**
`./question/q3_react/src/Carousel.js`
*출제자 강사님 코드 기반으로, 해당 경로에서 요구한 문제사항을 해결해주세요*


### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/q1_js`
index.html 열기

**q2**
경로
`./question/q2_jquery`
index.html 열기

**q3**
경로
`./question/q3_react`

터미널
```bash
  $ npm install
  $ npm start
```