import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Landing from "./pages/Landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UnAuthLayout from "./features/authentication/UnAuthLayout";
import LoginRegPage from "./features/authentication/LoginRegPage";
import MainLayout from "./layouts/MainLayout";
import ShowWorkDays from "./features/work-hours/ShowWorkDays";
import AddWorkHours from "./features/work-hours/AddWorkHours";
import SetWorkTime from "./features/work-hours/SetWorkTime";
import Error404 from "./pages/Error404";
import AuthLayout from "./features/authentication/AuthLayout";
import AddEditTodoTask from "./features/todo/AddEditTodoTask";
import AddTodo from "./features/todo/AddTodo";
import { refresh } from "./services/authApiCalls";
import UnderConstruction from "./components/UnderConstruction";
import CountDownTimer from "./features/timer/CountDownTimer";
import TodoCard from "./features/todo/TodoCard";
import GymCard from "./features/gym/GymCard";
import AddGymWorkout from "./features/gym/AddGymWorkout";
import NutritionList from "./features/nutrition/pages/NutritionList";
import AddFoodIntake from "./features/nutrition/pages/AddFoodIntake";

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const routet = createBrowserRouter([
  {
    element: <UnAuthLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      { path: "/login", element: <LoginRegPage /> },
    ],
  },

  {
    element: <AuthLayout />,
    loader: refresh,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/todos",
            children: [
              { index: true, element: <Navigate replace to="show-todos" /> },
              { path: "show-todos", element: <TodoCard /> },
              { path: "add-todo", element: <AddTodo /> },
              { path: ":pkid/add-edit-todo", element: <AddEditTodoTask /> },
            ],
          },

          {
            path: "/timer",
            children: [
              {
                index: true,
                element: <Navigate replace to="count-down-timer" />,
              },

              { path: "count-down-timer", element: <CountDownTimer /> },
            ],
          },

          {
            path: "/nutritions",
            children: [
              {
                index: true,
                element: <Navigate replace to="show-nutritions" />,
              },

              { path: "show-nutritions", element: <NutritionList /> },
              { path: "add-nutritions", element: <AddFoodIntake /> },
            ],
          },
          {
            path: "/gym",
            children: [
              {
                index: true,
                element: <Navigate replace to="show-gym" />,
              },

              { path: "show-gym", element: <GymCard /> },
              { path: "add-gym", element: <AddGymWorkout /> },
            ],
          },
          {
            path: "/work-hours",
            children: [
              {
                index: true,
                element: <Navigate replace to="show-work-time" />,
              },
              {
                path: "show-work-time",
                element: <ShowWorkDays />,
              },
              { path: "add-work-time", element: <AddWorkHours /> },
              { path: "set-work-time", element: <SetWorkTime /> },
            ],
          },
          {
            path: "/user",
            children: [
              { index: true, element: <Navigate replace to="me" /> },
              { path: "me", element: <UnderConstruction /> },
            ],
          },
          { path: "/houses", element: <UnderConstruction /> },
          { path: "/vehicles", element: <UnderConstruction /> },
        ],
      },
    ],
  },
  { path: "*", element: <Error404 /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <RouterProvider router={routet} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
