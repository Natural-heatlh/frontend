import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Course } from '../../graphql';

type State = Course;

const setCourseReducer: CaseReducer<State, PayloadAction<Course>> = (
  state,
  action
) => (state = action.payload);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {} as Course,
  reducers: {
    setCourse: setCourseReducer
  }
});

export const { setCourse } = courseSlice.actions;

export default courseSlice.reducer;
