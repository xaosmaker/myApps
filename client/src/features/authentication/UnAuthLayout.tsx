import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";

export default function UnAuthLayout() {
  const res = useLoaderData()
  const { state } = useLocation()


  if (res) {
    if (state) {

      return <Navigate to={state} />
    }
    return <Navigate to={"/work-hours"} />
  }


  return <Outlet />;
}
