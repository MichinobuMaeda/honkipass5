import { nodeResolve } from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'release/bundle/main.js',
    },
  ],
  plugins: [
    nodeResolve(),
    scss(),
  ],
};
