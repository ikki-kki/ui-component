## Case4 : Dark mode

### 케이스 주제
Q. 다음과 같이 토글 버튼을 클릭하여 테마(다크 모드/라이트 모드)를 설정하면 테마가 뷰에 반영되도록 구현해보자. 테마는 로컬스토리지에 저장하여 웹페이지를 리로드하거나 다시 접근했을 때 저장된 테마를 적용하도록 한다.


### 기능 요구사항
1. 로컬스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
2. 로컬스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
3. 테마를 적용하여 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
4. 토글 버튼을 클릭하면 로컬스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.


### 기능 작동 이미지
<img src="assets/dark-mode.gif" alt="dark mode" style="width:300px;"/>

- 뷰의 기본 템플릿은 다음과 같다. body 요소에 dark 클래스를 추가하면 다크 모드가 적용되고 body 요소에서 dark 클래스를 제거하면 라이트 모드가 적용된다.

<img src="assets/dark-mode-toggle.gif" alt="dark mode toggle" style="width:500px;"/>


### 문제
1. JS
- 로컬스토리지에 저장된 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링
- 로컬스토리지에 저장된 테마가 없으면 라이트 모드로 초기 렌더링

2. JS
- 로컬스토리지에 저장된 테마가 없을 때 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 테마에 적용
- 로컬스토리지에 저장된 테마가 있으면 사용자 OS 테마보다 이를 우선하여 적용


3. React
바닐라 자바스크립트로 구현한 dark mode는 body 요소에 클래스를 추가/제거하는 방식으로 동작한다. React에서도 이 방식을 사용하면 컴포넌트에서 body 요소를 조작하는 부수 효과(side effect)에 의존하게 되므로 직관적이지 않고 컴포넌트의 재사용이 어려워지며 FOIT(flash of incorrect theme)을 방지하기도 번거롭다.

요구 사항은 다음과 같다.

- 함수 컴포넌트와 훅을 사용해 구현한다.
- [Styled-components의 ThemeProvider](https://styled-components.com/docs/advanced#theming)를 사용하면 간단하게 테마를 전역 관리할 수 있다. 테마(dark/light)를 객체로 정의하고 Styled-components의 ThemeProvider를 사용해 테마가 필요한 컴포넌트에게 전달한다.


### 주요 학습 키워드
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
- [prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)
- [window.matchMedia](https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia)
- [styled-components: theming](https://styled-components.com/docs/advanced#theming)
- [useState](https://ko.reactjs.org/docs/hooks-state.html)
- [useEffect](https://ko.reactjs.org/docs/hooks-reference.html#useeffect)
- [Context API](https://ko.reactjs.org/docs/context.html)
- [useContext](https://ko.reactjs.org/docs/hooks-reference.html#usecontext)


### 참고

Windows와 macOS 등은 운영 체제 레벨에서 사용자 테마(다크 모드/라이트 모드)를 설정할 수 있다.

<img src="assets/os-theme.png" alt="운영 체제 레벨 사용자 테마" style="width:500px;"/>

CSS의 [prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme) media query나 자바스크립트의 [window.matchMedia](https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia) 메서드를 사용하면 운영 체제 레벨에서 설정한 사용자 테마를 감지할 수 있다.

- [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme)

prefers-color-scheme media query와 window.matchMedia 메서드의 간단한 예제는 다음과 같다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .themed {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 100px;
        background-color: rgb(250, 250, 250);
      }
      .themed::after {
        content: 'Light mode(default)';
      }

      @media (prefers-color-scheme: dark) {
        .themed {
          background-color: #000;
          color: #fff;
        }
        .themed::after {
          content: 'Dark mode detacked';
        }
      }
    </style>
  </head>
  <body>
    <div class="themed"></div>
    <script>
      // https://web.dev/prefers-color-scheme
      // https://caniuse.com/?search=prefers-color-scheme
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      console.log(darkModeMediaQuery);
      // MediaQueryList {media: "(prefers-color-scheme: dark)", matches: true, onchange: null}

      darkModeMediaQuery.addListener(e => {
        const darkModeOn = e.matches;
        console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
      });
    </script>
  </body>
</html>
```


### 작성해주셔야 하는 question 파일경로
**q1**
`./question/1.js-1/index.js`

**q2**
`./question/2.js-2/index.js`

**q3**
`./question/3.react/src/App.js`
*이외 필요한 디렉토리 / 파일구조는 각자 작성하시면 됩니다.*


### 실행 방법 및 의존성 모듈 설치
**q1**
경로
`./question/1.js-1`
index.html 열기

**q2**
경로
`./question/2.js-2`
index.html 열기

**q3**
경로
`./question/3.react`

터미널
```bash
  $ npm install
  $ npm start
```