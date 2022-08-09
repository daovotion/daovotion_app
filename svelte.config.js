import sveltePreprocess from 'svelte-preprocess';
// include markdown preprocessor
import { mdsvex } from 'mdsvex';
// Including Tailwind PostCSS preprocessor
import postcssConfig from './postcss.config.mjs'

export default {
  extensions: ['.md', '.svelte'], // markdown files
  preprocess: [
    mdsvex({ extension: 'md' }), // markdown preprocessor
    sveltePreprocess({postcss: postcssConfig}) // with PostCSS
  ]
}