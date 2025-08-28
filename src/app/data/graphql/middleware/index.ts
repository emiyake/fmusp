import type { ApolloLink } from '@apollo/client';
import { analyticsErrorMiddleware } from './analytics-error.middleware';

export const graphqlMiddlewares: ApolloLink[] = [analyticsErrorMiddleware];
