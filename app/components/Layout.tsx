import { useReactBricksContext } from "react-bricks"

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkColorMode } = useReactBricksContext()
  return (
    <div
      className={`${
        isDarkColorMode ? "dark" : "light"
      } flex flex-col h-screen justify-between font-content antialiased`}
    >
      <main className='isolate mb-auto'>{children}</main>
    </div>
  )
}

export default Layout
