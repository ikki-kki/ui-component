## Case7 : Analog clock

### 케이스 주제
Q. 아래와 같이 동작하는 아날로그 시계를 구현해보십시오.


### 기능 요구사항
> JavaScript
1. 시계의 시침(.hand.hour 요소), 분침(.hand.minute 요소), 초침(.hand.second 요소)을 1초 간격으로 회전시켜 현재 시간을 표시하시오.

2. 뷰의 기본 템플릿을 그대로 사용해도 좋으나, 더 나은 방법이 있다면 변경해도 좋습니다.

> React
3. 함수 컴포넌트와 훅을 사용해 구현하시오.

4. 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.


### 기능 작동 이미지
<img src="assets/analog-clock.gif" alt="analog clock" style="width:300px;"/>


### 문제
1. JS : Javascript로 해당 기능을 구현하시오.
2. React : React로 해당 기능을 구현하시오.
- styled-components를 사용하여 뷰를 구현하시오.
- useRef와 훅을 사용하여 1번과 동일한 동작을 구현하시오.


### 주요 학습 키워드
- [CSS 변수(CSS 커스텀 프로퍼티)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [styled-components](https://styled-components.com/)
- [useRef](https://ko.reactjs.org/docs/hooks-reference.html#useref)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/1.js/index.js`

**q2**
`./question/2.react-styled-component/src/App.js`
*이외 필요한 디렉토리 / 파일구조는 각자 작성하시면 됩니다.*

**q3**
`./question/3.react-useRef/src/components/AnalogClock.js`
*출제자 강사님 코드 기반으로, 해당 경로에서 요구한 문제사항을 해결해주세요*
*이외 필요한 디렉토리 / 파일구조는 각자 작성하시면 됩니다.*



### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/1.js`
index.html 열기

**q2**
경로
`./question/2.react-styled-component`

터미널
```bash
  $ npm install
  $ npm start
```

**q3**
경로
`./question/3.react-useRef`

터미널
```bash
  $ npm install
  $ npm start
```


