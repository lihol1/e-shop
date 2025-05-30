import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState, Iprops } from "../types";

const initialState: GeneralState = {
    currentPage: 1,
    catalogIsOpen: false,
    submenuIsOpen: false,
    currentProps: { title: "", list: [] },
    headerSearchValue: "",
    isShown: false,
    formIsOpen: false,
    modalIsOpen: false,
};

export const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setCurrentPage: (state, { payload }: PayloadAction<number>) => {
            state.currentPage = payload;
        },
        setCatalogIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.catalogIsOpen = payload;
        },
        setSubmenuIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.submenuIsOpen = payload;
        },
        setCurrentProps: (state, { payload }: PayloadAction<Iprops>) => {
            state.currentProps = { title: payload.title, list: payload.list };
        },
        setHeaderSearchValue: (state, { payload }: PayloadAction<string>) => {
            state.headerSearchValue = payload;
        },
        setIsShown: (state, { payload }: PayloadAction<boolean>) => {
            state.isShown = payload;
        },
        setFormIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.formIsOpen = payload;
        },
        setModalIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.modalIsOpen = payload;
        },
    },
});

export const { setCurrentPage, setCatalogIsOpen, setSubmenuIsOpen, setCurrentProps, setHeaderSearchValue, setIsShown, setFormIsOpen, setModalIsOpen } = generalSlice.actions;
export default generalSlice.reducer;
