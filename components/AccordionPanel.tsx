import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { ReactNode } from 'react'

interface Props {
  title: string | ReactNode
  children?: ReactNode
  className?: string
  defaultOpen?: boolean
}

const AccordionPanel = ({
  title,
  children,
  className = '',
  defaultOpen = false,
}: Props) => (
  <Disclosure
    as="div"
    className={classNames('pt-6', className)}
    defaultOpen={defaultOpen}
  >
    {({ open }) => (
      <>
        <Disclosure.Button className="flex items-center justify-between w-full text-lg text-left">
          <div>{title}</div>
          <span className="flex items-center ml-6 h-7">
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180' : 'rotate-0',
                'h-6 w-6 transform transition-all'
              )}
              aria-hidden="true"
            />
          </span>
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
      </>
    )}
  </Disclosure>
)

export default AccordionPanel
