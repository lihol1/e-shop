import { createSlice } from "@reduxjs/toolkit";
import { Data, Product, ProductState, SearchParams } from "../types";
import * as productData from "../data.json";

const data = productData as unknown as Data;

const initialState: ProductState = {
    productList: [],
    categoryList: [],
    filteredByCategory: [],
    filteredByParams: null,
    foundProducts: [],
    searchList: [],
    maxPrice: 0,
    cart: [],
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getCategories: (state) => {
            state.categoryList = data.categories;
        },
        getProducts: (state) => {
            state.productList = data.products;
        },
        filterByCategory: (state, { payload }) => {
            state.filteredByCategory = state.productList.filter(({ categoryId }) => categoryId == payload);
            state.maxPrice = Math.max(...state.filteredByCategory.map((prod) => prod.price));
        },
        searchProducts: (state, { payload }) => {
            state.foundProducts = search(state.productList, payload);

            function search(list: Product[], string: string) {
                string = string.toLowerCase();
                const splitArr = string.split(" ");

                let arrByName: [] | Product[];
                let arrByFeatures: [] | Product[];

                arrByName = list.filter((prod: Product) => {
                    if (splitArr.length == 1) {
                        return prod.name.toLowerCase().includes(string);
                    } else {
                        let i = 0;
                        for (let el of splitArr) {
                            if (prod.name.toLowerCase().includes(el)) {
                                i++;
                            }
                        }
                        if (i > 1) return true;
                    }
                });

                //смотрим по характеристикам либо в найденном, либо во всем списке

                if (arrByName.length > 0) {
                    arrByFeatures = arrByName.filter((prod) => {
                        for (let feat in prod.features) {
                            for (let el of splitArr) {
                                if (prod.features[feat].toLowerCase().match(el)) {
                                    return true;
                                }
                            }
                        }
                    });
                    if (arrByFeatures.length == 0) return arrByName;
                    return arrByFeatures;
                } else {
                    arrByFeatures = list.filter((prod) => {
                        for (let feat in prod.features) {
                            for (let el of splitArr) {
                                if (prod.features[feat].toLowerCase().match(el)) {
                                    return true;
                                }
                            }
                        }
                    });

                    return arrByFeatures;
                }
            }
        },
        arrangeByCategories: (state) => {
            console.log("arrange");
            let catIdList = [];
            state.searchList = [];
            if (state.foundProducts.length > 0) {
                //определяем id категорий найденных продуктов
                for (let elem of state.foundProducts) {
                    catIdList.push(elem.categoryId);
                }
                catIdList = [...new Set(catIdList)];

                // делим на отдельные массивы по категориям
                for (let catId of catIdList) {
                    state.searchList.push(state.foundProducts.filter((prod) => prod.categoryId === catId));
                }
            }
        },

        filterByParams: (state, { payload }) => {
            state.filteredByParams = filter(state.filteredByCategory, payload);

            function filter(list: Product[], params: SearchParams) {
                let tempArr = list.filter((prod) => prod.price >= params.min && prod.price <= params.max);
                if (tempArr.length > 0) {
                    tempArr = tempArr.filter((prod) => {
                        let i = 0;
                        let count = 0;
                        for (let feat in params.features) {
                            if ((params.features[feat as keyof typeof params.features] as string[]).length > 0) {
                                count++;
                                if ((params.features[feat as keyof typeof params.features] as string[]).includes(prod.features[feat])) {
                                    i++;
                                }
                            }
                        }
                        if (i == count) return true;
                        return false;
                    });
                }
                return tempArr;
            }
        },
        addItemToCart: (state, { payload }) => {
            let newCart = [...state.cart];
            const found = state.cart.find((prod) => prod.id === payload.id);
            if (found) {
                newCart = newCart.map((prod) => {
                    return prod.id === payload.id ? { ...prod, quantity: payload.quantity || (prod.quantity?? 0) + 1 } : prod;
                });
            } else {
                newCart.push({ ...payload, quantity: 1 });
            }
            state.cart = newCart;           
        },
        removeItemFromCart: (state, { payload }) => {
            state.cart = state.cart.filter(({ id }) => id !== payload);
        },
    },
});

export const { getCategories, getProducts, filterByCategory, searchProducts, arrangeByCategories, filterByParams, addItemToCart, removeItemFromCart } = productSlice.actions;
export default productSlice.reducer;
