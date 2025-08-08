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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Plus } from "lucide-react";

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
  const { title, todo_tasks, complete_until, expired, completed } =
    singleTodoData;

  const isExpiredORCompleted = expired || completed;

  return (
    <Card className="m-10">
      <CardHeader className="relative pt-2">
        <CardTitle className="mb-4 text-2xl">Add Edit Todo</CardTitle>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex flex-col gap-4">
          <div>EXRIRES: {dateToGRformat(complete_until)}</div>
        </CardDescription>

        <Popover>
          {!isExpiredORCompleted && (
            <PopoverTrigger className="absolute right-5 bottom-0" asChild>
              <Button className="rounded-full">
                <Plus />
              </Button>
            </PopoverTrigger>
          )}
          <PopoverContent
            sideOffset={5}
            side="bottom"
            align="center"
            className="bg-card rounded-lg border-2 p-6"
          >
            <form
              className="flex flex-col gap-6 md:flex-row"
              onSubmit={handleSubmit(onHandleSubmit)}
            >
              Create Task
              <Input
                error={undefined}
                htmlType="text"
                name="name"
                displayName="add Todod"
                register={register("name")}
              />
              <Button
                type="submit"
                variant="outline"
                disabled={isCreateTodoItemLoading}
              >
                Create Todo
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent key={pkid} className="h-full rounded-md bg-slate-700 py-2">
        {todo_tasks.map((item) => (
          <TodoCardItem
            key={item.name + item.pkid}
            todo={item}
            deleteButton={!isExpiredORCompleted}
            deleteFunc={deleteMutate(Number(item.pkid))}
          />
        ))}
      </CardContent>
    </Card>
  );
}
