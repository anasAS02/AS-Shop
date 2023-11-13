export interface formData {
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    address?: string;
    phoneNumber?: string;
    currentPassword?:  string;
    newPassword?: string;
    role?: string;
    verified?: boolean;
}

export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, form: formData, setForm: React.Dispatch<React.SetStateAction<formData>>) => {
    setForm({...form, [e.target.name]: e.target.value})
}