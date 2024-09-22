import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        account: {
            name: null,
            token: null,
            role: null,
            image: null,
        },
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess(state, action) {
            console.log({ action });
            state.account.name = action.payload.user.name;
            state.account.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.account.name = null;
            state.account.token = null;
            state.isAuthenticated = false;
        },

    },
});

export const { loginSuccess,logoutSuccess } = authSlice.actions;
export default authSlice.reducer;