import { useState } from 'react'

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useLoaderData,
} from '@remix-run/react'
import type { MetaFunction } from '@remix-run/node'
import { ReactBricks } from 'react-bricks/frontend'
import config from './react-bricks/config'

import styles from './tailwind.css'
import ErrorMessage from './components/ErrorMessage'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
  return { title: 'Remix Blog Starter with React Bricks' }
}

export const loader = () => {
  //   API_KEY=d515ac3f-7697-4713-b9b3-87d727d85723
  // APP_ID=103f3706-1eb9-490c-900a-86af0b704f78

  const apiKey = 'd515ac3f-7697-4713-b9b3-87d727d85723'
  const appId = '103f3706-1eb9-490c-900a-86af0b704f78'

  if (!apiKey || !appId) {
    throw new Error('Missing React Bricks credentials in .env file')
  }

  return { appId, apiKey }
}

export default function App() {
  const navigate = useNavigate()
  const { appId, apiKey } = useLoaderData()

  const savedColorMode = typeof window === 'undefined' ? '' : localStorage.getItem('color-mode')
  const [colorMode, setColorMode] = useState(savedColorMode || 'light')

  const toggleColorMode = () => {
    const newColorMode = colorMode === 'light' ? 'dark' : 'light'
    setColorMode(newColorMode)
    localStorage.setItem('color-mode', newColorMode)
  }

  const reactBricksConfig = {
    ...config,
    appId,
    apiKey,
    navigate: (path: string) => navigate(path),
    isDarkColorMode: colorMode === 'dark',
    toggleColorMode,
    contentClassName: `antialiased font-content ${colorMode} ${
      colorMode === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`,
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body id="root">
        <ReactBricks {...reactBricksConfig}>
          <Outlet />
        </ReactBricks>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  )
}
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorMessage error={error} />
        <Scripts />
      </body>
    </html>
  )
}
