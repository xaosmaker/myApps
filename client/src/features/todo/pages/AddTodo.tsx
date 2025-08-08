import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../../../components/Input";
import { useMutation } from "@tanstack/react-query";
import { apiCreateTodos } from "../../../services/todosApi";
import { useNavigate } from "react-router-dom";
import { dateToGRformat } from "../../../utils/helperFunctions";
import type { TodoData } from "../types/todoTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddTodo() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (todoData: TodoData) => apiCreateTodos(todoData),
    onSuccess: (data: TodoData) => {
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
    if (data.title === "") {
      data.title = dateToGRformat(data.complete_until) || data.complete_until;
    }
    if (data.todo_tasks === undefined) {
      data.todo_tasks = [];
    }
    mutate(data);
  };
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="h-fit w-1/2">
        <CardHeader>
          <CardTitle>Create Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onHandleSubmit)}
            className="mb-10 flex flex-col gap-5"
          >
            <Input
              htmlType="text"
              required={false}
              name="title"
              error={errors.title}
              register={register("title")}
              displayName="Todo List Title"
            />
            <span className="flex items-center justify-center gap-2">
              <span className="uppercase">expires:</span>
              <Input
                htmlType="date"
                name="complete_until"
                error={errors.complete_until}
                register={register("complete_until")}
                displayName=" "
              />
            </span>
            <div className="">
              <Button type="submit">Next</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
