## Case6 : Tabs


### 케이스 주제
Q. 아래와 같이 작동하는 탭 메뉴를 구현하시오.


### 기능 요구사항
요구 사항은 아래와 같다.

1. 비동기 함수인 fetchTabsData 함수를 사용해 탭 메뉴 정보를 담고 있는 배열을 전달받아 탭 메뉴를 생성한다.
2. fetchTabsData 함수는 프로미스를 반환하며 이 프로미스가 fulfilled 상태가 될 때까지는 1초 소요된다. 프로미스가 fulfilled 상태가 될 때까지 스피너(.spinner 요소)를 표시한다.
3. 탭 정보를 담고 있는 배열의 length는 가변적이다.

#### React
1. 함수 컴포넌트와 훅을 사용해 구현한다.
2. 스타일은 CSS, Sass, CSS Module, styled-components 중 어느 것을 사용해도 좋으나 가급적 styled-components 사용을 권장한다.


### 실행 방법 / 문제 풀이 방법
q1. Javascript - index.html 실행
q2. React

>  $ yarn install
>  $ yarn start


### 주요 학습 키워드
- [비동기 처리와 Promise](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Introducing)
- [React hook을 사용해 데이터 패칭하기](https://www.robinwieruch.de/react-hooks-fetch-data)


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/q1_js/src/app.js`

**q2**
`./question/q2_react/src/App.js`
*이외 필요한 디렉토리 / 파일들은 각자 작성하시면 됩니다.*


### 실행 방법 및 의존성 모듈 설치

**q1**
경로
`./question/q1_js`
index.html 열기

**q2**
경로
`./question/q2_react`

터미널

```bash
  $ yarn install
  $ yarn start
```
