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
      return state;
    },
    removeSectionChild: (state: State, action) => {
      state.sections = state.sections.map((item) => {
        if (item.title === action.payload.activeSectionName) {
          const targetChildren = item.children || [];
          const updatedChildren = targetChildren.filter(
            (item) => item?.title !== action.payload.activeSectionChild
          );
          return {
            ...item,
            children: updatedChildren
          };
        }
        return item;
      });
      return state;
    },
    editSectionChild: (state: State, action) => {
      state.sections = state.sections.map((item) => {
        if (item.title === action.payload.activeSection) {
          return {
            ...item,
            children:
              item?.children?.map((item) => {
                if (item?.id === action.payload.child?.id) {
                  return { ...item, ...action.payload.child };
                }
                return item;
              }) || []
          };
        }
        return item;
      });
      return state;
    }
  }
});

export const {
  setCourse,
  setSectionChild,
  removeSectionChild,
  editSectionChild
} = courseSlice.actions;

export default courseSlice.reducer;