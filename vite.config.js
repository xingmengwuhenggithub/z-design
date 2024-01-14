const path = require('path')
const { babel } = require('@rollup/plugin-babel')
import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// const createDemoPlugin = require('./build/vite-plugin-demo')
// const dns = require('dns')

// dns.setDefaultResultOrder('verbatim')

/**
 * @type {import('vite').UserConfig}
 */
module.exports = {
  root: __dirname,
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${resolve("src/assets/less/index.less")}";`,
          hack: `true;`,
        },
        javascriptEnabled: true,
      },
    },
  },
  // plugins: createDemoPlugin(),
  resolve: {
    // In production site build, we want to import naive-ui from node_modules
    alias:
      process.env.NODE_ENV !== 'production'
        ? [
            {
              find: 'naive-ui',
              replacement: path.resolve(__dirname, './src')
            }
          ]
        : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'process.env.TUSIMPLE': !!process.env.TUSIMPLE,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [],
    exclude: ['__INDEX__']
  },
  build: {
    outDir: 'site',
    output: {
      manualChunks: {
        'grapheme-splitter': ['grapheme-splitter'],
        katex: ['katex']
      }
    },
    rollupOptions: {
      plugins: [
        babel({
          babelHelpers: 'bundled'
        })
      ]
    }
  },
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
