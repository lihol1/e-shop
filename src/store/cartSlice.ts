import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "../types";

const initialState: CartState = {
    cart: [],
    cartIsOpen: false,
    total: 0,
    noticeIsOpen: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, { payload }: PayloadAction<Product>) => {
            let newCart = [...state.cart];
            const found = state.cart.find((prod) => prod.id === payload.id);
            if (found) {
                newCart = newCart.map((prod) => {
                    return prod.id === payload.id ? { ...prod, quantity: payload.quantity || (prod.quantity ?? 0) + 1 } : prod;
                });
            } else {
                newCart.push({ ...payload, quantity: 1 });
            }
            state.cart = newCart;
        },
        removeItemFromCart: (state, { payload }: PayloadAction<number>) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },
        clearCart: (state) => {
            state.cart = [];
        },
        changeCartStatus: (state, { payload }: PayloadAction<boolean>) => {
            state.cartIsOpen = payload;
        },
        getTotal: (state) => {            
            if (state.cart.length > 0) {
                state.cart.reduce((sum, prod) => {
                   return state.total = sum + prod.price * (prod.quantity ?? 1);
                }, 0);
            } else {
                state.total = 0;
            }
        },
        setNoticeIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.cartIsOpen = payload;
        },
        setFormIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.cartIsOpen = payload;
        },
    },
});

export const { addItemToCart, removeItemFromCart, clearCart, changeCartStatus, getTotal, setNoticeIsOpen } = cartSlice.actions;
export default cartSlice.reducer;
