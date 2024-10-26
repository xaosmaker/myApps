import React from "react";
export type data = {
  icon: React.FC;
  to: string;
  name: string;
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
  current_page: number;
  total_pages: number;
  results: TodoData[];
  all_completed_todo: number;
  all_failed_todo: number;
  all_pending_todo: number;
}

export interface TodoTaskData {
  pkid: number | null;
  name: string;
  is_completed: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
export interface RefreshData {
  message: string;
}
