import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function AppLayout() {
  return (
    <div className=" grid h-full grid-cols-[auto_1fr] items-center justify-items-center">
      <Sidebar />
      <Outlet />
    </div>
  );
}
