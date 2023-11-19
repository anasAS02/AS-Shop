import axios from "axios"
import { GET_CATEGORIES_PRODUCTS } from "../Apis"

export const getCategory = async (category: string) => {
    try{
        const res = await axios.get(GET_CATEGORIES_PRODUCTS + category);
        return res;
    }catch(err){
        console.log(err)
    }
}