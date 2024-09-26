export interface NutritionType {
  eat_time: string;
  quantity: number;
  food_name: string;
  total_calories: number;
}
export interface NutritionDayType {
  created_at: string;
  total_foods_calories: number;
  nutrition_day: NutritionType[];
}
export interface NutritionDataType {
  count: number;
  current_page: number;
  total_pages: number;
  results: NutritionDayType[];
}

export interface UserWeightTypes {
  daily_target_calories: number;
  current_weight: number;
}
