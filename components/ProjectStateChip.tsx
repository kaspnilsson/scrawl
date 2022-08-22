import classNames from 'classnames'
import { ProjectState } from '../interfaces/project'

interface Props {
  state: ProjectState
  onChange?: (newState: ProjectState) => void
}

const ProjectStateChip = ({ state }: Props) => {
  return (
    <div
      className={classNames('badge badge-sm sm:badge-md ', {
        'badge-accent': state === ProjectState.IN_PROGRESS,
      })}
    >
      {state}
    </div>
  )
}

export default ProjectStateChip
