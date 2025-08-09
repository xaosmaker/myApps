import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default function AppLayout() {
  return (
    <div className="grid h-[calc(100dvh_-_4rem)] grid-cols-[auto_1fr]">
      <Sidebar />
      <Suspense fallback={<Loader size="xl" />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
