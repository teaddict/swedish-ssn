import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/swedish-ssn.js',
    output: [
      {
        file: 'dist/swedish-ssn.js',
        format: 'umd',
        name: 'SwedishSSN',
        sourcemap: true
      },
      {
        file: 'dist/swedish-ssn.min.js',
        format: 'umd',
        name: 'SwedishSSN',
        plugins: [terser()],
        sourcemap: true
      },
      {
        file: 'dist/swedish-ssn.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  }
]; 