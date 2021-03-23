document.querySelector('.stopwatch').onclick = (() => {
  let isRunning = false;
  let elapsedTime = { mm: 0, ss: 0, ms: 0 };
  let laps = [];

  const [$btnStartOrStop, $btnResetOrLap] = document.querySelectorAll('.stopwatch > .control');

  // 1) 스톱워치의 경과 시간을 '00:00:00' 형식의 문자열로 변환한다.
  const formatElapsedTime = (() => {
      // 1 => '01', 10 => '10'
      // Do Something Here!
  })();


  // 2) 스톱워치의 경과 시간을 렌더링한다.
  const renderElapsedTime = (() => {
      // Do Something Here!
  })();


  // 3) 랩 타임을 렌더링한다.
  const renderLaps = (() => {
      // Do Something Here!
  })();


  // 4) Start/Stop 버튼 클릭 이벤트 핸들러
  const handleBtnStartOrStop = (() => {
      // Do Something Here!
  })();


  // 5) Reset/Lap 버튼 클릭 이벤트 핸들러
  const handleBtnResetOrLap = (() => {
      // Do Something Here!
  })();


  return ({ target }) => {
      if (!target.classList.contains('control')) return;
      target === $btnStartOrStop ? handleBtnStartOrStop() : handleBtnResetOrLap();
  };
})();