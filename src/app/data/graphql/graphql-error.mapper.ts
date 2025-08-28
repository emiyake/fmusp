import type { ApolloError } from '@apollo/client';
import { AppError, ErrorType } from '@app/model';
import type { GraphQLError as GraphQLOriginalError } from 'graphql';

interface NetworkError {
  name: string;
  response: {
    status: number;
  };
  statusCode: number;
  bodyText?: string;
  result?: any;
}

export type CustomGraphQLError = (GraphQLOriginalError & { code: number })[];

export function mapApolloError(error: ApolloError): AppError {
  console.warn('[GraphQLError] Error:', JSON.stringify(error, null, 2));

  if (error.graphQLErrors || error.networkError) {
    return handleApolloError(error);
  }
  console.warn('[GraphQLError] Invalid error format.');
  return new AppError(ErrorType.Internal);
}

function handleApolloError({ graphQLErrors, networkError: apolloNetworkError, message }: ApolloError): AppError {
  const networkError = apolloNetworkError as NetworkError;

  if (isTimeoutError(message)) {
    return new AppError(ErrorType.Timeout);
  }

  if (isConnectionError(message)) {
    return new AppError(ErrorType.Connection);
  }

  if (networkError) {
    return handleNetworkError(networkError, message);
  }

  if (graphQLErrors.length > 0) {
    return handleGraphQLError(graphQLErrors as CustomGraphQLError);
  }

  return new AppError(ErrorType.Internal, message);
}

export function handleNetworkError(networkError: NetworkError, fallbackMessage: string): AppError {
  let message = '';
  let type: ErrorType = ErrorType.Internal;

  if (networkError.result?.errors?.length > 0) {
    const [error] = networkError.result.errors;
    message = error.message ?? fallbackMessage;
  } else if (networkError.response?.status === 401) {
    type = ErrorType.Authorization;
  } else {
    console.warn('[NetworkError] Unexpected network error.');
    const errorMessage = networkError.bodyText ?? fallbackMessage;
    message = errorMessage;
  }

  return new AppError(type, message);
}

function handleGraphQLError([graphQLError]: CustomGraphQLError): AppError {
  const type = graphQLErrorCodeTypeMap[graphQLError.code];
  return new AppError(type, graphQLError.message);
}

type ErrorCodeTypeMap = { default: ErrorType } & { [code: number]: ErrorType };

const graphQLErrorCodeTypeMap: ErrorCodeTypeMap = {
  401: ErrorType.Authorization,
  404: ErrorType.NotFound,
  default: ErrorType.Internal,
};

function isTimeoutError(message: string): boolean {
  const TIMEOUT_ERROR_MESSAGE = 'timeout';
  return message.includes(TIMEOUT_ERROR_MESSAGE);
}

function isConnectionError(message: string): boolean {
  const CONNECTION_ERROR_MESSAGE = 'Network request failed';
  return message.includes(CONNECTION_ERROR_MESSAGE);
}
