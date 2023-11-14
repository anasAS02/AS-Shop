import axios from "axios";
import { GET_CATEGORIES } from "../Apis";
import { config } from "../Auth/handleAuth";

export interface CategoryData {
    _id?: any;
    title: string;
    href: string;
    thumbnail?: string;
}

export const getCategories = async() => {
    const res = await axios.get(GET_CATEGORIES, config);
    const data = res.data.data;
    return data;
};