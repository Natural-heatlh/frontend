/// <reference types="react-scripts" />
declare module '*.graphql' {
  const items: { readonly [key: string]: any };
  export default items;
}
