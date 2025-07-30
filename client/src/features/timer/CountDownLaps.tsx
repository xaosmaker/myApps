import { useEffect } from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import {
  decrementTimeRemaining,
  resetCountDown,
  startTimer,
  stopTimer,
} from "../../store/countDownslice";

export default function CountDownLaps() {
  const { timeRemaining, isRuning, currentLap, laps } = useSelector(
    (state: RootState) => state.countDown
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (isRuning) {
      const interval = setInterval(() => {
        dispatch(decrementTimeRemaining());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, isRuning, timeRemaining]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        Laps: {currentLap} of {laps}
      </div>
      {/* <div>title</div> */}
      <div
        className={`flex h-56 w-56 items-center justify-center ${timeRemaining > 5
            ? timeRemaining % 2 === 0
              ? "ring-green-600"
              : "ring-green-800"
            : timeRemaining % 2 === 0
              ? "ring-red-600"
              : "ring-red-800"
          } rounded-full bg-slate-800 text-8xl ring-2 transition-all duration-1000 ease-in-out`}
      >
        {timeRemaining}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => dispatch(startTimer())}
          type="button"
          buttonType="primary"
        >
          start
        </Button>
        <Button
          onClick={() => dispatch(stopTimer())}
          type="button"
          buttonType="danger"
        >
          Stop
        </Button>
        <Button onClick={() => dispatch(resetCountDown())} type="button">
          Reset
        </Button>
      </div>
    </div>
  );
}
