import Swal from "sweetalert2"
import { formData } from "../Auth/handleChange";

export const handleMsg = (setForm: React.Dispatch<React.SetStateAction<formData>>, successMsg: string | null, err: string | null): void => {
    if(successMsg){
        Swal.fire({
            title: "Done",
            text: successMsg,
            icon: "success"
        })
        setForm({
            name: '',
            email: '',
            password: '',
            country: 'us',
            address: '',
            phoneNumber: ''
        })
    }
    if(err){
        Swal.fire({
            title: "Oops...",
            text: err,
            icon: "error"
        })
    }
}
