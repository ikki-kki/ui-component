## Case29 : Auto Complete 1

### 케이스 주제
- 검색어 자동완성 기능 만들기

(현업에서 서비스를 만들때 화장품을 검색하거나 영상을 검색할때 등에 사용할 검색 자동완성 기능을 요구하는 경우가 많이 있습니다. 사용자는 이 기능으로 내가 검색한 내용과 관련된 다른 검색어들을 알 수 있게 되어 사용자에게 정보 편의성이 주어지고 서비스 입장에서는 사용자로부터 더 많은 검색을 이끌어낼 수 있습니다.)


Q. 아래와 같은 스펙을 가진 검색 자동완성 기능을 만들어보세요.


### 기능 요구사항

1. 하나의 input tag를 만든다.
2. 이 input에 키보드 타이핑이 될때 현재 검색어 기준으로 관련 검색어 API를 호출한다.
- 이때 API 호출은 즉각 실행하길 바라는 경우
- 타이핑을 멈추고 0.5초 등의 시간이 지나고 요청하는 경우가 있다.
3. 검색어 API가 진행 중일때 input tag 우측에 loading 중임을 표시한다.
4. 검색어 API Response가 도착하면 그 내용을 input tag 아래에 리스트로 보여준다.


### 기능 작동 이미지
![example_image](./example.gif)


### 문제
q1. Javascript
- 가장 마지막 타이핑이 일어나고 0.5초 뒤에 API Request를 실행하도록 하는 debounce logic을 작성하시오.

q2. RxJS를 이용해 스트림 구조로 동일한 기능을 작성하시오

### 주요 학습 키워드 
- fetch와 async, await를 이용한 API호출
- 지연시간을 적용하여 마지막 이벤트만 발생시키는 debounce를 이용해, 
  마지막으로 타이핑을 한 순간에 API를 호출 할 수 있는 기능 구현 
- slice, map 함수를 사용하여 특정조건에 맞는 검색어를 특정갯수만큼 노출 시키는 기능 구현 


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/1. Vanilla JavaScript/src/app.js`

**q2**
`./question/2. RxJS/src/app.js`


### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/1. Vanilla JavaScript`

터미널
```bash
  $ npm install
  $ npm start
```

**q2**
경로
`./question/2. RxJS`

터미널
```bash
  $ npm install
  $ npm start
```


#### `./solution/2.other` 풀이 실행 시
**q1**
경로
`./solution/2.other/1. Vanilla JavaScript`
index.html 열기

**q2**
경로
`./solution/2.other/2. RxJS`

터미널
```bash
  $ npm install
  $ npm run dev
```


