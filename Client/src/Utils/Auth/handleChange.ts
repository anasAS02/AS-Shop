export interface formData {
    _id?: any;
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    address?: string;
    phoneNumber?: string;
    currentPassword?:  string;
    newPassword?: string;
    role?: string;
}

export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, form: formData, setForm: React.Dispatch<React.SetStateAction<formData>>) => {
    setForm({...form, [e.target.name]: e.target.value})
}