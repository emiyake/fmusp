import {
  ApolloClient,
  type ApolloLink,
  InMemoryCache,
  type NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import fetch from 'cross-fetch';

export class ApolloClientBuilder {
  static build(url: string, middlewares: ApolloLink[] = []): ApolloClient<NormalizedCacheObject> {
    const httpLink = createHttpLink({ uri: url });

    const client = new ApolloClient({
      link: from([...middlewares, httpLink]),
      cache: new InMemoryCache(),
    });

    return client;
  }

  static buildSsr(url: string, middlewares: ApolloLink[] = []): ApolloClient<NormalizedCacheObject> {
    const httpLink = createHttpLink({
      uri: url,
      fetch,
    });

    const client = new ApolloClient({
      ssrMode: true,
      link: from([...middlewares, httpLink]),
      cache: new InMemoryCache(),
    });

    return client;
  }
}
