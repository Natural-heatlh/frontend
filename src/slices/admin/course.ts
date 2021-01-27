import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AdminCourse } from '../../types';
import { Section } from '../../graphql';

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
    toggleIsPublished: (
      state: State,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isPublished = !state.isPublished;
      return state;
    },
    toggleIsFree: (
      state: State,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isFree = !state.isFree;
      return state;
    },
    addSection: (state: State, action: PayloadAction<Section>) => {
      state.sections.push(action.payload);
    },
    editSectionTitle: (state: State, action) => {
      state.sections = state.sections?.map((item) =>
        item?.sectionId === action.payload.sectionId
          ? { ...item, title: action.payload.title }
          : item
      )
    },
    updateCourseImage: (state: State, action) => {
      state.image = action.payload;
    },
    updateCourseDescription: (state: State, action) => {
      state.description = action.payload;
      return state;
    },
    updateCourseTitle: (state: State, action) => {
      state.title = action.payload;
      return state;
    },
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
  editSectionChild,
  updateCourseDescription,
  updateCourseTitle,
  updateCourseImage,
  toggleIsFree,
  toggleIsPublished,
  addSection,
  editSectionTitle
} = courseSlice.actions;

export default courseSlice.reducer;
