import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUser, UserState } from "../common/types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

type UserProps = {
    email: string;
    password: string;
};

type RejectedValue = string;

export const createUser = createAsyncThunk<CurrentUser, UserProps, { rejectValue: RejectedValue }>("user/createUser", async (payload: UserProps, thunkAPI) => {
    const auth = getAuth();
    try {
        console.log(payload);

        const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        // Получаем ID токен (accessToken)
        const token: string = await user.getIdToken();
        return { email: user.email, id: user.uid, token: token } as CurrentUser;
    } catch (error: any) {
        let message = "Неизвестная ошибка";
        switch (error.code) {
            case "auth/email-already-in-use":
                message = "Такой email уже существует";
                break;
            case "auth/invalid-email":
                message = "Неверный формат email.";
                break;
            default:
                message = error.message || "Ошибка регистрации.";
        }
        return thunkAPI.rejectWithValue(message);
    }
});

export const loginUser = createAsyncThunk<CurrentUser, UserProps, { rejectValue: RejectedValue }>("user/loginUser", async (payload: UserProps, thunkAPI) => {
    const auth = getAuth();
    console.log(payload);
    try {
        const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        // Получаем ID токен (accessToken)
        const token: string = await user.getIdToken();
        return { email: user.email, id: user.uid, token: token } as CurrentUser;
    } catch (error: any) {
        console.log(error);
        let message = "Неизвестная ошибка";
        switch (error.code) {
            case "auth/invalid-email":
                message = "Неверный формат email.";
                break;
            case "auth/user-disabled":
                message = "Аккаунт отключён.";
                break;
            case "auth/user-not-found":
                message = "Пользователь не найден.";
                break;
            case "auth/wrong-password":
                message = "Неверный пароль.";
                break;
            default:
                message = error.message || "Ошибка при входе.";
        }
        return thunkAPI.rejectWithValue(message);
    }
});

const addCurrentUser = (state: UserState, payload: CurrentUser) => {
    console.log(payload);
    state.currentUser.id = payload.id;
    state.currentUser.email = payload.email;
    state.currentUser.token = payload.token;
};

const currentUser: CurrentUser = {
    email: null,
    token: null,
    id: null,
};

const initialState: UserState = {
    currentUser,
    formType: "login",
    error: null,
    notificationIsOpen: false,
    message: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser.email = action.payload.email;
            state.currentUser.token = action.payload.token;
            state.currentUser.id = action.payload.id;
        },
        removeUser(state) {
            state.currentUser.email = null;
            state.currentUser.token = null;
            state.currentUser.id = null;
        },
        changeFormType(state, { payload }: PayloadAction<string>) {
            state.formType = payload;
        },
        setNotificationIsOpen(state, { payload }: PayloadAction<boolean>) {
            state.notificationIsOpen = payload;
        },
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, { payload }) => {
            addCurrentUser(state, payload);
            state.message = "Ваш аккаунт успешно создан";
        }),
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.payload ?? null;
        }),
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            addCurrentUser(state, payload);
            state.message = "Вход успешно выполнен";
        }),
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload ?? null;
        });
    },
});

export const { setUser, removeUser, changeFormType, setNotificationIsOpen, resetError } = userSlice.actions;
export default userSlice.reducer;
