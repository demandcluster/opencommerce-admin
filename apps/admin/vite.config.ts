import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import usePluginImport from "vite-plugin-importer";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    https: true,
    port: 443
  },
   plugins: [
    usePluginImport(
    {
      "libraryName": "subscriptions-transport-ws-rollup",
      "libraryDirectory": "",
      "camel2DashComponentName": false,  // default: true
    }
    ),
    // usePluginImport(
    //   {
    //     "libraryName": "@apollo/client/ApolloProvider",
    //     "libraryDirectory": "",
    //     "camel2DashComponentName": false,  // default: true
    //   }
    //   ),
    //   usePluginImport(
    //     {
    //       "libraryName": "@apollo/client/InMemoryCache",
    //       "libraryDirectory": "",
    //       "camel2DashComponentName": false,  // default: true
    //     }
    //     ),
    //     usePluginImport(
    //       {
    //         "libraryName": "@apollo/client/ApolloLink",
    //         "libraryDirectory": "",
    //         "camel2DashComponentName": false,  // default: true
    //       }
    //       ),
    //     usePluginImport(
    //       {
    //         "libraryName": "@apollo/client/ApolloClient",
    //         "libraryDirectory": "",
    //         "camel2DashComponentName": false,  // default: true
    //       }
    //       ),
//    createImportPlugin(
//      [
//        {
//          libraryName: '@mui/material',
//          libraryDirectory: '',
//          camel2DashComponentName: false,
//        }
//      ]
//    ),
//    createImportPlugin([
//      {
//        libraryName: '@mui/icons-material',
//        libraryDirectory: '',
//        camel2DashComponentName: false,
//      }
//    ]),
    react()
  ]
})
