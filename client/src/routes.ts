import Landing from "./pages/Landing";

import LoginRegPage from "./features/authentication/LoginRegPage";
import MainLayout from "./layouts/MainLayout";
import Error404 from "./pages/Error404";
import AuthLayout from "./features/authentication/AuthLayout";
import GymCard from "./features/gym/pages/GymCard";
import AddGymWorkout from "./features/gym/pages/AddGymWorkout";
import NutritionList from "./features/nutrition/pages/NutritionList";
import AddFoodIntake from "./features/nutrition/pages/AddFoodIntake";
import UserWeightData from "./features/nutrition/pages/UserWeightData";
import WorkShifts from "./features/work-hours/pages/WorkShifts";
import ShowWorkDays from "./features/work-hours/pages/ShowWorkDays";
import AddWorkHours from "./features/work-hours/pages/AddWorkHours";
import UnAuthLayout from "./features/authentication/UnAuthLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Activate from "./features/authentication/Activate";
import ResetPasswordEmail from "./features/authentication/ResetPasswordEmail";
import ResetPasswordEmailConfirm from "./features/authentication/ResetPasswordEmailConfirm";
import { isLoggedInApi } from "./features/authentication/services/authApiServices";
import { lazy } from "react";

const TodoList = lazy(() => import("./features/todo/pages/TodoList"));
const AddEditTodo = lazy(() => import("./features/todo/pages/AddEditTodo"));
const AddTodo = lazy(() => import("./features/todo/pages/AddTodo"));

export const router = createBrowserRouter([
  {
    Component: UnAuthLayout,
    loader: isLoggedInApi,
    children: [
      {
        path: "/",
        Component: Landing,
      },
      { path: "/login", Component: LoginRegPage },
      { path: "/register", Component: LoginRegPage },
      { path: "/activate/:uid/:token/", Component: Activate },
      { path: "/password-reset/", Component: ResetPasswordEmail },
      {
        path: "/password-reset/:uid/:token/",
        Component: ResetPasswordEmailConfirm,
      },
    ],
  },

  {
    Component: AuthLayout,
    loader: isLoggedInApi,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: "/todos",
            children: [
              {
                index: true,
                Component: () => Navigate({ to: "show-todos", replace: true }),
              },
              { path: "show-todos", Component: TodoList },
              { path: "add-todo", Component: AddTodo },
              { path: ":pkid/add-edit-todo", Component: AddEditTodo },
            ],
          },

          // {
          //   path: "/timer",
          //   children: [
          //     {
          //       index: true,
          //       Component: () =>
          //         Navigate({ replace: true, to: "count-down-timer" }),
          //     },
          //
          //     { path: "count-down-timer", Component: NewTimer },
          //   ],
          // },

          {
            path: "/nutritions",
            children: [
              {
                index: true,
                Component: () =>
                  Navigate({ replace: true, to: "show-nutritions" }),
              },

              { path: "show-nutritions", Component: NutritionList },
              { path: "add-nutritions", Component: AddFoodIntake },
              { path: "user-weight-data", Component: UserWeightData },
            ],
          },
          {
            path: "/gym",
            children: [
              {
                index: true,
                Component: () => Navigate({ to: "show-gym", replace: true }),
              },

              { path: "show-gym", Component: GymCard },
              { path: "add-gym", Component: AddGymWorkout },
            ],
          },
          {
            path: "/work-hours",
            children: [
              {
                index: true,
                Component: () =>
                  Navigate({ replace: true, to: "show-work-time" }),
              },
              {
                path: "show-work-time",
                Component: ShowWorkDays,
              },
              { path: "add-work-time", Component: AddWorkHours },
              { path: "work-shifts", Component: WorkShifts },
            ],
          },
          // {
          //   path: "/user",
          //   children: [
          //     { index: true, Component: Navigate replace to="me"  },
          //     { path: "me", Component: UnderConstruction  },
          //   ],
          // },
        ],
      },
    ],
  },
  { path: "*", Component: Error404 },
]);
