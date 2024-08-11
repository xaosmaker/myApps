import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { apiCreateTodos } from "../../services/todosApi";
import { useNavigate } from "react-router-dom";
import { TodoData } from "../../types/dataTypes";

export default function AddToDoList() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (todoData: TodolistData) => apiCreateTodos(todoData),
    onSuccess: (data: TodolistData) => {
      if (data.pkid) {
        navigate(`/todos/${data.pkid}/add-edit-todo`);
      }
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoData>();
  const onHandleSubmit: SubmitHandler<TodoData> = (data, event) => {
    event?.preventDefault();
    if (data.todo_tasks === undefined) {
      data.todo_tasks = [];
    }
    mutate(data);
  };
  return (
    <div className="w-1/2 ">
      <h2 className="mb-10 text-center text-2xl capitalize">
        Create Todo List
      </h2>
      <form
        onSubmit={handleSubmit(onHandleSubmit)}
        className="mb-10 flex flex-col gap-5"
      >
        <Input
          htmlType="text"
          name="title"
          error={errors?.title?.message}
          register={register("title")}
          displayName="Todo List Title"
        />
        <span className=" flex items-center justify-center gap-2">
          <span className=" uppercase">expires:</span>
          <Input
            htmlType="date"
            name="complete_until"
            error={errors.complete_until?.message}
            register={register("complete_until")}
            displayName=" "
          />
        </span>
        <div className="">
          <Button buttonType="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
