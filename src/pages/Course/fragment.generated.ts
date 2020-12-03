import * as SchemaTypes from '../../graphql.d';

export type CourseFragmentFragment = (
  { __typename?: 'Course' }
  & Pick<SchemaTypes.Course, 'title' | 'description'>
  & { sections?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
    { __typename?: 'Section' }
    & Pick<SchemaTypes.Section, 'id' | 'title'>
    & { children?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename: 'Theory' }
      & Pick<SchemaTypes.Theory, 'id' | 'type' | 'title' | 'content' | 'audio'>
      & { slides?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename?: 'Slide' }
        & Pick<SchemaTypes.Slide, 'id' | 'url'>
      )>>> }
    ) | (
      { __typename: 'Video' }
      & Pick<SchemaTypes.Video, 'id' | 'type' | 'title' | 'url'>
    ) | (
      { __typename: 'Test' }
      & Pick<SchemaTypes.Test, 'id' | 'type' | 'title' | 'description'>
      & { items?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename?: 'TestItem' }
        & Pick<SchemaTypes.TestItem, 'id' | 'question'>
        & { answers?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
          { __typename?: 'Answer' }
          & Pick<SchemaTypes.Answer, 'id' | 'title' | 'isCorrect'>
        )>>> }
      )>>> }
    )>>> }
  )>>> }
);
