document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme');

    // 1. 로컬 스토리지에 저장된 테마가 없다면 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 테마에 적용한다.
    // 2. 로컬 스토리지에 저장된 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.
    if (!theme) {
        // 사용자 OS 테마가 다크 모드이면 matches는 ture다.
        const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
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

document.querySelector('.toggle-button').onclick = e => {
    const theme = localStorage.getItem('theme');

    // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
    localStorage.setItem('theme', `${theme === 'dark' ? 'light' : 'dark'}`);

    // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
    document.body.classList.toggle('dark');
};