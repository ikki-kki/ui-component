document.addEventListener('DOMContentLoaded', () => {
    // 1. 로컬 스토리지에 저장되어 있는 테마(다크 모드/라이트 모드)를 기준으로 초기 렌더링한다.
    // 2. 로컬 스토리지에 저장된 테마가 없다면 라이트 모드로 초기 렌더링한다.
    // 3. 테마를 적용하여 초기 렌더링할 때 기존 테마가 변경되어 깜빡거리는 현상(flash of incorrect theme, FOIT)이 발생하지 않도록 한다.
    // Write JS Code Here!

});

// 4. 토글 버튼을 클릭하면 로컬 스토리지에 테마를 저장하고 저장된 테마를 기준으로 다시 렌더링한다.
document.querySelector('.toggle-button').onclick = () => {
    // 로컬스토리지에 저장된 theme가 dark이면 light로 변경하고 light이면 dark로 변경한다.
    // body 요소에 dark 클래스를 추가되어 있으면 제거히고 그렇지 않으면 추가한다.
    // Write JS Code Here!

};