'use client'

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Bag } from "./Bag";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

export const BagButton = () => {
    const [isActiveBag, setIsActiveBag] = useState<boolean>(false);

    const handleIsActiveBag = () => {
        setIsActiveBag(!isActiveBag);
    }

  return (
    <>
      <FontAwesomeIcon onClick={handleIsActiveBag} icon={faBagShopping} className='w-[18px] h-[18px] duration-200 hover:text-white cursor-pointer' />
      <Bag active={isActiveBag ? true : false} />
    </>
  )
}
