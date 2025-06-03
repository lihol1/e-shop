import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, PopularCategory, Product } from "../utils/types";
import * as data from "../data.json";

const initialState: CategoriesState = {
    categoryList: [],
    categoryGroups: [],
    popularCategories: [],
    renderList: [],
    categoryId: undefined,
    categoryName: "",
};

export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        getCategories: (state) => {
            state.categoryList = data.categories;
        },
        getCategoryGroups: (state) => {
            state.categoryGroups = data.categoryGroups;
        },
        getPopularCategories: (state, { payload }: PayloadAction<Product[]>) => {
            if (payload.length > 0) {
                const categoriesArr: PopularCategory[] = [];
                payload.forEach((prod) => {
                    if (prod.quantity) {
                        categoriesArr.push({ categoryId: prod.categoryId, quantity: prod.quantity });
                    }
                });
                //сортируем по количеству заказанного товара
                categoriesArr.sort((a, b) => b.quantity - a.quantity);
                const categoriesIds = categoriesArr.map((elem) => elem.categoryId);
                const categoriesIdsUnique = [...new Set(categoriesIds)];

                state.popularCategories = [...state.categoryList.filter((cat) => categoriesIdsUnique.includes(cat.id)), ...state.popularCategories];
                //удаляем дубли
                const idsArr = state.popularCategories.map((category) => category.id);
                const uniqueIdsArr = [...new Set(idsArr)];
                state.popularCategories = state.categoryList.filter((category) => uniqueIdsArr.includes(category.id));
            }
        },
        getTenPopularCategories: (state) => {
            if (state.popularCategories.length === 0) {
                state.renderList = state.categoryList.slice(0, 10);
            } else {
                if (state.popularCategories.length > 0 && state.popularCategories.length < 10) {
                    const difference = 10 - state.popularCategories.length;
                    //избавляемся от  дублей
                    const idsArr = state.popularCategories.map((category) => category.id);
                    const uniqueIdsArr = [...new Set(idsArr)];

                    // дополняем до 10 штук
                    let i = 1;
                    const adds = state.renderList.filter((category) => {
                        if (category) {
                            if (i <= difference) {
                                if (!uniqueIdsArr.includes(category.id)) {
                                    i++;
                                    return true;
                                }
                            }
                        }
                    });
                    state.renderList = [...state.popularCategories, ...adds];
                } else if (state.popularCategories.length >= 10) {
                    state.renderList = state.popularCategories.slice(0, 10);
                }
            }
        },
        setCategoryId: (state, { payload }: PayloadAction<number>) => {
            state.categoryId = payload;
        },
        setCategoryName: (state, { payload }: PayloadAction<string>) => {
            state.categoryName = payload;
        },
    },
});

export const { getCategories, getCategoryGroups, getPopularCategories, getTenPopularCategories, setCategoryId, setCategoryName } = categorySlice.actions;
export default categorySlice.reducer;
