import axios from "axios"
import { GET_CATEGORY } from "../Apis"

export const getCategory = async (category: string) => {
    const res = await axios.get(GET_CATEGORY + category);
    return res;
}