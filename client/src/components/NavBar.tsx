import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const navLingDecoration =
  " flex items-center justify-start gap-4 px-2 py-2 hover:rounded-md hover:bg-slate-700 ";

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
      <div className="cursor-pointer p-2  md:hidden" onClick={handleMenu}>
        {isMenuOpen ? <FaXmark /> : <FaBars />}
      </div>
      <ul
        className={`${
          isMenuOpen
            ? "absolute right-0 top-16 z-10 h-full w-full bg-slate-900"
            : "hidden"
        } md:static md:flex md:h-auto md:w-auto md:bg-transparent `}
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
            to="/gym"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Gym
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/nutritions"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Nutritions
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/timer"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Timer
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
          <NavLink
            to="/vehicles"
            onClick={closeMenu}
            className={({ isActive }) =>
              (isActive ? active : undefined) + navLingDecoration
            }
          >
            Incomes
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
      </ul>
    </div>
  );
}
