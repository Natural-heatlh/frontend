import { ApolloError } from '@apollo/client';

export const getUserInputError = (
  error: ApolloError
) => {
  let errors: { param: string; msg: string }[] = [];

  error.graphQLErrors.forEach((item) => {
    if (item.extensions?.code === 'BAD_USER_INPUT') {
      errors = item.extensions?.errors || [];
    }
  });

  return errors;
};
