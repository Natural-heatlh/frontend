import * as SchemaTypes from '../../graphql.d';

export type CurrentUserQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'id' | 'email' | 'firstName' | 'lastName' | 'country'>
    & { courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'id'>
      & { progress?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
        { __typename?: 'Progress' }
        & Pick<SchemaTypes.Progress, 'id'>
      )>>> }
    )>>> }
  )> }
);
