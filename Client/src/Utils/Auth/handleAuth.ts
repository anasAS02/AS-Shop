import { formData } from "@/app/Auth/Register/page";
import axios from "axios";
import Cookie from 'js-cookie';

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
        const token = res.data.User.token;
        const role = res.data.User.role;
        if(res.data.verified){
            Cookie.set('token', token);
            Cookie.set('role', role);
            window.location.pathname = '/';
        }else{
            setSuccessMsg(res.data.message)
        }
        setErr(null);
    }catch(err: any){
        setErr(err.response?.data?.message);
        setSuccessMsg(null);
        console.log(err);
    }finally{
        setLoading(false);
    }
}