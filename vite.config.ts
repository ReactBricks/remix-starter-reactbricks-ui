import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import commonjs from 'vite-plugin-commonjs'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    commonjs(),
  ],
  ssr: {
    noExternal: [
      'react-bricks',
      'react-bricks/frontend',
      'react-dropzone',
      'pigeon-maps',
      'pigeon-maps/providers',

      'prismjs/components/prism-typescript',
      'prismjs/components/prism-bash',
      'prismjs/components/prism-jsx',
      'prismjs/components/prism-tsx',
      'prismjs/plugins/line-numbers/prism-line-numbers.js',
      'prismjs/plugins/show-language/prism-show-language.js',
      'prismjs/plugins/line-highlight/prism-line-highlight.js',

      'react-icons/fi',
      'react-icons/bs',
      'react-icons/io5',
      'react-icons/ri',
      'react-icons/vsc',
      'react-icons/fa',
      'react-icons/md',
      'react-icons/hi2',
      'react-icons/ai',
      'react-icons/fc',
      'date-fns/format',
      'date-fns/isAfter',
      'date-fns/isBefore',
      'date-fns/compareAsc',
      'date-fns/getDay',
      'date-fns/locale/en-GB',
      'date-fns/parse',
      'date-fns/startOfWeek',
      'date-fns/parseISO',
    ],
  },
  css: {
    preprocessorOptions: {
      postcss: true,
    },
  },
  define: {
    'process.env': {
      ...process.env,
    },
  },
})
