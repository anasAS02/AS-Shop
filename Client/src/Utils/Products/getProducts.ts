import axios from "axios"
import { GET_PRODUCTS } from "../Apis"

export const getProducts = async () => {
    try{
        const res = await axios.get(GET_PRODUCTS);
        return res;
    }catch(err){
        console.log(err)
    }
}