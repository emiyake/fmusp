import type * as Types from '../base-schema';

import { gql } from '@apollo/client';
import type * as Apollo from '@apollo/client';
import { UserFragmentDoc } from './user.fragment';
export type LoginMutationVariables = Types.Exact<{
  data: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'Login';
    token: string;
    user: { __typename?: 'User'; id: string; name: string; email: string };
  };
};

export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    user {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
