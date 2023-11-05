import axios from "axios"
import { GET_PRODUCTS } from "../Apis"

export const getProducts = async () => {
    const res = await axios.get(GET_PRODUCTS);
    return res;
}