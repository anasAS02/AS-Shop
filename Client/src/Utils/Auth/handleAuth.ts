import { formData } from "@/app/Auth/Register/page";
import axios from "axios";

export const handleAuth = async (e: React.MouseEvent,
    url: string,
    form: formData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>,
    setErr: React.Dispatch<React.SetStateAction<string | null>>) => {
    e.preventDefault();
    setLoading(true);
    try{
        const res = await axios.post(url, form);
        console.log(res);
        if(typeof res.data.message == 'string'){
            setSuccessMsg(res.data.message)
        }else{
            window.location.pathname = '/'
        }
        setErr(null);
    }catch(err: any){
        setErr(err.response?.data?.message);
        console.log(err);
    }finally{
        setLoading(false);
    }
}