import { useEffect, useState } from 'react'
import { useReactBricksContext } from 'react-bricks/frontend'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useReactBricksContext()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  return (
    <div
      className={`${
        isDarkColorMode ? 'dark' : 'light'
      } flex flex-col h-screen justify-between font-content antialiased`}
    >
      <main className="isolate mb-auto dark:bg-gray-900">{children}</main>
    </div>
  )
}

export default Layout
