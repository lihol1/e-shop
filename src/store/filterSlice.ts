import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feat, FilterFeature, FilterState } from "../types";

const initialState: FilterState = {
    priceValues: [0, 0],
    rangeValues: [0, 0],
    featureValues: undefined,
    filterFeatures: {},
    searchFilter: { price: true },
    searchValue: "",
    emptyFilter: false,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setPriceValues: (state, { payload }: PayloadAction<number[]>) => {
            state.priceValues = payload;
        },
        setRangeValues: (state, { payload }: PayloadAction<number[]>) => {
            state.rangeValues = payload;
        },
        setFeatureValues: (state, { payload }: PayloadAction<Feat | undefined>) => {
            state.featureValues = payload;
        },
        setFilterFeatures: (state, { payload }: PayloadAction<{} | FilterFeature>) => {
            state.filterFeatures = payload;
        },
        setSearchFilter: (state, { payload }: PayloadAction<{} | FilterFeature>) => {
            state.searchFilter = payload;
        },
        setSearchValue: (state, { payload }: PayloadAction<string>) => {
            state.searchValue = payload;
        },
        setEmptyFilter: (state, { payload }: PayloadAction<boolean>) => {
            state.emptyFilter = payload;
        },
    },
});

export const { setPriceValues, setRangeValues, setFeatureValues, setFilterFeatures, setSearchFilter, setSearchValue, setEmptyFilter } = filterSlice.actions;
export default filterSlice.reducer;
