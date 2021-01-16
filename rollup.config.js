import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

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

function PascalCase(str) {
  const re = /-(\w)/g;
  const newStr = str.replace(re, function (match, group1) {
    return group1.toUpperCase();
  });
  return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}

export default {
  input: 'src/entry.ts', // These are set in the exec() call
  output: {
    file: 'dist/output.js', // These are set in the exec() call
    format: 'es',
    strict: false
  },
  plugins: [
    resolve({
      extensions,
      browser: true
    }),
    commonjs({
      sourceMap: false
    }),
    babel({
      extensions,
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
