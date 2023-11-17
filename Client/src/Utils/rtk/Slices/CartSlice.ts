import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "@/Components/Products/Product/ProductCard";

const cartItemsString = localStorage.getItem('cartItems');
const amountString = localStorage.getItem('totalAmount');

const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
const amount = amountString ? parseFloat(amountString) : 0;

const initialState = {
    cartItems: cartItems,
    amount: amount
};

const handleSaveItem = (cartItems: ProductData[], totalAmount: number) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', totalAmount.toString());
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.cartItems.find((product: ProductData) => product._id === action.payload._id);
            if (findProduct) {
                findProduct.quantity += 1;
            } else {
                const productClone = { ...action.payload, quantity: 1 };
                state.cartItems.push(productClone);
            }

            const totalAmount = state.cartItems.reduce((acc: number, item: ProductData) => {
                acc += item.price * (item.quantity || 1);
                return acc;
            }, 0);

            handleSaveItem(state.cartItems, totalAmount);
        },
        removeFromCart: (state, action) => {
            const findProduct = state.cartItems.find((product: ProductData) => product._id !== action.payload._id);
            if (findProduct.quantity > 1){
                findProduct.quantity -=1;
                state.cartItems.push(findProduct);
            }else{
                state.cartItems = state.cartItems.filter((product: ProductData) => product._id !== action.payload._id);
            }
            const totalAmount = state.cartItems.reduce((acc: number, item: ProductData) => {
                acc += item.price * (item.quantity || 1);
                return acc;
            }, 0);
            handleSaveItem(state.cartItems, totalAmount);
        },
        deleteProduct: (state, action) => {
            state.cartItems = state.cartItems.filter((product: ProductData) => product._id !== action.payload._id);
            
            const totalAmount = state.cartItems.reduce((acc: number, item: ProductData) => {
                acc += item.price * (item.quantity || 1);
                return acc;
            }, 0);

            handleSaveItem(state.cartItems, totalAmount);
        },
    },
});

export const { addToCart, removeFromCart, deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
