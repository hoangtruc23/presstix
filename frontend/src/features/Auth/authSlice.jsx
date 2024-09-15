import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers:{
        doLogin(state, action) {
            console.log({state});
            console.log({action});
        },
        doLogout(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        }

    },
});

export const { doLogin  } = authSlice.actions;
export default authSlice.reducer;