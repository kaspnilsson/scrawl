import NextLink from 'next/link'
import { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  className?: string
}

const Link = ({ children, href, className = 'link link-hover' }: Props) => (
  <NextLink href={href} passHref>
    <a className={className}>{children}</a>
  </NextLink>
)

export default Link
