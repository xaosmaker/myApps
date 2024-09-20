import CountDownLaps from "./CountDownLaps";
import SetLaps from "./SetLaps";
// import useCountDownTimer from "./useCountDownTimer";

export default function CountDownTimer() {
  // const { timeRemaining } = useCountDownTimer([1, 2, 3]);
  return (
    <div className=" flex h-full w-full flex-col items-center justify-center">
      <SetLaps />
      <CountDownLaps />
    </div>
  );
}
