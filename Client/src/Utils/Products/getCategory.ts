import axios from "axios"
import { GET_CATEGORY } from "../Apis"

export const getCategory = async (props: {category: string}) => {
    try{
        const res = await axios.get(GET_CATEGORY + props.category);
        return res;
    }catch(err){
        console.log(err)
    }
}