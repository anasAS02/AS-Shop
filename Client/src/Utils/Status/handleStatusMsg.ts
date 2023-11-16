import Swal from "sweetalert2"
import { formData } from "../Auth/handleChange";

export const handleMsg = async (setForm?: React.Dispatch<React.SetStateAction<formData>>, successMsg?: string | null, setSuccessMsg?: React.Dispatch<React.SetStateAction<string | null>>, err?: string | null, setErr?: React.Dispatch<React.SetStateAction<string | null>> | undefined) => {
    if(successMsg){
        await Swal.fire({
            title: "Done",
            text: successMsg,
            icon: "success"
        });
        setSuccessMsg && setSuccessMsg(null);
        setForm && setForm({
            name: '',
            email: '',
            password: '',
            country: 'us',
            address: '',
            phoneNumber: '',
        })
    }
    if(err){
        await Swal.fire({
            title: "Oops...",
            text: err,
            icon: "error"
        });
        setErr && setErr(null);
    }
}
