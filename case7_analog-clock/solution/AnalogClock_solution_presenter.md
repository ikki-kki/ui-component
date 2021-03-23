## Case7 : Analog 1 - 출제자 해설

### q1. Javascript

#### A)

```js
const renderTime = (() => {
    const $hourHand = document.querySelector('.hand.hour');
    const $minuteHand = document.querySelector('.hand.minute');
    const $secondHand = document.querySelector('.hand.second');

    return () => {
        const date = new Date();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();

        // Updating a CSS variable(CSS custom property)
        // @see: https://css-tricks.com/updating-a-css-variable-with-javascript
        // 초침: 1초당 6도(360deg/60s) 회전
        $secondHand.style.setProperty('--deg', seconds * 6);
        // 분침: 1시간당 360도, 1분당 6도(360deg/60m), 1초당 0.1도(6deg/60s) 회전
        $minuteHand.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
        // 시침: 1시간당 30도(360deg/12h), 1분당 0.5도(30deg/60m), 1초당 약 0.0083도(0.5deg/60s) 회전
        $hourHand.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    setInterval(renderTime, 1000);
});
```

### q2. React

#### A)
- 해설 영상 참조