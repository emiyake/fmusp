// // Place here global interface and variable that should be available globally

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.graphql' {
  import type { DocumentNode } from 'graphql';
  const value: DocumentNode;
  export default value;
}
