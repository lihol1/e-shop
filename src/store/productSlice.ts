import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data, Order, PopularCategory, Product, ProductState, SearchParams } from "../types";
import * as productData from "../data.json";
import { search } from "../utilities";

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

const initialState: ProductState = {
    productList: [],
    categoryList: [],
    filteredByCategory: [],
    filteredByParams: null,
    foundProducts: [],
    searchList: [],
    maxPrice: 0,
    cart: [],
    order: defaultValues,
    orders: [],
    popularCategories: [],
    store: storeData,
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
        filterByCategory: (state, { payload }: PayloadAction<string>) => {
            state.filteredByCategory = state.productList.filter(({ categoryId }) => categoryId === Number(payload));
            state.maxPrice = Math.max(...state.filteredByCategory.map((prod) => prod.price));
        },
        searchProducts: (state, { payload }: PayloadAction<string>) => {
            state.foundProducts = [];
            state.foundProducts = search(state.productList, payload);
        },
        arrangeByCategories: (state) => {
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
            } else {
                state.searchList = [];
            }
        },
        filterByParams: (state, { payload }: PayloadAction<SearchParams>) => {
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
                        return i === count;
                    });
                }
                return tempArr;
            }
        },
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
        getPopularCategories: (state)=>{
            if (state.order.products.length > 0) {
                let categoriesArr: PopularCategory[]= [];
                state.order.products.forEach((prod) => {
                    if (prod.quantity) {
                        categoriesArr.unshift({ categoryId: prod.categoryId, quantity: prod.quantity });
                        console.log(categoriesArr);
                    }
                });
                categoriesArr.sort((a,b)=>b.quantity - a.quantity)
                const categoriesIds = categoriesArr.map((elem)=>elem.categoryId)
                const categoriesIdsUnique = [...new Set(categoriesIds)];

                state.popularCategories = [...state.popularCategories, ...state.categoryList.filter((cat)=>categoriesIdsUnique.includes(cat.id))]
                              
            }
        }
    },
});

export const { getCategories, getProducts, filterByCategory, searchProducts, arrangeByCategories, filterByParams, addItemToCart, removeItemFromCart, clearCart, formOrder, addOrder,getPopularCategories } = productSlice.actions;
export default productSlice.reducer;
