import Input from "../../components/Input";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { DiaryChoicesData, DiaryNoteData } from "../../types/dataTypes";
import { timeToHumanReadable } from "../../utils/helperFunctions";
import Select from "../../components/Select";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiDiaryNoteCreate } from "../../services/diaryApi";

export default function AddDiary() {
  const choices = useLoaderData() as [DiaryChoicesData];
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DiaryNoteData>({
    defaultValues: {
      time: timeToHumanReadable(),
    },
  });
  const { mutate } = useMutation({
    mutationFn: (data: DiaryNoteData) => apiDiaryNoteCreate(data),
    onSuccess: () => navigate("/daily-diary/show-diary"),
  });
  function onHandleSubmit(data: DiaryNoteData) {
    mutate(data);
  }
  return (
    <div className="w-11/12 md:w-1/2">
      <h2 className="mb-10 text-center text-2xl capitalize">Diary</h2>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="mb-10 flex flex-col gap-5"
      >
        <Select register={register("note_type")}>
          {choices?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.display_name}
            </option>
          ))}
        </Select>

        <span className=" flex items-center justify-center gap-2">
          <span className=" uppercase">Time:</span>
          <Input
            htmlType="time"
            name="time"
            error={errors.time?.message}
            register={register("time")}
            displayName=" "
          />
        </span>

        <Input
          htmlType="textarea"
          text="textarea"
          required={true}
          name="note"
          error={errors?.note?.message}
          register={register("note")}
        />
        <div className="">
          <Button buttonType="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
