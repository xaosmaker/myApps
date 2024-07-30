import React from "react";
export type data = {
  icon: React.FC;
  to: string;
  name: string;
};

export type AddWorkDayData = {
  date: string;
  day: string;
  startOfWork: string;
  endOfWork: string;
  location: string;
  comment: string;
};

export type SetShift = {
  company: string;
  startOfShift: string;
  endOfShift: string;
};

export interface TodoData {
  pkid: number;
  title: string;
  complete_until: string;
  expired: boolean;
  completed: boolean;
  completed_in_time: boolean;
  todo_tasks: TodoTaskData[];
}

export interface TodoListData {
  count: number;
  next: number | null;
  previous: number | null;
  results: TodoData[];
}

export interface TodoTaskData {
  pkid?: number;
  name: string;
  is_completed: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
