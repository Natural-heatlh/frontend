import * as SchemaTypes from '../../graphql.d';

export type CourseFragmentFragment = (
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
);
