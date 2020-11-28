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
