import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from "path";
import { splitVendorChunkPlugin } from 'vite'
import eslint from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [solidPlugin({ssr : true}),splitVendorChunkPlugin() ], //,eslint()
  server: {
    port: 8082,
  },
  build: {
    polyfillModulePreload : true,
    target: 'es2015', 
    ssrManifest : true,
    // rollupOptions: {
    //   input: {
    //     polyfills :  path.resolve(__dirname, 'src/polyfils.js'),
    //   }}
  },
  ssr :{
    noExternal: ['@solidjs/router'],
  }
});
