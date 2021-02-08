import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { Course, Section } from '../../graphql';

type State = Course;

const setCourseReducer: CaseReducer<State, PayloadAction<Course>> = (
  state,
  action
) => (state = action.payload);

const initialState = {
  courseId: '',
  description: '',
  image: '',
  sections: [],
  title: '',
  isFree: false,
  isPublished: false,
  incomeDescription: ''
};

const courseSlice = createSlice({
  name: 'courses',
  initialState: initialState as Course,
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
      state.sections?.push(action.payload);
      return state;
    },
    editSectionTitle: (state: State, action) => {
      state.sections = state.sections?.map((item) =>
        item?.sectionId === action.payload.sectionId
          ? {
              ...item,
              sectionId: item?.sectionId as string,
              title: action.payload.title
            }
          : item
      );
      return state;
    },
    updateCourseImage: (state: State, action) => {
      state.image = action.payload;
      return state;
    },
    updateCourseDescription: (state: State, action) => {
      state.description = action.payload;
      return state;
    },
    updateCourseTitle: (state: State, action) => {
      state.title = action.payload;
      return state;
    },
    updateIncomeDescription: (state: State, action) => {
      state.incomeDescription = action.payload;
      return state;
    },
    updateLongDescription: (state: State, action) => {
      state.longDescription = action.payload;
      return state;
    },
    updatePrice: (state: State, action) => {
      state.price = action.payload;
      return state;
    },
    updateLevel: (state: State, action) => {
      state.level = action.payload;
      return state;
    },
    changeLectureOrder: (state: State, action) => {
      console.log('active Section', action.payload.sectionId);

      const children =
        state?.sections?.find(
          (item) => item?.sectionId === action.payload?.sectionId
        )?.children || [];

      const temp = children[action.payload.currentIndex];
      children.splice(action.payload.currentIndex, 1);
      children.splice(action.payload.destinationIndex, 0, temp);

      // TODO Fix any type
      state.sections =
        state.sections?.map<any>((item) => {
          return item?.sectionId === action.payload?.sectionId
            ? { ...item, children: [...children] }
            : item;
        }) || [];

      return state;
    },
    setCourse: setCourseReducer,
    setSectionChild: (state: State, action) => {
      state.sections = state.sections?.map((item) => {
        if (item?.sectionId === action.payload.sectionId) {
          const updatedChildren = item?.children || [];
          updatedChildren.push(action.payload.child);
          return {
            ...item,
            sectionId: item?.sectionId as string,
            children: updatedChildren
          };
        }
        return item;
      });
      return state;
    },
    removeSectionChild: (state: State, action) => {
      state.sections = state.sections?.map((item) => {
        if (item?.sectionId === action.payload.sectionId) {
          const targetChildren = item?.children || [];
          const updatedChildren = targetChildren.filter(
            (child) => child?.lectureId !== action.payload.removableId
          );
          return {
            ...item,
            sectionId: item?.sectionId as string,
            children: updatedChildren
          };
        }
        return item;
      });
      return state;
    },
    editSectionChild: (state: State, action) => {
      state.sections = state.sections?.map((item) => {
        if (item?.sectionId === action.payload.sectionId) {
          return {
            ...item,
            sectionId: item?.sectionId as string,
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
  updateIncomeDescription,
  updateCourseTitle,
  updateCourseImage,
  toggleIsFree,
  toggleIsPublished,
  addSection,
  editSectionTitle,
  updateLevel,
  updateLongDescription,
  updatePrice,
  changeLectureOrder
} = courseSlice.actions;

export default courseSlice.reducer;
