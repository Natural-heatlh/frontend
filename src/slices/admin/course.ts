import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AdminCourse } from '../../types';

type State = AdminCourse;

const setCourseReducer: CaseReducer<State, PayloadAction<AdminCourse>> = (
  state,
  action
) => (state = action.payload);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {} as AdminCourse,
  reducers: {
    setCourse: setCourseReducer,
    setSectionChild: (state: State, action) => {
      state.sections = state.sections.map((item) => {
        if (item.title === action.payload.activeSection) {
          const updatedChildren = item.children || [];
          updatedChildren.push(action.payload.child);
          return {
            ...item,
            children: updatedChildren
          };
        }
        return item;
      });
      console.log(state.sections);
      return state;
    }
  }
});

export const { setCourse, setSectionChild } = courseSlice.actions;

export default courseSlice.reducer;
