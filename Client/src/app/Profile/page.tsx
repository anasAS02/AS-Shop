'use client'
import { PieChart } from '@mui/x-charts/PieChart';
import { faCircleInfo, faEdit, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookie from 'js-cookie';
import { useState } from 'react';
import Info from './Info';
import { LineChart } from '@mui/x-charts';

const Profile = () => {
    const [mode, setMode] = useState<string>('Info');

    const handleMode = (e: React.MouseEvent, mode: string) => {
        e.preventDefault();
        setMode(mode);
    }

    const handleLogout = () => {
        Cookie.remove('token');
        Cookie.remove('email');
        Cookie.remove('role');
        window.location.pathname = '/';
    }

  return (
    <div className='h-screen flex items-start gap-10 p-10'>
        <aside className='flex flex-col gap-5 bg-slate-300 h-fit p-5 rounded-md'>
            <button className={`${mode === 'Info' ? 'bg-blue-500': 'bg-blue-600 hover:bg-blue-500'} flex items-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Info')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faCircleInfo} />    
            Info</button>
            <button className={`${mode === 'Dashboard' ? 'bg-blue-500': 'bg-blue-600 hover:bg-blue-500'} flex items-center p-2 rounded-md text-white duration-300`} onClick={(e) => handleMode(e, 'Dashboard')}>
            <FontAwesomeIcon className='mr-3 text-white' icon={faGear} />    
            Dashboard</button>
            <button className='p-2 rounded-md text-white bg-red-600 hover:bg-red-500 duration-300' onClick={handleLogout}>Logout</button>
        </aside>
        <section className='w-full flex flex-col gap-5 p-5 rounded-md'>
        { mode === 'Info' &&
            <Info />
        }
        {mode === 'Dashboard' &&
                <div>
                    <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: 90, color: 'orange',  label: 'Users' },
                            { id: 1, value: 8, label: 'Admins' },
                            { id: 2, value: 2, label: 'Managers' },
                        ],
                        },
                    ]}
                    width={400}
                    height={200}
                    />
                    <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    width={500}
                    height={300}
                    />
                </div>
        }
        </section>
    </div>
  )
}

export default Profile