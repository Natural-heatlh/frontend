import * as SchemaTypes from '../../graphql.d';

export type CoursesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'id' | 'title' | 'description'>
  )>> }
);

export type CourseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type CourseQuery = (
  { __typename?: 'Query' }
  & { course?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'title' | 'description'>
    & { sections?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'Section' }
      & Pick<SchemaTypes.Section, 'id' | 'title'>
      & { children?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename: 'Theory' }
        & Pick<SchemaTypes.Theory, 'title' | 'content'>
      ) | (
        { __typename: 'Video' }
        & Pick<SchemaTypes.Video, 'title' | 'url'>
      ) | (
        { __typename: 'Test' }
        & Pick<SchemaTypes.Test, 'title' | 'description'>
        & { items?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
          { __typename?: 'TestItem' }
          & Pick<SchemaTypes.TestItem, 'question' | 'correctAnswerNumber'>
          & { answers?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
            { __typename?: 'Answer' }
            & Pick<SchemaTypes.Answer, 'title' | 'number'>
          )>>> }
        )>>> }
      )>>> }
    )>>> }
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
