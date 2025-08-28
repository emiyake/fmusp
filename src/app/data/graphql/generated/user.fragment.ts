import { gql } from '@apollo/client';
export type UserFragment = { __typename?: 'User'; id: string; name: string; email: string };

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  name
  email
}
    `;
