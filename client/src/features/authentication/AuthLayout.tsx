import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { logIn } from "../../store/authSlice";
import { RefreshData } from "../../types/dataTypes";

const tokenRefreshSuccessfull = "Access tokens refresh successfully.";
export default function AuthLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn
  );
  const [cookie] = useCookies(["logged_in"]);

  const location = useLocation();

  const res = useLoaderData() as RefreshData;

  useEffect(() => {
    if (isLoggedIn === false) {
      if (res.message === tokenRefreshSuccessfull) {
        if (cookie.logged_in === true) {
          dispatch(logIn());
          navigate(location);
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
  }, [isLoggedIn, navigate, location, cookie.logged_in, dispatch, res]);

  return <Outlet />;
}
