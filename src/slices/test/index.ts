import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

type TestItem = {
  id: string;
  value: string;
};

type State = TestItem[];

const setTestReducer: CaseReducer<State, PayloadAction<TestItem>> = (
  state,
  action
) => {
  const { id, value } = action.payload;

  if (!state.find((item) => item.id === id)) {
    state.push({ id, value });
    return state;
  } else {
    state = state.map((item) => {
      if (item.id === id) {
        return {
          id,
          value: value
        };
      }
      return item;
    });

    return state;
  }
};

const testSlice = createSlice({
  name: 'testResult',
  initialState: [] as TestItem[],
  reducers: {
    setTest: setTestReducer,
    resetTest: (state: State, action) => (state = [])
  }
});

export const { setTest, resetTest } = testSlice.actions;

export default testSlice.reducer;
