import { formData } from "@/app/Auth/Register/page"

export const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>, form: formData, setForm: React.Dispatch<React.SetStateAction<formData>>) => {
    setForm({...form, [e.target.name]: e.target.value})
}