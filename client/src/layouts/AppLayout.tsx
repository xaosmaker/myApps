import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function AppLayout() {
  return (
    <div className="box-border grid h-[calc(100%-4rem)] grid-cols-[auto_1fr]">
      <Sidebar />
      <main className="flex h-[90svh] items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
}
