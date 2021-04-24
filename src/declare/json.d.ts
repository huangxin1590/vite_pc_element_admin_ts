declare module '*.json' {
  interface Json {
    [props: string]: string;
  }
  const json: Json;
  export default json;
}
