import * as SchemaTypes from '../../graphql.d';

import { CourseFragmentFragment } from '../Course/fragment.generated';
export type AdminCoursesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type AdminCoursesQuery = (
  { __typename?: 'Query' }
  & { adminCourses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )>> }
);

export type AdminCourseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type AdminCourseQuery = (
  { __typename?: 'Query' }
  & { adminCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

export type UsersQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'firstName' | 'lastName' | 'partnerID' | 'email'>
    & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'courseId' | 'level' | 'progress' | 'isCompleted'>
    )>>> }
  )>> }
);

export type DeleteCourseMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & { deleteCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'courseId'>
  )> }
);

export type UpdateCourseMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
  input?: SchemaTypes.Maybe<SchemaTypes.UpdateCourseInput>;
}>;


export type UpdateCourseMutation = (
  { __typename?: 'Mutation' }
  & { updateCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

export type CreateCourseMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.CreateCourseInput>;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

export type AddUserCoursesMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.AddCoursesInput>;
}>;


export type AddUserCoursesMutation = (
  { __typename?: 'Mutation' }
  & { updateUserCourses?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'email'>
    & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'courseId' | 'level' | 'progress' | 'isCompleted'>
    )>>> }
  )> }
);
