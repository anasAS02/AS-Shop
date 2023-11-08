import axios from "axios"
import { GET_PRODUCTS } from "../Apis"

interface productsProps {
    lowestPrice?: number | undefined;
    highestPrice?: number | undefined;
    sortByLowestPrice?: number | undefined;
    sortByHighestPrice?: number | undefined
}

export const getProducts = async (props: productsProps) => {
    try{
        const res = await axios.get(GET_PRODUCTS, {
            params: {
                lowestPrice: props.lowestPrice,
                highestPrice: props.highestPrice,
                sortByLowestPrice: props.sortByLowestPrice,
                sortByHighestPrice: props.sortByHighestPrice,
            },
        });
        return res;
    }catch(err){
        console.log(err)
    }
}