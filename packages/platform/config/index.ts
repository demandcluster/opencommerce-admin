import {cleanEnv, str, bool} from "envalid";

// @ts-ignore
export default cleanEnv(import.meta.env, {
  VITE_PUBLIC_GRAPHQL_API_URL_HTTP: str({
    desc: "A URL that is accessible from browsers and accepts GraphQL POST requests over HTTP",
    example: "http://localhost:3000/graphql"
  }),
  VITE_PUBLIC_GRAPHQL_API_URL_WS: str({
    default: "",
    desc: "A URL that is accessible from browsers and accepts GraphQL WebSocket connections",
    example: "ws://localhost:3000/graphql"
  }),
  VITE_PUBLIC_I18N_BASE_URL: str({
    desc: "A URL that has /locales/namespaces.json and /locales/resources.json endpoints for loading translations",
    example: "http://localhost:3000"
  }),
  VITE_PUBLIC_FILES_BASE_URL: str({
    default: "https://api.demandcluster.com",
    desc: "A URL that has /assets/files and /assets/uploads endpoints for uploading and downloading files",
    example: "http://localhost:3000"
  }),
  VITE_PUBLIC_REST_API_URL: str({
    desc: "A URL for REST API endpoints",
    example: "http://localhost:3000"
  }),
  VITE_ROOT_URL: str({
    desc: "The canonical root URL for the Reaction Admin server",
    example: "http://localhost:4080"
  }),
  VITE_MARKETPLACE_MODE: bool({
    default: true,
    desc: "Is admin running in marketplace mode"
  }),
});
