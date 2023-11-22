export const BASE_URL = 'http://localhost:4000/';

export const REGISTER = `${BASE_URL}auth/register`
export const LOGIN = `${BASE_URL}auth/login`
export const CHECK_TOKEN = `${BASE_URL}auth/checkToken`

export const GET_USERS = `${BASE_URL}management/getUsers`
export const ADD_USER = `${BASE_URL}management/addUser`
export const CHANGE_ROLE = `${BASE_URL}management/changeRole`
export const REMOVE_ROLE = `${BASE_URL}management/removeRole`

export const GET_FAVORITES_LIST = `${BASE_URL}favorites/`
export const ADD_TO_FAVORITES_LIST = `${BASE_URL}favorites/add`
export const REMOVE_FROM_FAVORITES_LIST = `${BASE_URL}favorites/remove`

export const GET_ORDERS = `${BASE_URL}orders/`
export const CREATE_ORDER = `${BASE_URL}orders/create`
export const SAVE_ORDER = `${BASE_URL}orders/save`
export const GET_MY_ORDERS = `${BASE_URL}orders/myOrders`
export const UPDATE_ORDER_STATUS = `${BASE_URL}orders/update/`

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

export const SHOW_IMG = `${BASE_URL}uploads/`;
export const GET_CATEGORIES = `${BASE_URL}categories`
export const GET_CATEGORIES_PRODUCTS = `${BASE_URL}categories/products/`
export const GET_CATEGORY = `${BASE_URL}categories/`
export const ADD_CATEGORY = `${BASE_URL}categories/add`
export const UPDATE_CATEGORY = `${BASE_URL}categories/update/`
export const DELETE_CATEGORY = `${BASE_URL}categories/`