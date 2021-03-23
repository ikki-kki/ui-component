## Case15 : Modal window


### 케이스 주제
Q. 모달 팝업 구현


### 기능 요구사항
 1. 팝업을 엽니다를 누르면 팝업이 뜬다.
 2. x 버튼을 누르면 팝업이 닫힘
 3. 팝업 이외 부분을 누르면 닫힘
 4. 팝업 안을 눌렀을 떄 닫히면 안됨


### 기능 작동 이미지
![modal](https://user-images.githubusercontent.com/12206933/105272499-d1757280-5bdc-11eb-99e8-ee43b83bc038.gif)


### 문제
q1. JavaScript - 주어진 템플릿(`q_index.html`)의 요소에 페이지에 맞는 요소를 표현하는 문제
q2. jQuery 
  1. JavaScript로 구현한 기능을 동일하게 jQuery로도 구현해보는 문제
  2. https://jquerymodal.com/ 문서를 참조해서
  3. 자바스크립트 소스 없이 완성하세요

q3. React - 주어진 코드를 이해하고, 상태를 조작하는 훅을 이용해서 완성


### 풀이 참고
q_index.html안에 body-blackout이 모달 바탕화면이고, Modal 보다 z-index 가 낮다. body-blackout 위로 Modal 이 뜬다.

- 팝업 띄우기 클릭시 is--visible 클래스를 활성화


### 주요 학습 키워드
- CSS의 z-index를 사용하여 팝업 / 배경 순서 위치 지정하기
- CSS의 pointer-events를 사용하여 popup이 없을 때, 이벤트가 발생하지 않도록 설정하기
- classList를 사용하여 버튼에 click event 발생 시, 팝업 보여주고 닫아주기


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/q1_js/q1_index.js`

**q2**
`./question/q2_jquery/q2_index.html`
*https://jquerymodal.com/ 문서를 참조해서 자바스크립트 소스 없이 CDN을 html파일에 추가하여 완성하세요*

**q3**
`./question/q3_react/src/App.js`
`./question/q3_react/src/BodyBlackout.js`
`./question/q3_react/src/Modal.js`
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