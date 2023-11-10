import { formData } from "@/app/Auth/Register/page";
import axios from "axios";

export const handleAuth = async (e: React.MouseEvent, url: string, form: formData) => {
    e.preventDefault();
    try{
        const res = await axios.post(url, form);
        console.log(res)
    }catch(err){
        console.log(err);
    }
}