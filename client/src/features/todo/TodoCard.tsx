import ShowTodo from "./ShowTodo";
import { dateToGRformat } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";
import { TodoData } from "../../types/dataTypes";
import { Checked, Unchecked } from "../../img/svgsExport";

export default function TodoCard({ todoList }: { todoList: TodoData }) {
  return (
    <Link to={`/todos/${todoList.pkid}/add-edit-todo`}>
      <div className="">
        <div
          className={`flex items-center justify-center ${
            todoList.is_completed_in_time ? "bg-green-900" : "bg-slate-800"
          } px-2 py-2 `}
        >
          <p>{todoList.is_completed ? <Checked /> : <Unchecked />}</p>
          <div className=" flex w-full flex-col items-center justify-center   gap-2 ">
            <h3 className="mx-auto text-xl font-semibold capitalize">
              {todoList.title}
            </h3>
            <p className="text-sm">
              <span className="mr-1 uppercase">expires:</span>
              {dateToGRformat(todoList.complete_until)}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2  bg-slate-700 px-4 pt-2">
          {todoList?.todo_tasks?.slice(0, 10).map((todo) => (
            <ShowTodo key={todo.pkid} todo={todo} />
          ))}
        </div>
      </div>
    </Link>
  );
}
