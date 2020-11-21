import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  isLoggedIn: boolean;
};

const setIsAuthReducer: CaseReducer<State, PayloadAction<boolean>> = (
  state,
  action
) =>
  (state = {
    ...state,
    isLoggedIn: action.payload
  });

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsAuth: setIsAuthReducer
  }
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
