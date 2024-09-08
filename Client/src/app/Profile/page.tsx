'use client'
import Info from './Info/Info';
import { useStatusContext } from '@/Utils/Status/statusContext';
import SideBar from './Side bar/SideBar';
import Custom404 from '../not-found';

const Profile = () => {
    const {isLoggedIn} = useStatusContext();

  return (
    isLoggedIn ?
    <div className={`min-h-screen h-full flex items-start max-md:flex-col max-md:justify-center gap-10`}>
        <SideBar />
        <section className='w-full flex flex-col gap-5 p-5 rounded-md'>
            <Info />
        </section>
    </div>
    :
    <Custom404 />
  )
}

export default Profile