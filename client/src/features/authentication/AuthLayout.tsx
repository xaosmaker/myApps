import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export default function AuthLayout() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return <Outlet />;
}
