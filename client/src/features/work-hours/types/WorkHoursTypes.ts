export type AddWorkDayData = {
  date: string;
  day: string;
  startOfWork: string;
  endOfWork: string;
  location: string;
  comment: string;
};

export type WorkShiftFormType = {
  company: string;
  start_of_shift: string;
  end_of_shift: string;
};
export interface WorkShiftType extends WorkShiftFormType {
  pkid: number;
  created_at: string;
}
