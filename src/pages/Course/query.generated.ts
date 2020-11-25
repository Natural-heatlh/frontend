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
