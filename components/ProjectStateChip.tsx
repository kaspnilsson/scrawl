import classNames from 'classnames'
import { ProjectState, STATE_DISPLAY_STRINGS } from '../interfaces/project'

interface Props {
  state: ProjectState
  onChange?: (newState: ProjectState) => void
}

const ProjectStateChip = ({ state }: Props) => {
  return (
    <div
      className={classNames('badge badge-sm sm:badge-md ', {
        'badge-accent': state === ProjectState.OPEN,
      })}
    >
      {STATE_DISPLAY_STRINGS[state] || ''}
    </div>
  )
}

export default ProjectStateChip
