import { formData } from "@/app/Auth/Register/page";
import axios from "axios";
import Cookies from 'js-cookie';

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
        if(res.data.verified){
            const token = res.data.User.token;
            const email = res.data.User.email;
            const role = res.data.User.role;
            Cookies.set('token', token);
            Cookies.set('email', email);
            Cookies.set('role', role);
            window.location.pathname = '/';
        }else{
            setSuccessMsg(res.data.message);
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