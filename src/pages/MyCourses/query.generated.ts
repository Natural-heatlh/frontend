import * as SchemaTypes from '../../graphql.d';

export type UserCoursesQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type UserCoursesQuery = (
  { __typename?: 'Query' }
  & { userCourses: Array<SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'courseId' | 'title' | 'description' | 'image' | 'incomeDescription'>
    & { sections?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'Section' }
      & Pick<SchemaTypes.Section, 'sectionId'>
      & { children?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename: 'Theory' }
        & Pick<SchemaTypes.Theory, 'lectureId'>
      ) | (
        { __typename: 'Video' }
        & Pick<SchemaTypes.Video, 'lectureId'>
      ) | (
        { __typename: 'Test' }
        & Pick<SchemaTypes.Test, 'lectureId'>
      )>>> }
    )>>> }
  )>> }
);
