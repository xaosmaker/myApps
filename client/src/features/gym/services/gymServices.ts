import { baseGet, basePost } from "../../../services/baseServices";
import { GymMachineType, GymWorkoutType } from "../types/GymTypes";

async function getGymDayList(queryparmas = "") {
  return await baseGet("/api/gym-list/", queryparmas, "Can't get the gym list");
}

async function getGymMachineList() {
  return await baseGet("/api/gym-machine/", "", "Can't get Machines");
}

async function postGymWorkout(data: GymWorkoutType) {
  return await basePost("/api/gym-tracker/", data, "Can't create Workout");
}

async function postGymMachine(data: GymMachineType) {
  return await basePost("/api/gym-machine/", data, "Can't create gym machine");
}

export { getGymDayList, getGymMachineList, postGymWorkout, postGymMachine };
