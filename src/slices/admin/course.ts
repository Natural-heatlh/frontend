import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AdminCourse } from '../../types';

type State = AdminCourse;

const setCourseReducer: CaseReducer<State, PayloadAction<AdminCourse>> = (
  state,
  action
) => (state = action.payload);

const initialState = {
  description: '',
  image: '',
  sections: [],
  title: '',
  isFree: false,
  isPublished: false
};

const courseSlice = createSlice({
  name: 'courses',
  initialState: initialState as AdminCourse,
  reducers: {
    setCourse: setCourseReducer,
    setSectionChild: (state: State, action) => {
      state.sections = state.sections.map((item) => {
        if (item.sectionId === action.payload.sectionId) {
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
        if (item?.sectionId === action.payload.sectionId) {
          const targetChildren = item.children || [];
          const updatedChildren = targetChildren.filter(
            (child) => child?.lectureId !== action.payload.removableId
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
        if (item?.sectionId === action.payload.sectionId) {
          return {
            ...item,
            children:
              item?.children?.map((item) => {
                if (item?.lectureId === action.payload.child?.lectureId) {
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
