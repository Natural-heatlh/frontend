import * as SchemaTypes from '../../../graphql.d';

export type CreateCourseMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.CreateCourseInput>;
}>;


export type CreateCourseMutation = (
  { __typename?: 'Mutation' }
  & { createCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'id' | 'title' | 'image'>
  )> }
);
