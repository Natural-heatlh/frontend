import * as SchemaTypes from '../../graphql.d';

export type CheckTestResultMutationVariables = SchemaTypes.Exact<{
  input?: SchemaTypes.Maybe<SchemaTypes.TestResultInput>;
}>;


export type CheckTestResultMutation = (
  { __typename?: 'Mutation' }
  & { checkTestResult?: SchemaTypes.Maybe<(
    { __typename?: 'TestResult' }
    & Pick<SchemaTypes.TestResult, 'id' | 'wrong' | 'correct' | 'isCompleted'>
  )> }
);
