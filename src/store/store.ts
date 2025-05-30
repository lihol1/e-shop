import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import categoriesReducer from "./categorySlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import generalReducer from "./generalSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        order: orderReducer,
        general: generalReducer,
        filter: filterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
