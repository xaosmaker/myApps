import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  return (
    <div className='box-border grid h-[calc(100%-4rem)] grid-cols-[auto_1fr]'>
      <Sidebar />
      <main className='flex items-center justify-center'>
        <Outlet />
      </main>
    </div>
  )
}
