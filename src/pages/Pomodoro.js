import { useState, useEffect, useRef } from "react";
import Input from "../components/ui/Input";
import beepBreakSound from "../components/assets/beepStartBreak.wav";
import beepFocusSound from "../components/assets/beepStartFocus.wav";
import Header from "../components/ui/Header";

const Pomodoro = () => {
  // Pomodoro

  // set initial time to 25 minutes (25 * 60)
  const [time, setTime] = useState(25 * 60);
  const [activeClock, setActiveClock] = useState(false);
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time - minutes * 60).toString().padStart(2, "0");

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

  return (
    <>
      <Header />
      <div>
        <main>
          {count}
          <div className="card">
            <h1 className="body">
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </h1>
            <div className="footer">
              <button onClick={handleAction}>
                {activeClock ? "Stop" : "Start"}
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className="my-4">
            <Input
              label="What're you working on?"
              type="text"
              val={task}
              setVal={setTask}
              className="w-[20rem]"
            />
          </div>
        </main>
      </div>
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
    </>
  );
};

export default Pomodoro;
