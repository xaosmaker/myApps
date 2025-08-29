import type { DateRange } from "react-day-picker";

export type AddWorkDayData = {
  date: DateRange;
  day: string;
  startOfWork: string;
  work_day_shift: number;
  endOfWork: string;
  location: string;
  comment: string;
};
export type WorkDayFormType = {
  type_of_work_day: string;
  date_start: string;
  work_day_shift: number;
  location: string | null;
  start_of_work: string | null;
  end_of_work: string | null;
  comment: string | null;
};
export interface WorkDayType extends WorkDayFormType {
  pkid: number;
}
export type WorkShiftFormType = {
  company: string;
  start_of_shift: string;
  end_of_shift: string;
};
export interface WorkShiftType extends WorkShiftFormType {
  pkid: number;
  created_at: string;
}
