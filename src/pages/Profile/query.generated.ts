import * as SchemaTypes from '../../graphql.d';

export type UpdateUserDataMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.UserDataInput>;
}>;


export type UpdateUserDataMutation = (
  { __typename?: 'Mutation' }
  & { updateUserData?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'id' | 'firstName' | 'lastName' | 'city' | 'country' | 'phone' | 'partnerID'>
  )> }
);

export type UpdateUserPasswordMutationVariables = SchemaTypes.Exact<{
  currentPassword?: SchemaTypes.Maybe<SchemaTypes.Scalars['String']>;
  password?: SchemaTypes.Maybe<SchemaTypes.Scalars['String']>;
}>;


export type UpdateUserPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateUserPassword?: SchemaTypes.Maybe<(
    { __typename?: 'User' }
    & Pick<SchemaTypes.User, 'id'>
  )> }
);
