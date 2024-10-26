import { baseGet, basePost } from "../../../services/baseServices";
import { WorkShiftFormType } from "../types/WorkHoursTypes";

const getWorkShifts = async () => {
  return await baseGet("/api/work-shifts/", "", "Can't get shifts");
};
const createWorkShift = async (data: WorkShiftFormType) => {
  return await basePost("/api/work-shifts/", data, "Can't create work Shifts");
};

export { getWorkShifts, createWorkShift };
