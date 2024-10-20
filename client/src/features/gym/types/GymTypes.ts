export interface GymDayType {
  created_at: string;
  pkid: number;
  gym_day: GymWorkoutType[];
}
export interface GymMachineType {
  machine_name: string;
  pkid: number;
  is_tracked_by_time: boolean;
}
export interface GymWorkoutType {
  pkid: number;
  gym_machine: GymMachineType;
  gym_sets: number;
  gym_reps: number;
  gym_weight: number;
  gym_workout_time: number;
  gym_dificulty: number;
}

export interface GymWorkoutPostType extends GymWorkoutType {
  gym_machine_id: number;
}
