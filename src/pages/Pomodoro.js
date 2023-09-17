import { useState, useEffect, useRef } from "react";
import beepBreakSound from "../components/assets/beepStartBreak.wav";
import beepFocusSound from "../components/assets/beepStartFocus.wav";
import Header from "../components/ui/Header";

const Pomodoro = ({ user, setUser }) => {
  // set initial time to 25 minutes (25 * 60)
  const [time, setTime] = useState(25 * 60);
  const [activeClock, setActiveClock] = useState(false);

  const [breakTime, setBreakTime] = useState(false);
  const [count, setCount] = useState(0);
  const beepStartPlayer = useRef();
  const beepFocusPlayer = useRef();
  useEffect(() => {
    if (activeClock) {
      const timerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setActiveClock(false);
            clearInterval(timerId);
            if (breakTime) {
              beepStartPlayer.current.play();
              setBreakTime(false);
              return 25 * 60;
            } else {
              setCount((prevCount) => prevCount + 1);
              beepFocusPlayer.current.play();
              setBreakTime(true);
              // 4 pomodoros completed, take a long break
              if (count === 5) {
                setCount(0);
                return 15 * 60;
              }
              // 1 pomodoro completed, take a short break
              return 5 * 60;
            }
          }
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [activeClock]);
  const handleAction = () => {
    setActiveClock(!activeClock);
  };
  const handleReset = () => {
    setActiveClock(false);
    setTime(20);
  };

  const [task, setTask] = useState("");
  const getFirstName = (user) => {
    return user?.displayName.split(" ")[0];
  };
  function getFormattedTime(time) {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time - minutes * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  return (
    <div className="pomodoro-page">
      <Header user={user} setUser={setUser} />
      <main>
        <div className="mb-8">
          <h4 className="greet">Hi {getFirstName(user)}</h4>
          <input
            type="text"
            id="task"
            value={task}
            placeholder="What are you working on?"
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
        <div className="card">
          <div className="body">
            <h4 className="mode">
              {breakTime ? "Break Time" : "Focus Time"}
            </h4>
            <h1>{getFormattedTime(time)}</h1>
          </div>
          <div className="footer">
            <button onClick={handleAction}>
              {activeClock ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </main>
      <audio
        style={{ display: "none" }}
        ref={beepStartPlayer}
        src={beepBreakSound}
      ></audio>
      <audio
        style={{ display: "none" }}
        ref={beepFocusPlayer}
        src={beepFocusSound}
      ></audio>
    </div>
  );
};

export default Pomodoro;
