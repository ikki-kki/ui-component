import { useState, useEffect } from 'react';

const resoveTheme = () => {
  // 1. 로컬 스토리지에 저장된 테마가 없다면 window.matchMedia 메서드로 사용자 OS 테마를 감지해 이를 테마에 적용한다.
  // 2. 로컬 스토리지에 저장된 테마가 있다면 사용자 OS 테마보다 이를 우선 적용한다.
  let theme = localStorage.getItem('theme');

  if (!theme) {
    // 사용자 OS 테마가 다크 모드이면 matches는 ture다.
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    theme = matches ? 'dark' : 'light';
  }

  return theme;
};

const useTheme = () => {
  // lazy initialization
  const [theme, setTheme] = useState(resoveTheme);

  // theme가 변경되면 로컬 스토리지에 저장한다.
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // theme 변경 핸들러
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return [theme, toggleTheme];
};

export default useTheme;
