import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Product, ProductState, RequestParams } from "../utils/types";
import * as productData from "../data.json";
import { search } from "../utils/utilities";

const data = productData as unknown as Data;

const initialState: ProductState = {
    productList: [],
    filteredByCategory: [],
    filteredByParams: null,
    foundProducts: [],
    searchList: [],
    requestParams: { min: 0, max: 0, features: {} },
    maxPrice: 0,
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: (state) => {
            state.productList = data.products;
        },
        filterByCategory: (state, { payload }: PayloadAction<string>) => {
            state.filteredByCategory = state.productList.filter(({ categoryId }) => categoryId === Number(payload));
            state.maxPrice = Math.max(...state.filteredByCategory.map((prod) => prod.price));
        },
        searchProducts: (state, { payload }: PayloadAction<string>) => {
            state.foundProducts = [];
            state.foundProducts = search(state.productList, payload);
        },
        arrangeByCategories: (state) => {
            let categoryIdList = [];
            state.searchList = [];
            if (state.foundProducts.length > 0) {
                //определяем id категорий найденных продуктов
                for (const elem of state.foundProducts) {
                    categoryIdList.push(elem.categoryId);
                }
                categoryIdList = [...new Set(categoryIdList)];

                // делим на отдельные массивы по категориям
                for (const catId of categoryIdList) {
                    state.searchList.push(state.foundProducts.filter((prod) => prod.categoryId === catId));
                }
            } else {
                state.searchList = [];
            }
        },
        filterByParams: (state, { payload }: PayloadAction<RequestParams>) => {
            state.filteredByParams = filter(state.filteredByCategory, payload);

            function filter(list: Product[], params: RequestParams) {
                let tempArr = list.filter((prod) => prod.price >= params.min && prod.price <= params.max);
                if (tempArr.length > 0) {
                    tempArr = tempArr.filter((prod) => {
                        let i = 0;
                        let count = 0;
                        for (const feat in params.features) {
                            if ((params.features[feat as keyof typeof params.features] as string[]).length > 0) {
                                count++;
                                if ((params.features[feat as keyof typeof params.features] as string[]).includes(prod.features[feat])) {
                                    i++;
                                }
                            }
                        }
                        return i === count;
                    });
                }
                return tempArr;
            }
        },
        setRequestParams: (state, { payload }: PayloadAction<RequestParams>) => {
            state.requestParams = { min: payload.min, max: payload.max, features: payload.features };
        },
    },
});

export const { getProducts, filterByCategory, searchProducts, arrangeByCategories, filterByParams, setRequestParams } = productSlice.actions;
export default productSlice.reducer;
