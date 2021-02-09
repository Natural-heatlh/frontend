import * as SchemaTypes from '../../graphql.d';

export type CoursesQueryQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CoursesQueryQuery = (
  { __typename?: 'Query' }
  & { courses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'courseId' | 'title' | 'image' | 'description' | 'isFree' | 'isPublished' | 'level' | 'incomeDescription'>
  )>> }
);
