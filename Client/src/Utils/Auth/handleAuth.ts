import axios from "axios";
import Cookies from 'js-cookie';
import { formData } from "./handleChange";

const token = Cookies.get('token');
const email = Cookies.get('email');

export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    params: {
        email: email,
    },
};

export const handleAuth = async (e: React.MouseEvent,
    url: string,
    form: formData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSuccessMsg: React.Dispatch<React.SetStateAction<string | null>>,
    setErr: React.Dispatch<React.SetStateAction<string | null>>) => {
    e.preventDefault();
    setLoading(true);
    if(form.phoneNumber){
        if(form?.phoneNumber?.length < 11){
            setErr('Invalid phone number');
            setLoading(false);
            return;
        }
    }
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