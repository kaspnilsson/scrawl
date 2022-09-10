import { useEffect, useRef, useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Combobox, Transition } from '@headlessui/react'
import classNames from 'classnames'

interface Props<T> {
  value?: T
  onChange: (value: T) => void
  options: T[]
  renderOption: (t: T) => string
  placeholder?: string
  label?: string
  autoFocus?: boolean
  loading?: boolean
}

const ComboboxComponent = <T extends object>({
  value,
  onChange,
  options,
  renderOption,
  label = '',
  placeholder = '',
  autoFocus = false,
  loading = false,
}: Props<T>) => {
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return renderOption(option)
            .toLowerCase()
            .includes(query.toLowerCase())
        })

  useEffect(() => {
    if (autoFocus && ref?.current) ref.current.focus()
  }, [autoFocus])

  return (
    <Combobox as="div" value={value} onChange={onChange}>
      {label && (
        <Combobox.Label className="block text-sm font-semibold">
          {label}
        </Combobox.Label>
      )}
      <div className="relative mt-1">
        <Combobox.Input
          ref={ref}
          className="w-full input-bordered border-neutral sm:!text-sm input input-sm sm:input-md"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => renderOption(option as T)}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
          <ChevronDownIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Combobox.Options
            className="absolute z-20 max-w-xs py-1 mt-1 overflow-auto text-xs rounded-md shadow-lg max-h-60 sm:text-sm bg-base-300 w-fit"
            static
          >
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={renderOption(option)}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9 font-semibold',
                    active ? 'bg-neutral' : ''
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected && 'font-semibold'
                      )}
                    >
                      {renderOption(option)}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'flex absolute inset-y-0 right-0 items-center pr-4',
                          active ? '' : ''
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
            {loading && (
              <Combobox.Option
                value={null}
                className="relative min-h-0 py-2 pl-3 cursor-default select-none pr-9 opacity-60 btn loading h-fit btn-ghost"
                disabled
              >
                Loading
              </Combobox.Option>
            )}
            {!loading && !filteredOptions && (
              <Combobox.Option
                value={null}
                className="relative py-2 pl-3 cursor-default select-none pr-9 opacity-60"
                disabled
              >
                None
              </Combobox.Option>
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default ComboboxComponent
