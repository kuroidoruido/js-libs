import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  format: 'esm',
  clean: true,
  dts: true,
  bundle: true,
  noExternal: [/^@anthonypena\/.*/],
});
