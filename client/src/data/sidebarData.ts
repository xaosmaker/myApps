import { AlarmClock, AlarmClockPlus, ClockPlus, FileClock, IdCard, ListPlus, ListTodo, Plus } from "lucide-react";
import { type data } from "../types/dataTypes";

const WORKHOURS_SIDEBAR_DATA: data[] = [
  {
    icon: AlarmClock,
    to: "work-hours/show-work-time",
    name: "Show Work Time",
  },
  { icon: AlarmClockPlus, to: "work-hours/add-work-time", name: "Add Work Hours" },
  { icon: FileClock, to: "work-hours/sum-work-time", name: "Sum Work Time" },
  { icon: ClockPlus, to: "work-hours/work-shifts", name: "Set Work Time" },
];

const TODOS_SIDEBAR_DATA: data[] = [
  { icon: ListTodo, to: "todos/show-todos", name: "Show Todos" },
  { icon: ListPlus, to: "todos/add-todo", name: "Add Todo" },
];


const NUTRITIONS_DATA: data[] = [
  {
    icon: ListTodo,
    to: "nutritions/show-nutritions",
    name: "Show Nutritions",
  },
  { icon: Plus, to: "nutritions/add-nutritions", name: "Add Nutritions" },
  {
    icon: IdCard,
    to: "nutritions/user-weight-data",
    name: "User Weight Data",
  },
];

const GYM_DATA: data[] = [
  {
    icon: ListTodo,
    to: "gym/show-gym",
    name: "Show Gym",
  },
  { icon: Plus, to: "gym/add-gym", name: "Add Gym Day" },
];

export {
  WORKHOURS_SIDEBAR_DATA,
  TODOS_SIDEBAR_DATA,
  NUTRITIONS_DATA,
  GYM_DATA,
};
