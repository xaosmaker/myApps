import { SubmitDataType } from "../features/nutrition/AddFood";
import { FoodDataTypes } from "../types/nutritionTypes";
import { baseGetApiCall, basePostApiCall } from "../utils/baseApiCalls";
import axios, { axiosError } from "./axiosInstance";

async function apiNutritionsFoods() {
  try {
    const res = await axios.get(`/api/food-data/`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(`Can't get Food Data`);
  }
}

async function apiNutritionsDays(queryParams: string = "") {
  try {
    const res = await axios.get(`/api/nutritions-list/${queryParams}`);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(`Can't get Food Data`);
  }
}

async function apiNutritionDateCreate(nutritionData: SubmitDataType) {
  try {
    const res = await axios.post("/api/nutritions/", nutritionData);
    const data = await res.data;
    return data;
  } catch (error) {
    if (axiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("404 page not found");
      }
      if (error.response?.data.detail) {
        throw new Error(error.response.data.detail);
      }
      return error.response;
    }
    throw new Error(`Can't Create Nutrition Date Note`);
  }
}
async function createFoodApiCall(foodData: FoodDataTypes) {
  return await basePostApiCall(
    "/api/food-data/",
    foodData,
    "Can't Create Food"
  );
}
async function userWeightGetApiCall() {
  return await baseGetApiCall(
    "/api/user-weight/",
    "",
    "Can't get user Weight!"
  );
}

export {
  apiNutritionsFoods,
  apiNutritionDateCreate,
  apiNutritionsDays,
  createFoodApiCall,
  userWeightGetApiCall,
};
