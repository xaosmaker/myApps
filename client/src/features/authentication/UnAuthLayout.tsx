import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { refresh } from "../../services/authApiCalls";
import { useCookies } from "react-cookie";
import { logIn } from "../../store/authSlice";

const tokenRefreshSuccessfull = "Access tokens refresh successfully.";
export default function UnAuthLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn
  );
  const [cookie] = useCookies(["logged_in"]);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/work-hours");
    } else {
      refresh().then((res) => {
        if (res.message === tokenRefreshSuccessfull) {
          if (cookie.logged_in === true) {
            dispatch(logIn());
          }
        }
      });
    }
  }, [isLoggedIn, navigate, dispatch, cookie.logged_in]);

  return <Outlet />;
}
