import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: () => void
  style?: 'primary' | 'secondary' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const Button = ({
  onClick,
  children,
  style = 'outline',
  size = 'md',
  className = '',
}: Props) => (
  <button
    onClick={onClick}
    className={classNames(
      `inline-flex items-center justify-center font-medium not-prose ${className}`,
      {
        'border border-accent-300 text-accent-700 bg-onDark hover:bg-accent-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500':
          style === 'outline',
        'border border-transparent text-onDark bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500':
          style === 'primary',
        'border border-transparent text-accent-700 bg-accent-100 hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500':
          style === 'secondary',
        'px-2.5 py-1.5 text-xs rounded': size === 'xs',
        'px-3 py-2 text-sm rounded-md': size === 'sm',
        'px-4 py-2 text-sm rounded-md': size === 'md',
        'px-4 py-2 text-base rounded-md': size === 'lg',
        'px-6 py-3 text-base rounded-md': size === 'xl',
      }
    )}
  >
    {children}
  </button>
)

export default Button
