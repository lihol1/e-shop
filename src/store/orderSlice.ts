import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Order, OrderState  } from "../types";
import * as productData from "../data.json";

const data = productData as unknown as Data;
const storeData = data.products.map((prod) => {
    return { ...prod, quantity: 3 };
});


const defaultValues = {
    id: 0,
    author: "",
    orderTotal: 0,
    products: [],
};

const initialState: OrderState = {
    order: defaultValues,
    orders: [],
    count: 1,
    store: storeData,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        formOrder: (state, { payload }: PayloadAction<Order>) => {
            state.order = { ...state.order, id: payload.id, author: payload.author, orderTotal: payload.orderTotal, products: [...payload.products] };
            state.order.products.forEach((prod) => {
                state.store.forEach((product) => {
                    if (prod.id === product.id) {
                        if (product.quantity && prod.quantity) {
                            product.quantity = product.quantity - prod.quantity;
                        }
                    }
                });
            });
        },
        addOrder: (state) => {
            if (state.order.products.length > 0) {
                state.orders.push(state.order);
            }
        },
        setCount: (state, { payload }: PayloadAction<number>) => {
            state.count =  payload
        }
    },
});

export const { formOrder, addOrder, setCount } = orderSlice.actions;
export default orderSlice.reducer;