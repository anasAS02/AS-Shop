import axios from "axios"
import { GET_FAVORITES_LIST } from "../Apis"
import { EMAIL } from "../Cookies";

export const getFavoritesList = async () => {
    try{
        const res = axios.post(GET_FAVORITES_LIST, {email: EMAIL});
        return res;
    }catch(err){
        console.log(err)
    }
}