import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function AppLayout() {
  return (
    <div className="grid h-[calc(100dvh_-_4rem)] grid-cols-[auto_1fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
}
