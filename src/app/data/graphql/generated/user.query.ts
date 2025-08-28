import type * as Types from '../base-schema';

import { gql } from '@apollo/client';
import type * as Apollo from '@apollo/client';
export type UserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: 'Query';
  user: { __typename?: 'User'; id: string; name: string; email: string };
};

export const UserDocument = gql`
    query User {
  user {
    id
    name
    email
  }
}
    `;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
