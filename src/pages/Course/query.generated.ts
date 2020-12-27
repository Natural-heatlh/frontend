import * as SchemaTypes from '../../graphql.d';

import { CourseFragmentFragment } from './fragment.generated';
export type CourseQueryQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


export type CourseQueryQuery = (
  { __typename?: 'Query' }
  & { course?: SchemaTypes.Maybe<(
    { __typename?: 'Course' }
    & CourseFragmentFragment
  )> }
);

export type AddToProgressMutationVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
  courseId: SchemaTypes.Scalars['ID'];
}>;


export type AddToProgressMutation = (
  { __typename?: 'Mutation' }
  & { addToProgress?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'id'>
    & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'courseId' | 'progress' | 'isCompleted'>
    )>>> }
  )> }
);
