import { Navigate, Outlet, useLoaderData } from "react-router-dom";

export default function UnAuthLayout() {
  const res = useLoaderData()

  if (res) {
    return <Navigate to={"/work-hours"} />
  }


  return <Outlet />;
}
