import {
  Navigate,
  Outlet,
  useLoaderData,
} from "react-router-dom";

export default function AuthLayout() {
  const res = useLoaderData()

  if (!res) {
    return <Navigate to={'/login'} />

  }

  return <Outlet />;
}
