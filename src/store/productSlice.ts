import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types";

import * as data from "../data.json";


// console.log(data.categories[0])

const initialState: ProductState = {
    productList: [],
    categoryList: []
    // ,
    // status: null,
    // error: null
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getCategories: (state ) => {    
            state.categoryList = data.categories;                     
            // state.list = JSON.parse(data.products as Products[]);                                 
        }
    },
    // extraReducers: builder=>{
       
    // }
})



export const { getCategories } = productSlice.actions;
export default productSlice.reducer