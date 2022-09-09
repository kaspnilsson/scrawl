import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'

export interface ComboboxOption<T> {
  value: T
}

interface Props<T> {
  value: T
  onChange: (value: T) => void
  options: T[]
  renderOption: (t: T) => string
}

const ComboboxComponent = <T extends object>({
  value,
  onChange,
  options,
  renderOption,
}: Props<T>) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return renderOption(option)
            .toLowerCase()
            .includes(query.toLowerCase())
        })

  return (
    <Combobox as="div" value={value} onChange={onChange}>
      <Combobox.Label className="block text-sm font-semibold text-gray-700">
        Assigned to
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="py-2 pr-10 pl-3 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => renderOption(option as T)}
        />
        <Combobox.Button className="flex absolute inset-y-0 right-0 items-center px-2 rounded-r-md focus:outline-none">
          <ChevronDownIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredOptions.length > 0 && (
          <Combobox.Options className="overflow-auto absolute z-10 py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md ring-1 ring-black ring-opacity-5 shadow-lg focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={renderOption(option)}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-accent text-white' : 'text-gray-900'
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
                          active ? 'text-white' : 'text-accent'
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}

export default ComboboxComponent
