declare namespace NodeJS {
  export interface ProcessEnv {
    readonly APP_NAME: string;
    readonly API_URL: string;
    readonly API_TOKEN: string;
  }
}