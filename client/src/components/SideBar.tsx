import {
  GYM_DATA,
  NUTRITIONS_DATA,
  TODOS_SIDEBAR_DATA,
  WORKHOURS_SIDEBAR_DATA,
} from "../data/sidebarData";
import { cloneElement, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { type data } from "../types/dataTypes";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [sidebarData, setSidebarData] = useState<data[] | null>();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  useEffect(
    function() {
      if (path === "work-hours") {
        setSidebarData(WORKHOURS_SIDEBAR_DATA);
      } else if (path === "todos") {
        setSidebarData(TODOS_SIDEBAR_DATA);
      } else if (path === "nutritions") {
        setSidebarData(NUTRITIONS_DATA);
      } else if (path === "gym") {
        setSidebarData(GYM_DATA);
      } else {
        setSidebarData(null);
      }
    },
    [path]
  );
  if (sidebarData === null) {
    return <div></div>;
  }
  return (
    <aside className="h-3/4 self-center  rounded-r-xl bg-slate-950/80  px-4 py-4 text-lg">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="mb-5 px-2 py-2"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>
      <div className="flex flex-col gap-4">
        {sidebarData?.map((data) => (
          <NavLink
            to={data.to}
            key={data.to}
            className={({ isActive }) =>
              (isActive ? "rounded-md bg-slate-800" : undefined) +
              " flex items-center justify-start gap-4 px-2 py-2"
            }
          >
            {cloneElement(<data.icon />, { className: "h-7" })}
            {isMenuOpen && <p>{data.name}</p>}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
