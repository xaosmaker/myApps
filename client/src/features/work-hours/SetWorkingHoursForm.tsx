import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import { SetShift } from "../../types/dataTypes";

export default function SetWorkingHoursForm() {
  const {
    register,
    formState: { errors },
  } = useForm<SetShift>();
  return (
    <form className="mt-10 flex flex-col gap-6">
      <span className="text-center text-2xl uppercase">Add Shift</span>
      <Input
        htmlType="text"
        register={register("company")}
        name="company"
        error={errors.company?.message}
      />
      <Input
        htmlType="time"
        register={register("startOfShift")}
        name="start of shift"
        error={errors.startOfShift?.message}
      />
      <Input
        htmlType="time"
        register={register("endOfShift")}
        name="end of shift"
        error={errors.endOfShift?.message}
      />
      <Button type="submit">Add Shift</Button>
    </form>
  );
}
