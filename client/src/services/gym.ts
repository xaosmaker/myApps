import { GymWorkoutTypes } from "../features/gym/gymTypes";
import { GymMachineTypes } from "../types/gym/gymMachineTypes";
import { baseGetApiCall, basePostApiCall } from "../utils/baseApiCalls";

async function gymDayGetList(queryparmas = "") {
  return await baseGetApiCall(
    "/api/gym-list/",
    queryparmas,
    "Can't get the gym list"
  );
}
async function gymMachineGetList() {
  return await baseGetApiCall("/api/gym-machine/", "", "Can't get Machines");
}

async function createGymMachinePost(data: GymMachineTypes) {
  return await basePostApiCall(
    "/api/gym-machine/",
    data,
    "Can't create gym machine"
  );
}
async function addGymWorkout(data: GymWorkoutTypes) {
  return await basePostApiCall(
    "/api/gym-tracker/",
    data,
    "Can't create Workout"
  );
}

export {
  gymDayGetList,
  gymMachineGetList,
  createGymMachinePost,
  addGymWorkout,
};
