import { Disclosure, Transition } from '@headlessui/react'
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
        <Disclosure.Button className="flex items-center justify-between w-full text-base text-left sm:text-lg">
          <div>{title}</div>
          <span className="flex items-center ml-6 h-7">
            <ChevronDownIcon
              className={classNames(
                open ? 'rotate-180' : 'rotate-0',
                'sm:w-6 sm:h-6 transition-all transform w-4 h-4'
              )}
              aria-hidden="true"
            />
          </span>
        </Disclosure.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Disclosure.Panel className="mt-2">{children}</Disclosure.Panel>
        </Transition>
      </>
    )}
  </Disclosure>
)

export default AccordionPanel
