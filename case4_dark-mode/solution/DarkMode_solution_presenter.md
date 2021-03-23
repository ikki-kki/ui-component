## Case4 : DarkMode - 출제자 해설

### q1. Javascript

#### A)

```js
document.addEventListener('DOMContentLoaded', () => {
    // 1. 로컬 스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
    const theme = localStorage.getItem('theme');

    // 2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
    if (!theme) localStorage.setItem('theme', 'light');

    // 로컬스토리지에 저장된 theme가 dark이면 body 요소에 dark 클래스를 추가하고 그렇지 않으면 제거한다.
    document.body.classList.toggle('dark', theme === 'dark');

    // 3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
    // .toggle-button-switch 요소와 .toggle-button-text 요소는 0.3초(duration)에 걸쳐 transition이 일어나도록 되어 있다.
    setTimeout(() => {
        document.body.style.visibility = 'visible';
    }, 300);
});

// 4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
document.querySelector('.toggle-button').onclick = () => {
    // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
    localStorage.setItem('theme', `${localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}`);

    // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
    document.body.classList.toggle('dark');
};
```

### q1. Javascript-1

#### A)

```js
document.addEventListener('DOMContentLoaded', () => {
    // 1. 로컬 스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
    const theme = localStorage.getItem('theme');

    // 2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
    if (!theme) localStorage.setItem('theme', 'light');

    // 로컬스토리지에 저장된 theme가 dark이면 body 요소에 dark 클래스를 추가하고 그렇지 않으면 제거한다.
    document.body.classList.toggle('dark', theme === 'dark');

    // 3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
    // .toggle-button-switch 요소와 .toggle-button-text 요소는 0.3초(duration)에 걸쳐 transition이 일어나도록 되어 있다.
    setTimeout(() => {
        document.body.style.visibility = 'visible';
    }, 300);
});

// 4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
document.querySelector('.toggle-button').onclick = () => {
    // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
    localStorage.setItem('theme', `${localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}`);

    // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
    document.body.classList.toggle('dark');
};
```

### q2. Javascript-2

```js
document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme');

    // 1. 로컬 스토리지에 저장된 테마가 없다면 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 테마에 적용한다.
    // 2. 로컬 스토리지에 저장된 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.
    if (!theme) {
        // 사용자 OS 테마가 다크 모드이면 matches는 ture다.
        const {
            matches
        } = window.matchMedia('(prefers-color-scheme: dark)');
        theme = matches ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    // 로컬스토리지에 저장된 theme가 dark이면 body 요소에 dark 클래스를 추가하고 그렇지 않으면 제거한다.
    document.body.classList.toggle('dark', theme === 'dark');
    // FOIT 방지
    setTimeout(() => {
        document.body.style.visibility = 'visible';
    }, 300);
});

document.querySelector('.toggle-button').onclick = () => {
    // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
    localStorage.setItem('theme', `${localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}`);

    // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
    document.body.classList.toggle('dark');
};
```

### q3. React
#### A)
- 해설 영상 참조