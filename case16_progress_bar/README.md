## Case16 : Progress Bar


### 케이스 주제
Q. Progressbar 구현


### 기능 요구사항
1) 총 4번 스텝 이동을 할수 있고 숫자는 조절 가능하다.

2) 이전 으로 하면 왼쪽으로(25%), 다음으로 오른쪽(25%)

3) 다 채우거나 다 사라지면 클릭해도 작동안한다.


### 기능 작동 이미지
![progressbar](https://user-images.githubusercontent.com/12206933/107072156-175f4700-6829-11eb-89dd-728c42894dd4.gif)


### 실행 방법 / 풀이 방법 안내
- jQuery 와 Vanilia.js 는 span 안에 width 값을 조절한다.
- css 로는 애니메이션 효과를 주지않고, setInterval 함수를 사용한다.  
> q1. Javascript - q1_index.html 실행

> q2. JQuery - q2_index.html 실행

> q3. React
- css를 활용한다. ( src/ProgressBar.js 에 transition 참고)
- 다음이나 이전을 연속클릭해도 함께 동작하지 않게 한다.


### 문제
q1. Javascript - 주어진 템플릿(`q_index.html`)으로 캐러셀 구현

q2. Jquery -  Javascript로 구현한 기능을 동일하게 Jquery로도 구현해보는 문제

q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성


### 풀이 참고
- jQuery animate 를 활용한다.


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/q1_js/q1_index.js`

**q2**
`./question/q2_jquery/q2_index.js`

**q3**
`./question/q3_react/src/App.js`


### 실행 방법 및 의존성 모듈 설치

**q1**
경로
`./question/s1_js`
index.html 열기

**q2**
경로
`./question/s2_jquery`
index.html 열기

**q3**
경로
`./question/s3_react`

터미널
```bash
  $ yarn install
  $ yarn start
```


