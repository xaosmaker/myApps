import axios from "../../../services/axiosInstance";
import { baseGet, basePost } from "../../../services/baseServices";
import type {
  WorkDayFormType,
  WorkShiftFormType,
} from "../types/WorkHoursTypes";
import { AxiosError } from "axios";

const getWorkShifts = async () => {
  return await baseGet("/api/work-shifts/", "", "Can't get shifts");
};
const createWorkShift = async (data: WorkShiftFormType) => {
  return await basePost("/api/work-shifts/", data, "Can't create work Shifts");
};

const getWorkDays = async () => {
  return await baseGet("/api/work-day/", "", "Can't get Work Days");
};
async function addWorkDays(payload: WorkDayFormType) {
  try {
    const res = await axios.post("/api/work-day/", payload);
    const data = await res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    console.log(12, error);
  }
  // return await basePost("/api/work-day/", payload, "Can't create Work Day");
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

export async function deleteWorkShift(id: string) {
  try {
    const res = await axios.delete(`/api/work-shifts/${id}/`);
    const data = await res.data;
    return data;
  } catch {
    return;
  }
}

export { getWorkShifts, createWorkShift, getWorkDays, addWorkDays };
