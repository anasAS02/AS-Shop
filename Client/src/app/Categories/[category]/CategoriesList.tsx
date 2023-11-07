'use client'
import { links } from '@/Components/Navbar/data';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';

export const CategoriesList = (props: {category: string}) => {
    const [openCategories, setOpenCategories] = useState<boolean>(true);
    const handleCategories = () => {
      setOpenCategories(!openCategories);
    }
    
  return (
    <div>
        <span className='flex items-center gap-12 mb-2'>Category 
        <FontAwesomeIcon onClick={handleCategories} icon={openCategories ? faAngleUp : faAngleDown} className='text-green-400 w-[18px] h-[18px] cursor-pointer ml-auto' />
        </span>
        <span className={openCategories ? '' : 'hidden'}>
          {links.map((link) => (
            <Link href={`/Categories/${link.href}`} key={link.id} className='flex items-center gap-5 mb-2'>
              <p>{link.title}</p>
              <span className={`p-2 border-2 rounded-full ml-auto ${link.href === props.category ? 'bg-green-400 border-green-400' : 'bg-white border-gray-400'}`}></span>
          </Link>
        ))}
      </span>
    </div>
  )
}
