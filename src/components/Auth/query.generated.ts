import * as SchemaTypes from '../../graphql.d';

export type CurrentUserQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'id' | 'email' | 'firstName' | 'lastName' | 'country' | 'city' | 'phone' | 'partnerID' | 'role' | 'status'>
    & { certificates?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'Certificate' }
      & Pick<SchemaTypes.Certificate, 'courseId' | 'name' | 'url'>
    )>>>, courses?: SchemaTypes.Maybe<Array<SchemaTypes.Maybe<(
      { __typename?: 'UserCourse' }
      & Pick<SchemaTypes.UserCourse, 'courseId' | 'level' | 'progress' | 'isCompleted'>
    )>>> }
  )> }
);
