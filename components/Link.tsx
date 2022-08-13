import NextLink from 'next/link'
import { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
}

const Link = ({ children, href }: Props) => (
  <NextLink href={href} passHref>
    <a>{children}</a>
  </NextLink>
)

export default Link
