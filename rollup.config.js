import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    sass({ insert: true }),
    typescript(),
    svgr(),
    url(),
  ],
  external: ['react', 'react-dom']
}