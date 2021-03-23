import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <h1 class="title">Stopwatch</h1>
    <div class="stopwatch">
      <div class="display">00:00:00</div>
      <button class="control">Start</button>
      <button class="control" disabled>Reset</button>

      <div class="laps">
        <div class="lap-title">Laps</div>
        <div class="lap-title">Time</div>
      </div>
    </div>
    </>
  );
}

export default App;
