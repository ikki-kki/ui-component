## Case5 : Stop watch

### 케이스 주제
Q. 아래와 같이 작동하는 스톱워치를 구현하시오.


### 기능 요구사항
1. 스톱워치의 시간은 mm:ss:ms 형식(예시 '01:59:89')으로 표시한다.

| 구분 | 의미  | 범위     | 비고
|:----|:-----|:-------|:--
| mm  | 분    | 0 ~    |
| ss  | 초    | 0 ~ 59 |
| ms  | 미리초 | 0 ~ 99 | 미리초는 100분의 1초를 나타내지만 10ms 단위로 표시한다.


2. 컨트롤 버튼

- 스톱워치는 2개의 컨트롤 버튼을 가진다.
- 왼쪽 버튼: 클릭할 때마다 Start/Stop으로 토글된다.
- 오른쪽 버튼: 오른쪽 버튼은 아래와 같이 왼쪽 버튼에 종속적이다. 왼쪽 버튼이 Start이면 오른쪽 버튼은 Reset이고 왼쪽 버튼이 Stop이면 오른쪽 버튼은 Lap이다.

| 왼쪽 버튼 | 오른쪽 버튼
|:--------|:------------
| Start   | Reset
| Stop    | Lap

- 각 버튼의 기능은 다음과 같다.

| 버튼   | 기능
|:------|:----------------------------
| Start | 스톱워치를 시작한다.
| Stop  | 스톱워치를 일시정지시킨다.
| Reset | 스톱워치와 랩 타임을 초기화한다. 스톱워치의 현재 시간이 '00:00:00'이면 disabled 상태이어야 한다.
| Lap   | 랩 타임을 기록한다.


### 기능 작동 이미지
![stopwatch](./assets/stopwatch.gif)


### 문제
1. JS
- 스톱워치 경과 시간을 '00:00:00' 형식의 문자열로 변환
- 스톱워치 경과 시간을 렌더링
- 랩 타임 렌더링
- Start/Stop 버튼 클릭 이벤트 핸들러
- Reset/Lap 버튼 클릭 이벤트 핸들러

2. React
- 함수 컴포넌트와 훅을 사용해 구현한다.
- 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.


### 주요 학습 키워드
- [CSS 그리드 레이아웃](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)
- [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
- [Document.createDocumentFragment](https://developer.mozilla.org/ko/docs/Web/API/Document/createDocumentFragment)
- [useState](https://ko.reactjs.org/docs/hooks-state.html)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/1.js/index.js`

**q2**
`./question/2.react/src/App.js`
이외 필요한 디렉토리 / 파일구조는 각자 작성하시면 됩니다.


### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/1.js`
index.html 열기

**q6**
경로
`./question/2.react`

터미널
```bash
  $ npm install
  $ npm start
```