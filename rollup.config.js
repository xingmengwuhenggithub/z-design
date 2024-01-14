const path = require('path')
const merge = require('deepmerge')
const { defineConfig } = require('rollup')
const nodeResolve = require('@rollup/plugin-node-resolve').default
const babel = require('@rollup/plugin-babel').default
const replace = require('@rollup/plugin-replace')
const commonjs = require('@rollup/plugin-commonjs')
const esbuild = require('rollup-plugin-esbuild').default
const terser = require('@rollup/plugin-terser')

const extensions = ['.mjs', '.js', '.json', '.ts']

const baseConfig = defineConfig({
  input: path.resolve('./src/index.ts'),
  plugins: [
    nodeResolve({ extensions }),
    esbuild({
      tsconfig: path.resolve(__dirname, 'tsconfig.esbuild.json'),
      target: 'esnext',
      sourceMap: true
    }),
    babel({
      extensions,
      babelHelpers: 'bundled'
    }),
    commonjs()
  ],
  external: ['vue'],
  output: {
    name: 'zeng',
    format: 'umd',
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  }
})

const esmConfig = defineConfig({
  input: path.resolve('./src/index.ts'),
  plugins: [
    nodeResolve({ extensions }),
    esbuild({
      tsconfig: path.resolve(__dirname, 'tsconfig.esbuild.json'),
      target: 'esnext',
      sourceMap: true
    }),
    babel({
      extensions,
      babelHelpers: 'bundled'
    }),
    replace({
      values: {
        __DEV__: JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      preventAssignment: true
    }),
    commonjs()
  ],
  external: ['vue'],
  output: {
    // file: path.resolve('dist/es/index.js'),
    dir: path.dirname('dist/es/bundle.js'),
    format: 'es',
    exports: 'named', // 指定导出模式（自动、默认、命名、无）
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
    globals: {
      vue: 'Vue'
    }
  }
})

const prodConfig = defineConfig({
  plugins: [
    replace({
      values: {
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      preventAssignment: true
    }),
    terser()
  ],
  output: {
    file: path.resolve('dist/index.js')
  }
})

module.exports = [merge(baseConfig, prodConfig),esmConfig]
