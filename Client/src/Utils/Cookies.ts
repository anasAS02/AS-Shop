import Cookies from "js-cookie";

export const TOKEN = Cookies.get('token');
export const EMAIL = Cookies.get('email');
export const ROLE = Cookies.get('role');