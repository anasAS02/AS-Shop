'use client'
import isAuth from '@/Utils/Auth/isAuth'
import SideBar from './Side bar/SideBar'
import Users from './users/Users'

const Dashboard = () => {

  return (
    <div className='w-full min-h-screen flex items-start justify-center gap-14'>
        <SideBar />
        <Users />
    </div>
  )
}

export default isAuth(Dashboard);