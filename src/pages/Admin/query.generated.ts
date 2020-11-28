import * as SchemaTypes from '../../graphql.d';

import { CourseFragmentFragment } from '../Course/fragment.generated';
export type CoursesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'id'>
    & CourseFragmentFragment
  )>> }
);

export type CourseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

export type DeleteCourseMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & { deleteCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'id'>
  )> }
);
