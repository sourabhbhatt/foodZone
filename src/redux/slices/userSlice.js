import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartInfo: [],
  userConfig: {}, // user's data
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserConfig: (state, action) => {
      state.userConfig = {...action.payload};
    },
    setCartInfo: (state, action) => {
      state.cartInfo = action.payload;
    },
    logOut: () => initialState,
  },
});

export const {setUserConfig, setCartInfo, logOut} = userSlice.actions;
export default userSlice.reducer;
