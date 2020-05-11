import babel from 'rollup-plugin-babel';

export default {
  input: 'index.js',
  output: {
    file: './lib/index.js',
    format: 'cjs',
    name: 'bundle',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['react-app'],
      runtimeHelpers: true
    }),
  ],
};
