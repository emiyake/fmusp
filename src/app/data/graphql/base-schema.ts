import type { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
};
export default result;

export type LoginKeySpecifier = ('token' | 'user' | LoginKeySpecifier)[];
export type LoginFieldPolicy = {
  token?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = ('createUser' | 'forgotPassword' | 'login' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
  createUser?: FieldPolicy<any> | FieldReadFunction<any>;
  forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = ('user' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = ('email' | 'id' | 'name' | UserKeySpecifier)[];
export type UserFieldPolicy = {
  email?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  Login?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | LoginKeySpecifier | (() => undefined | LoginKeySpecifier);
    fields?: LoginFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export const namedOperations = {
  Query: {
    User: 'User' as const,
  },
  Mutation: {
    Login: 'Login' as const,
  },
  Fragment: {
    User: 'User' as const,
  },
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ForgotPasswordInput = {
  /** User e-mail */
  email: Scalars['String']['input'];
};

/** Login response object */
export type Login = {
  __typename?: 'Login';
  /** JWT token */
  token: Scalars['String']['output'];
  /** User */
  user: User;
};

/** Infos para realizar login */
export type LoginInput = {
  /** E-mail */
  email: Scalars['String']['input'];
  /** Password */
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create user */
  createUser: Scalars['String']['output'];
  /** Tries to recover user password */
  forgotPassword: Scalars['String']['output'];
  /** Authenticate as user or admin */
  login: Login;
};

export type MutationCreateUserArgs = {
  data: UserInput;
};

export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  /** Get user by id */
  user: User;
};

export type User = {
  __typename?: 'User';
  /** User email */
  email: Scalars['String']['output'];
  /** User id */
  id: Scalars['ID']['output'];
  /** User name */
  name: Scalars['String']['output'];
};

export type UserInput = {
  /** User email */
  email: Scalars['String']['input'];
  /** User name */
  name: Scalars['String']['input'];
  /** User password */
  password: Scalars['String']['input'];
};
