import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
} from "react-router-dom";

export default function AuthLayout() {
  const res = useLoaderData()
  const location = useLocation()


  if (!res) {
    return <Navigate to={'/login'} state={location.pathname} />

  }

  return <Outlet />;
}
