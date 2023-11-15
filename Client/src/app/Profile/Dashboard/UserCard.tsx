import { formData } from '@/Utils/Auth/handleChange'
import { faHouse, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface UserCardProps {
    user: formData;
    handleDelete: (id: any) => void;
  }

const UserCard: React.FC<UserCardProps> = ({handleDelete, user}) => {
  return (
    <span key={user._id} className='flex flex-col items-center justify-center gap-2 text-zinc-600 w-full p-2 rounded-md duration-200 bg-slate-300 hover:bg-slate-200'>
      <span className='flex items-center max-md:flex-col max-md:justify-center gap-2'>
        <p className='flex items-center gap-1'>
        <FontAwesomeIcon icon={faUser} />
        {user.name} - {user.email} </p>
        <p className='flex items-center gap-1'>
        <FontAwesomeIcon icon={faHouse} />
        {user.address} - {user.country}</p>
        <p className='flex items-center gap-1'>
        <FontAwesomeIcon icon={faPhone} />
        {user.phoneNumber}</p>
      </span>
      <span className='flex items-center max-md:flex-col max-md:justify-center gap-2'>
        {user.role !== 'USER' && <p className='text-sm p-1 rounded-md bg-slate-200 text-green-500'>{user.role}</p>}
        {user.role !== 'USER' && <button onClick={() => handleDelete(user._id)} className='text-sm p-1 rounded-md duration-200 bg-green-500 hover:bg-green-400 text-white'>{user.role === 'ADMIN' ? 'make manager' : 'Make admin'}</button>}
        {user.role !== 'USER' && <button onClick={() => handleDelete(user._id)} className='text-sm p-1 rounded-md duration-200 bg-red-500 hover:bg-red-400 text-white'>Remove {user.role}</button>}
      </span>
    </span>
  )
}

export default UserCard