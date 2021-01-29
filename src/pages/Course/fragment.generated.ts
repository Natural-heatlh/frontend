import * as SchemaTypes from '../../graphql.d';

export type CourseFragmentFragment = (
  { __typename?: 'Course' }
  & Pick<SchemaTypes.Course, 'courseId' | 'title' | 'image' | 'description' | 'isFree' | 'isPublished'>
  & { sections?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
    { __typename?: 'Section' }
    & Pick<SchemaTypes.Section, 'sectionId' | 'title'>
    & { children?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename: 'Theory' }
      & Pick<SchemaTypes.Theory, 'lectureId' | 'type' | 'title' | 'content' | 'audio'>
      & { slides?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename?: 'Slide' }
        & Pick<SchemaTypes.Slide, 'slideId' | 'url' | 'uid' | 'name' | 'status'>
      )>>> }
    ) | (
      { __typename: 'Video' }
      & Pick<SchemaTypes.Video, 'lectureId' | 'type' | 'title' | 'url'>
    ) | (
      { __typename: 'Test' }
      & Pick<SchemaTypes.Test, 'lectureId' | 'type' | 'title' | 'description'>
      & { items?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename?: 'TestItem' }
        & Pick<SchemaTypes.TestItem, 'itemId' | 'question'>
        & { answers?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
          { __typename?: 'Answer' }
          & Pick<SchemaTypes.Answer, 'answerId' | 'title' | 'isCorrect'>
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);
