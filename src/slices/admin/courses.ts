import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../graphql';

type State = Course[];

const setCoursesReducer: CaseReducer<State, PayloadAction<Course[]>> = (
  state,
  action
) => (state = action.payload);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: [] as Course[],
  reducers: {
    setCourses: setCoursesReducer,
  }
});

export const { setCourses } = coursesSlice.actions;

export default coursesSlice.reducer;

