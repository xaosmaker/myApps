import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const navLingDecoration =
  " flex items-center hover:rounded-md justify-start gap-4 px-2 py-2 hover:bg-slate-700 ";

const active = "rounded-md bg-slate-800";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  function handleMenu() {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="flex h-16 items-center justify-between bg-slate-950 px-4">
      <div className="text-3xl font-bold">HMS</div>
      <div className="md:hidden cursor-pointer  p-2" onClick={handleMenu}>
        {isMenuOpen ? <FaXmark /> : <FaBars />}
      </div>
      <ul
        className={`${
          isMenuOpen
            ? "absolute top-16 h-full bg-slate-900 w-full right-0"
            : "hidden"
        } md:static md:h-auto md:flex md:w-auto md:bg-transparent `}
      >
        <li>
          <NavLink
            to="/todos"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            User
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/work-hours"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Work hours
          </NavLink>
        </li>
        <li>
          <button className={navLingDecoration}>Houses</button>
        </li>
        <li>
          <button className={navLingDecoration}>Vehicles</button>
        </li>
      </ul>
    </div>
  );
}
