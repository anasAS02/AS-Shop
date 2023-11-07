import axios from "axios"
import { GET_CATEGORY } from "../Apis"

interface productsProps {
    category: string;
    lowestPrice?: number | undefined;
    highestPrice?: number | undefined;
    sortByLowestPrice?: number | undefined;
    sortByHighestPrice?: number | undefined
}

export const getCategory = async (props: productsProps) => {
    try{
        const res = await axios.get(GET_CATEGORY + props.category, {
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