'use client'

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faL, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Search } from "./Search"

export const SeacrhButton = () => {
    const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);

    const handleIsActiveSearch = () => {
      setIsActiveSearch(!isActiveSearch);
    }

  return (
    <>
    <FontAwesomeIcon onClick={handleIsActiveSearch} icon={faMagnifyingGlass} className='w-[18px] h-[18px] duration-200 hover:text-white cursor-pointer' />
    <Search active={isActiveSearch ? true : false}/>
    </>
  )
}
