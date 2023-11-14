'use client'
import { GET_CATEGORIES } from "@/Utils/Apis";
import axios from "axios";

export interface categoryData {
    id: any;
    title: string;
    href: string;
    thumbnail: string;
}

export const categories = async () => {
    const res = await axios.get(GET_CATEGORIES);
    const data = res.data;
    return data;
} 