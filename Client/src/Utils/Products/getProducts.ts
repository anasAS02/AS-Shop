import axios from "axios"
import { GET_PRODUCTS } from "../Apis"

interface productsProps {
    lowestPrice?: number;
    highestPrice?: number;
    sortByLowestPrice?: number;
    sortByHighestPrice?: number
}

export const getProducts = async (props: productsProps) => {
    try{
        const res = await axios.get(GET_PRODUCTS, {
            params: props,
        });
        return res;
    }catch(err){
        console.log(err)
    }
}