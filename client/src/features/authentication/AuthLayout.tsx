import { Navigate, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayout() {
  const res = useLoaderData();
  const location = useLocation();

  if (!res) {
    return <Navigate to={"/login"} state={location.pathname} />;
  }

  return (
    <>
      <Outlet />;
      <Toaster />
    </>
  );
}
