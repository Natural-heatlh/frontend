import * as SchemaTypes from '../../graphql.d';

export type CourseQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'title' | 'description'>
  )>>> }
);
