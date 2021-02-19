import * as SchemaTypes from '../../graphql.d';

export type PresentationCourseQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type PresentationCourseQuery = (
  { __typename?: 'Query' }
  & { presentationCourse?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & Pick<SchemaTypes.Course, 'courseId' | 'title' | 'description' | 'image' | 'incomeDescription' | 'longDescription' | 'price' | 'isFree' | 'isPublished' | 'level'>
    & { sections?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'Section' }
      & Pick<SchemaTypes.Section, 'sectionId' | 'title'>
      & { children?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename: 'Theory' }
        & Pick<SchemaTypes.Theory, 'lectureId' | 'title'>
      ) | (
        { __typename: 'Video' }
        & Pick<SchemaTypes.Video, 'lectureId' | 'title'>
      ) | (
        { __typename: 'Test' }
        & Pick<SchemaTypes.Test, 'lectureId' | 'title'>
      )>>> }
    )>>> }
  )> }
);
