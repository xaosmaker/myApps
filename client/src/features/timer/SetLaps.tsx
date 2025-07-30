import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import {
  validateHasCommasAndSpacesOnly,
  validateIsNumber,
  validateSplitWithRegexAndGT0,
} from "../../utils/valitators";
import {
  type CountDownSliceInitial,
  setCountDown,
} from "../../store/countDownslice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
interface FormData {
  laps: string;
  countDownTimers: string;
}

export default function SetLaps() {
  const dispatch = useDispatch();
  const { initialValues } = useSelector((store: RootState) => store.countDown);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      laps: initialValues.laps.toString(),
      countDownTimers: initialValues.countDownTimers.join(", "),
    },
  });
  function onSubmit(data: FormData) {
    const data2 = data.countDownTimers
      .split(/[ ,]+/)
      .map((item) => Number(item));
    const payload: CountDownSliceInitial = {
      laps: Number(data.laps),
      countDownTimers: data2,
    };
    dispatch(setCountDown(payload));
  }
  return (
    <>
      <p className="mb-10 text-lg capitalize tracking-normal">
        you can set multiple countdown timers just using &nbsp; "," &nbsp; in
        Countdown Timers field values.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-10 flex gap-2">
        <Input
          htmlType="text"
          name="laps"
          displayName="set laps"
          register={register("laps", {
            validate: {
              validateisNumber: (v) =>
                validateIsNumber(v) || "Only Digits allowed",
              validateNumberGRTzero: (v) =>
                Number(v) > 0 || "Sould be Greater Than Zero",
            },
          })}
          error={errors.laps?.message}
        />
        <Input
          htmlType="text"
          displayName="countdown timers"
          register={register("countDownTimers", {
            validate: {
              hasCommaAndSpacesOnly: (v) =>
                validateHasCommasAndSpacesOnly(v) ||
                "Sould contain number spaces and commas",
              hasZeroValues: (v) =>
                validateSplitWithRegexAndGT0(v, /[ ,]+/) ||
                "Values must be Greater Than Zero",
            },
          })}
          name="countDownTimers"
          error={errors.countDownTimers?.message}
        />
        <Button buttonType="primary" type="submit">
          Set Timer
        </Button>
      </form>
    </>
  );
}
