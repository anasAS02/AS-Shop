import { faBasketShopping, faCreditCard, faTruckFast } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Features = () => {
  return (
    <div className='flex items-center justify-center gap-10 flex-wrap'>
        <p className='text-lg font-bold flex items-center gap-5 max-md:gap-2 md:border-r-green-400 md:border-r-2'>
            Fast shipping
            <FontAwesomeIcon icon={faTruckFast} className='text-green-400 w-[50px] h-[50px] mr-5' />
        </p>
        <p className='text-lg font-bold flex items-center gap-5 max-md:gap-2 md:border-r-green-400 md:border-r-2'>
            Competitive prices
            <FontAwesomeIcon icon={faCreditCard} className='text-green-400 w-[50px] h-[50px] mr-5' />
        </p>
        <p className='text-lg font-bold flex items-center gap-5  max-md:gap-2'>
            Diverse products
            <FontAwesomeIcon icon={faBasketShopping} className='text-green-400 w-[50px] h-[50px]' />
        </p>
    </div>
  )
}
