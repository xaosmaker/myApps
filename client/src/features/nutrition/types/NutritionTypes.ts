import type { GetPaginationDataType } from "../../../types/baseTypes";

export interface UserWeightStatusType {
  pkid?: number;
  created_at?: number;
  daily_target_calories: number;
  current_weight: number;
}

export type NutritionsDaysListType = GetPaginationDataType<NutritionDayType>;
export interface NutritionDayType {
  created_at: string;
  total_foods_calories: number;
  nutrition_day: NutritionType[];
}

export interface NutritionType {
  eat_time: string;
  quantity: number;
  food_name: string;
  total_calories: number;
}
export interface FoodDataType {
  food_name: string;
  food_quantity: string;
  food_calories: number;
  pkid: number;
}

export interface AddFoodIntakeType {
  eat_time: string;
  quantity: string;
  food: number;
}
