import { dateToGRformat } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";
import { TodoData } from "../../types/dataTypes";
import { Checked, Unchecked } from "../../img/svgsExport";
import ShowTodoTask from "./ShowTodoTask";

export default function TodoCard({ todoList }: { todoList: TodoData }) {
  return (
    <Link to={`/todos/${todoList.pkid}/add-edit-todo`}>
      <div className="">
        <div
          className={`flex items-center justify-center ${
            todoList.completed_in_time ? "bg-green-900" : "bg-slate-800"
          } ${todoList.expired ? "bg-red-800" : null} px-2 py-2 `}
        >
          <p>{todoList.completed ? <Checked /> : <Unchecked />}</p>
          <div className=" flex w-full flex-col items-center justify-center   gap-2 ">
            <h3 className="mx-auto text-xl font-semibold capitalize">
              {todoList.title}
            </h3>
            <p className="text-sm">
              {todoList.expired ? (
                <span className="uppercase">Expired</span>
              ) : (
                <span>
                  <span className="mr-1 uppercase">expires:</span>
                  {dateToGRformat(todoList.complete_until)}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2  bg-slate-700 px-4 pt-2">
          {todoList?.todo_tasks?.slice(0, 10).map((todo) => (
            <ShowTodoTask key={todo.pkid} todo={todo} />
          ))}
        </div>
      </div>
    </Link>
  );
}
