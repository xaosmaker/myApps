import { DiaryNoteData } from "../types/dataTypes";
import axios, { axiosError } from "./axiosInstance";
async function apiDiaryChoices() {
  try {
    const res = await axios.get(`/api/daily-diary/choices`);
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
    throw new Error(`Can't get choices list`);
  }
}
async function apiDiaryNoteCreate(diaryData: DiaryNoteData) {
  try {
    const res = await axios.post("/api/dialy-diary-notes/", diaryData);
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
    throw new Error(`Can't Create diary Note`);
  }
}

async function apiDiaryList(queryParams: string = "") {
  try {
    const res = await axios.get(`/api/daily-diary/${queryParams}`);
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
    throw new Error(`Can't get diary list`);
  }
}

export { apiDiaryList, apiDiaryChoices, apiDiaryNoteCreate };
