import axios from "@/services/axiosInstance";
import { baseGet, basePost } from "../../../services/baseServices";
import type {
  WorkDayFormType,
  WorkShiftFormType,
} from "../types/WorkHoursTypes";

const getWorkShifts = async () => {
  return await baseGet("/api/work-shifts/", "", "Can't get shifts");
};
const createWorkShift = async (data: WorkShiftFormType) => {
  return await basePost("/api/work-shifts/", data, "Can't create work Shifts");
};

const getWorkDays = async () => {
  return await baseGet("/api/work-day/", "", "Can't get Work Days");
};
async function addWorkDays(data: WorkDayFormType) {
  return await basePost("/api/work-day/", data, "Can't create Work Day");
}

export async function deleteWorkDay(id: string) {
  try {
    const res = await axios.delete(`/api/work-day/${id}/`);
    const data = await res.data;
    return data;
  } catch {
    return;
  }
}

export { getWorkShifts, createWorkShift, getWorkDays, addWorkDays };
