import * as SchemaTypes from '../../graphql.d';

export type LandingCoursesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type LandingCoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'courseId' | 'title' | 'image' | 'description' | 'incomeDescription'>
  )>> }
);
