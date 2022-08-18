import { CalendarIcon } from '@heroicons/react/solid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  onDateSelect: (d: Date) => void
  selectedDate: Date
}

const Datepicker = ({ onDateSelect, selectedDate }: Props) => {
  return (
    <>
      {/* Overrides for silly datepicker styles */}
      <style>
        {`
.react-datepicker-wrapper {
  width: auto;
}

.react-datepicker__input-container {
  align-items: center;
  display: flex;
}
`}
      </style>
      <DatePicker
        selected={selectedDate}
        onChange={onDateSelect}
        customInput={
          <button className="btn btn-ghost btn-sm btn-square">
            <CalendarIcon className="w-5 h-5" />
          </button>
        }
      />
    </>
  )
}

export default Datepicker
