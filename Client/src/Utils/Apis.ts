const BASE_URL = 'http://localhost:4000/';

export const REGISTER = `${BASE_URL}auth/register`
export const LOGIN = `${BASE_URL}auth/login`
export const CHECK_TOKEN = `${BASE_URL}auth/checkToken`

export const GET_USERS = `${BASE_URL}management/getUsers`
export const ADD_ADMIN = `${BASE_URL}management/addAdmin`
export const REMOVE_ADMIN = `${BASE_URL}management/removeAdmin`
export const ADD_MANAGER = `${BASE_URL}management/addManager`
export const REMOVE_MANAGER = `${BASE_URL}management/removeManager`

export const GET_INFO = `${BASE_URL}user/getInfo`
export const CHANGE_NAME = `${BASE_URL}user/changeName`
export const CHANGE_PASSWORD = `${BASE_URL}user/changePassword`
export const CHANGE_COUNTRY = `${BASE_URL}user/changeCountry`
export const CHANGE_ADDRESS = `${BASE_URL}user/changeAddress`
export const CHANGE_PHONE_NUMBER = `${BASE_URL}user/changePhoneNumber`

export const GET_PRODUCTS = `${BASE_URL}products`
export const GET_PRODUCT = `${BASE_URL}products/`
export const ADD_PRODUCT = `${BASE_URL}products/add`
export const UPDATE_PRODUCT = `${BASE_URL}products/`
export const DELETE_PRODUCT = `${BASE_URL}products/`

export const GET_CATEGORIES = `${BASE_URL}categories`
export const GET_CATEGORIES_PRODUCTS = `${BASE_URL}categories/products`
export const GET_CATEGORY = `${BASE_URL}categories/`
export const ADD_CATEGORY = `${BASE_URL}categories/add`
export const UPDATE_CATEGORY = `${BASE_URL}categories/`
export const DELETE_CATEGORY = `${BASE_URL}categories/`