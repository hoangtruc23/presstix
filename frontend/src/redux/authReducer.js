import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        account: {
            id:null,
            email: null,
            name: null,
            phone: null,
            token: null,
            role: null,
            image: null,
        },
        isAuthenticated: false,
    },
    reducers: {
        loginSuccess(state, action) {
            state.account.id = action.payload.user.id;
            state.account.email = action.payload.user.email;
            state.account.name = action.payload.user.name;
            state.account.phone = action.payload.user.phone;
            state.account.token = action.payload.token;
            state.account.role = action.payload.role;
            state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.account.id = null;
            state.account.email = null;
            state.account.name = null;  
            state.account.phone = null;
            state.account.token = null;
            state.account.role = null;
            state.isAuthenticated = false;
        },
        
        updateUser(state, action) {
            state.account = {
                ...state.account,
                ...action.payload,
            };
        },

    },
});



export const { loginSuccess,logoutSuccess,updateUser } = authSlice.actions;
export default authSlice.reducer;