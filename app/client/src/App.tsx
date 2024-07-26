// import Landing from './components/Landing'

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import LoginRegForm from './pages/LoginRegForm'
import Error404 from './pages/Error404'
import MainLayout from './layouts/MainLayout'
import ShowWorkDays from './features/work-hours/ShowWorkDays'
import AddWorkHours from './features/work-hours/AddWorkHours'
import SetWorkTime from './features/work-hours/SetWorkTime'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  { path: '/login', element: <LoginRegForm /> },
  {
    path: '/work-hours',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate replace to='show-work-time' /> },
      {
        path: 'show-work-time',
        element: <ShowWorkDays />,
      },
      { path: 'add-work-time', element: <AddWorkHours /> },
      { path: 'set-work-time', element: <SetWorkTime /> },
    ],
  },
  { path: '*', element: <Error404 /> },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
