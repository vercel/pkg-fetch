declare module 'expand-template' {
  function expandTemplate(): (
    template: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    variables: object
  ) => string;

  export default expandTemplate;
}
