import { ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  isOpen: boolean
  close: () => void
  title?: string
  children: ReactNode
}

export default function Modal({ isOpen, close, title, children }: Props) {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="hidden" />
      <label
        htmlFor="my-modal-4"
        className={classNames(
          'cursor-pointer modal modal-bottom sm:modal-middle',
          { 'modal-open': isOpen }
        )}
        onClick={close}
      >
        <label
          className="relative modal-box"
          htmlFor=""
          onClick={(e) => e.stopPropagation()}
        >
          {title && <h3 className="text-lg font-heading">{title}</h3>}
          {children}
        </label>
      </label>
    </>
  )
}
