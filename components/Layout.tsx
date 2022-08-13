import { ReactNode } from 'react'
import Header from './Header'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen h-fit">
      <Header></Header>
      <div className="overflow">{children}</div>
    </div>
  )
}

export default Layout
