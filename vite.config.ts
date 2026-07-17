import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/ember-watt-card.ts',
      name: 'EmberWATTCard',
      fileName: () => 'ember-watt-card.js',
      formats: ['es']
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {}
      }
    }
  }
});
