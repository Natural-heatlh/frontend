import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Theory } from '../../graphql';

type State = Theory;

const setTheoryReducer: CaseReducer<State, PayloadAction<Theory>> = (
  state,
  action
) => {
  console.log(state, action);
  return state = action.payload
};

const sectionsSlice = createSlice({
  name: 'theory',
  initialState: {} as Theory,
  reducers: {
    setTheory: setTheoryReducer,
  }
});

export const { setTheory } = sectionsSlice.actions;

export default sectionsSlice.reducer;

