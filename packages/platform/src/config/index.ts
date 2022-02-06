import {cleanEnv, str} from "envalid";

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
  VITE_ROOT_URL: str({
    desc: "The canonical root URL for the Reaction Admin server",
    example: "http://localhost:4080"
  })
});
