/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_FIREBASE_KEY: string;
    readonly REACT_APP_WEATHER_KEY: string;
  }
}
