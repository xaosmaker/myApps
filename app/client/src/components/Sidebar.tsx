import { WORKHOURS_SIDEBAR_DATA } from '../data/sidebarData'
import { cloneElement, useState } from 'react'
import BurgerMenu from '../img/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import CloseMenu from '../img/close_24dp_FILL0_wght400_GRAD0_opsz24.svg?react'
import { NavLink } from 'react-router-dom'
// TODO: all data should render automatically from the choosen app like work hours or houses or vehicles

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  return (
    <aside className='h-3/4 self-center  rounded-r-xl bg-slate-950/80  px-4 py-4 text-lg'>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='mb-5 px-2 py-2'
      >
        {isMenuOpen ? <CloseMenu /> : <BurgerMenu />}
      </button>
      <div className='flex flex-col gap-4'>
        {WORKHOURS_SIDEBAR_DATA.map((data) => (
          <NavLink
            to={data.to}
            key={data.to}
            className={({ isActive }) =>
              (isActive ? 'rounded-md bg-slate-800' : undefined) +
              ' flex items-center justify-start gap-4 px-2 py-2'
            }
          >
            {cloneElement(<data.icon />, { className: 'h-7' })}
            {isMenuOpen && <p>{data.name}</p>}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
