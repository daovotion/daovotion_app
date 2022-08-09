import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// include postcss configuration
import postcssConfig from './postcss.config.mjs';
import path from "path";

export default defineConfig({
  plugins: [svelte()],
  build:{ // bundle names without hashing
    rollupOptions:{
      output:{
        assetFileNames:"assets/[name]_bundle[extname]",
        entryFileNames:"assets/[name]_bundle.js"
      }
    }
  },
  // include postcss configuration
  css:{ 
    postcss: postcssConfig
  },
  resolve:{
    alias:{
      "@src":path.resolve("./src"),
      "@lib":path.resolve("./src/lib"),
      "@routes":path.resolve("./src/routes"),      
      "@components":path.resolve("./src/components"),
      "@assets":path.resolve("./src/assets"),
      "@styles":path.resolve("./src/assets/styles"),
      "@icons":path.resolve("./src/assets/icons"),
      "@blog":path.resolve("./src/blog")
    }
  },
  server: {
    port: 3000
  },
  preview: {
    port: 5000
  }


})