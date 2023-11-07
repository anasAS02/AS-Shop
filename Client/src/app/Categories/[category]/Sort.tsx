'use client'

import { faAngleDown, faAngleUp, faBars, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Sort = () => {
    const [openSort, setOpenSort] = useState<boolean>(false);
    const handleSort = () => {
      setOpenSort(!openSort);
    }
  
  return (
    <div className='flex items-center justify-between'>
        <span className='flex items-center gap-5'>
        <FontAwesomeIcon icon={faTableCells} className='w-[18px] h-[18px] text-green-400 cursor-pointer' />
        <FontAwesomeIcon icon={faBars} className='w-[18px] h-[18px] text-green-400 cursor-pointer' />
        </span>
        <span className='flex gap-2 items-center relative'>
        Sort By: 
        <span className='flex items-center justify-between text-green-400'>Lowest Price <FontAwesomeIcon onClick={handleSort} icon={openSort ? faAngleUp : faAngleDown} className='w-[18px] h-[18px] cursor-pointer' /></span>
        <span className={`absolute left-16 -bottom-16 p-2 rounded-md text-center text-white duration-300 bg-green-400 hover:bg-green-300 cursor-pointer ${openSort ? '' : 'hidden'}`}>Highest Price</span>
        </span>
  </div>
  )
}
