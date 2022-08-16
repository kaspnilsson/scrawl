import { ReactNode } from 'react'
import Header from './Header'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen h-fit">
      <div className="max-w-6xl px-2 py-8 mx-auto overflow md:p-8 xl:p-16">
        {children}
      </div>
    </div>
  )
}

export default Layout
