export interface GymDayTypes {
  created_at: string;
  pkid: number;
  gym_day: GymWorkoutTypes[];
}
export interface GymMachineTypes {
  machine_name: string;
  pkid: number;
  is_tracked_by_time: boolean;
}
export interface GymWorkoutTypes {
  pkid: number;
  gym_machine: GymMachineTypes;
  gym_sets: number;
  gym_reps: number;
  gym_weight: number;
  gym_workout_time: number;
  gym_dificulty: number;
}
