import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  toastContent: {
    type: '',
    message: '',
    statusCode: '',
    data: '',
    action: {
      label: '',
      onPress: () => {},
    },
    duration: 3000,
    toastStyles: {},
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToastContent: (state, action) => {
      state.toastContent = action.payload;
    },
    resetAppSlice: () => initialState,
  },
});

export const {setToastContent, resetAppSlice} = appSlice.actions;

export default appSlice.reducer;
