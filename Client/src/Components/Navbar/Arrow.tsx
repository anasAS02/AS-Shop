'use client'

import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

export const Arrow = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const handleMenu = () => {
        setOpenMenu(!openMenu);
    }
  return (
    <div className='relative'>
        <FontAwesomeIcon icon={openMenu ? faAngleDown : faAngleUp} onClick={handleMenu} className='w-[14px] h-[14px] cursor-pointer' />
        {openMenu &&
        <span className='absloute left-0 bottom-0 w-full bg-green-400'>
            <button>Logout</button>
        </span>
        }
    </div>
  )
}
