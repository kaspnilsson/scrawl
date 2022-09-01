import classNames from 'classnames'
import { ProjectState } from '../interfaces/project'

interface Props {
  state: ProjectState
  onChange?: (newState: ProjectState) => void
}

const ProjectStateChip = ({ state, onChange }: Props) => {
  return (
    <div
      className={classNames('badge badge-sm', {
        'badge-accent': state === ProjectState.IN_PROGRESS,
        'badge-warning': state === ProjectState.BACKLOG,
        'badge-info': state === ProjectState.ARCHIVED,
        'badge-success': state === ProjectState.COMPLETED,
      })}
    >
      {state}
      {onChange && <button></button>}
    </div>
  )
}

export default ProjectStateChip
