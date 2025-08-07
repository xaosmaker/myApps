import { useParams } from "react-router-dom";
import { useTodoQuery } from "../hooks/useTodoQuery";
import { dateToGRformat } from "@/utils/helperFunctions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodoCardItem from "../components/TodoCardItems";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import type { TodoTaskData } from "../types/todoTypes";
import { useCreateTodo } from "../hooks/useCreateTodo";
import { useEffect } from "react";

export default function AddEditTodo() {
  const { pkid } = useParams<{ pkid: string }>();
  const { register, reset, handleSubmit } = useForm<TodoTaskData>({
    defaultValues: {
      is_completed: false,
    },
  });

  const { isCreateTodoItemLoading, createTodoItemMutate, isCreateTodoSuccess } =
    useCreateTodo();

  const { singleTodoData, isTodoLoading } = useTodoQuery(pkid!);
  const { deleteMutate } = useDeleteTodo();

  function onHandleSubmit(data: TodoTaskData) {
    const fullData = singleTodoData!;
    fullData?.todo_tasks.push(data);
    createTodoItemMutate(fullData);
  }

  useEffect(() => {
    if (isCreateTodoSuccess) {
      reset();
    }
  }, [isCreateTodoSuccess, reset]);

  if (isTodoLoading || !singleTodoData) {
    return <div>isLoading</div>;
  }
  const { title, todo_tasks, complete_until } = singleTodoData;

  return (
    <Card className="m-10">
      <CardHeader className="pt-2">
        <CardTitle>Add Edit Todo</CardTitle>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex flex-col gap-4">
          <div>EXRIRES: {dateToGRformat(complete_until)}</div>
          <form
            className="flex flex-col gap-4 md:flex-row"
            onSubmit={handleSubmit(onHandleSubmit)}
          >
            <Input
              error={undefined}
              htmlType="text"
              name="name"
              displayName="add Todod"
              register={register("name")}
            />
            <Button type="submit" disabled={isCreateTodoItemLoading}>
              Create Todo
            </Button>
          </form>
        </CardDescription>
      </CardHeader>
      <CardContent key={pkid} className="h-full rounded-md bg-slate-700 py-2">
        {todo_tasks.map((item) => (
          <TodoCardItem
            key={item.name + item.pkid}
            todo={item}
            deleteButton={true}
            deleteFunc={deleteMutate(Number(item.pkid))}
          />
        ))}
      </CardContent>
    </Card>
  );
}
