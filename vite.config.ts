import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Unocss from 'unocss/vite';
import { presetAttributify, presetUno, transformerVariantGroup } from 'unocss';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export const breakpoints = {
  sm: '640px',
  // => @media (min-width: 640px) { ... }

  md: '768px',
  // => @media (min-width: 768px) { ... }

  lg: '1024px',
  // => @media (min-width: 1024px) { ... }

  xl: '1280px',
  // => @media (min-width: 1280px) { ... }

  '2xl': '1536px',
  // => @media (min-width: 1536px) { ... }
};

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      presets: [presetAttributify(), presetUno()],
      shortcuts: {
        'flex-center': 'flex items-center justify-center',
        'flex-vcenter': 'flex items-center',
        'transition-default': 'transition-all ease-in-out duration-400',
      },
      transformers: [transformerVariantGroup()],
      theme: {
        colors: {
          primary: {
            50: '#f0f4fe',
            100: '#d4def8',
            200: '#95aeed',
            300: '#758ce0',
            400: '#6175de',
            500: '#495dc6',
            600: '#3547a4',
            700: '#253586',
            800: '#1f2c6d',
            900: '#162050',
          },
        },
        shortcuts: {
          'transition-default': 'transition-all ease-in-out duration-200',
          'flex-center': 'flex items-center justify-center',
          'flex-vcenter': 'flex items-center',
        },
        fontSize: {
          '3xs': '0.5rem', // 8px
          '2xs': '0.625rem', // 10px
          '2xl': '1.375rem', // 22px
          '3xl': '1.625rem', // 26px
          '4xl': '1.875rem', // 26px
        },
        maxWidth: {
          base: '1280px',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          display: ['Ubuntu', 'sans-serif'],
        },
        boxShadow: {
          xs: '0px 1px 2px 0px #5C5C5C0D',
          sm: '0px 1px 3px #5C5C5C1A, 0px 1px 2px -1px #5C5C5C1A',
          md: '0px 4px 6px -1px #5C5C5C1A, 0px 2px 4px -2px #5C5C5C1A',
          lg: '0px 10px 15px -3px #5C5C5C1A, 0px 4px 6px -4px #5C5C5C1A',
          xl: '0px 20px 25px -5px #5C5C5C1A, 0px 8px 10px -6px #5C5C5C1A',
        },
      },
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: ['vue', 'vue-router', '@vueuse/core'],

      // Auto import for all module exports under directories
      dirs: [
        // './hooks',
        // './composables'
        // ...
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: './auto-imports.d.ts',

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15
      vueTemplate: false,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [
        /* ... */
      ],
    }),
    Components({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
