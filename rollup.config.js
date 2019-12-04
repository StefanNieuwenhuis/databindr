import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
    { file: pkg.unpkg, format: 'iife', name: 'databindr' }
  ],
  external: [
    ...(Object.keys(pkg.dependencies) || {}),
    ...(Object.keys(pkg.peerDependencies) || {})
  ],
  plugins: [
    terser(),
    typescript({
      typescript: require('typescript'),
      declarationDir: './dist/types',
      outDir: './dist/types'
    })
  ]
};
