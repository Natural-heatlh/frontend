import * as SchemaTypes from '../../graphql.d';

import { CourseFragmentFragment } from '../Course/fragment.generated';
export type CoursesQueryQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CoursesQueryQuery = (
  { __typename?: 'Query' }
  & { courses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'id'>
    & CourseFragmentFragment
  )>> }
);

export type BuyCourseMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type BuyCourseMutation = (
  { __typename?: 'Mutation' }
  & { buyCourse?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'email' | 'id'>
    & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'courseId' | 'progress' | 'isCompleted'>
    )>>> }
  )> }
);
