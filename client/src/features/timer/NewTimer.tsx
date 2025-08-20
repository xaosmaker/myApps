import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CircularProgress from "@/components/CircularProgress";

//TODO: logic seems to work correct need the ui

interface Timer {
  laps: number;
  timersList: number[];
  currentTimer: number;
  currentLap: number;
  timerFinish: boolean;
  isPaused: boolean;
}

export default function NewTimer() {
  const [timer, setTimer] = useState<Timer>({
    laps: 2,
    timersList: [80, 4, 3, 2],
    currentTimer: 0,
    currentLap: 1,
    timerFinish: false,
    isPaused: true,
  });
  const [countDown, setCountDown] = useState<number>(
    timer.timersList[timer.currentTimer],
  );

  function setNextTimer() {
    let nextTimer = timer.currentTimer + 1;
    let isFinishTimer = false;

    if (nextTimer >= timer.timersList.length) {
      nextTimer = -1;
      isFinishTimer = true;
    }

    setTimer((timer) => ({
      ...timer,
      currentTimer: nextTimer,
      timerFinish: isFinishTimer,
    }));

    if (!isFinishTimer) {
      setCountDown(() => timer.timersList[nextTimer]);
    }
  }

  function setNextLap() {
    if (timer.currentLap < timer.laps) {
      setTimer((timer) => ({
        ...timer,
        timerFinish: false,
        currentLap: timer.currentLap + 1,
      }));
    }
  }

  if (countDown <= -1 && !timer.timerFinish) {
    setNextTimer();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown < 0) {
        return () => clearInterval(interval);
      }
      if (!timer.isPaused) {
        setCountDown((item) => (item -= 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown, timer.isPaused]);

  const progres = 100 / timer.timersList[timer.currentTimer];
  const val = (countDown * progres) | 0;

  return (
    <div className="flex items-center justify-center">
      <div>
        <CircularProgress
          progress={val}
          progressVal={countDown === -1 ? 0 : countDown}
        />

        <Button
          onClick={() =>
            setTimer((data) => ({ ...data, isPaused: !data.isPaused }))
          }
        >
          {timer.isPaused ? "start" : countDown === -1 ? "start" : "pause"}
        </Button>
        <Button onClick={setNextLap}>next Lap</Button>
      </div>
    </div>
  );
}
