import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const buildType = [
  {
    format: 'umd',
    ext: '.js'
  },
  {
    format: 'umd',
    ext: '.min.js'
  },
  {
    format: 'es',
    ext: '.esm.js'
  }
];

function resolve(p) {
  return path.resolve(__dirname, './', p);
}

function PascalCase(str) {
  const re = /-(\w)/g;
  const newStr = str.replace(re, function (match, group1) {
    return group1.toUpperCase();
  });
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

const generateBanner = (packageName) => {
  let ret = `/*!
 * @ava/${packageName}
 * (c) 2020-${new Date().getFullYear()} AVA Frontend Team
 */`;
  return ret;
};

const name = 'entry';

export default {
  input: `src/${name}.ts`,
  output: buildType.map((type) => ({
    file: resolve(`dist/${name}${type.ext}`),
    name: PascalCase(name),
    format: type.format,
    banner: generateBanner(name)
  })),
  plugins: [
    terser(),
    nodeResolve({
      extensions,
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**' // only transpile our source code
    })
  ],
  external(id) {
    return /^core-js/.test(id);
  }
};
