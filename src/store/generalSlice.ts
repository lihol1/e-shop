import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState, IProps } from "../common/types";

const initialState: GeneralState = {
    currentPage: 1,
    catalogIsOpen: false,
    submenuIsOpen: false,
    currentProps: { title: "", list: [] },
    headerSearchValue: "",
    isShown: false,
    formIsOpen: false,
    modalIsOpen: false,
    regFormIsOpen: false,
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
        setCurrentProps: (state, { payload }: PayloadAction<IProps>) => {
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
        setRegFormIsOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.regFormIsOpen = payload;
        },
    },
});

export const { setCurrentPage, setCatalogIsOpen, setSubmenuIsOpen, setCurrentProps, setHeaderSearchValue, setIsShown, setFormIsOpen, setModalIsOpen, setRegFormIsOpen } = generalSlice.actions;
export default generalSlice.reducer;
