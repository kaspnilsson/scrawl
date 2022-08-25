/**
 * Overflow menu allowing things like deleting, visiting project directly, visiting note day directly, etc.
 */

import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ProjectUpdate } from '../interfaces/projectUpdate'
import { ProjectUpdateAttrs } from './tiptap/ProjectUpdate/ProjectUpdateAttrs'

interface Props {
  update?: ProjectUpdate
  attrs?: ProjectUpdateAttrs
}

interface Action {
  text: string
  onClick: () => void
}

const ProjectUpdateOverflowMenu = ({ update, attrs }: Props) => {
  if (!update && !attrs) return null

  const actions: Action[] = []

  if (!update) {
    // attrs defined.f
  } else {
    // update defined.
  }

  if (!actions.length) return null

  return (
    <div className="flex dropdown dropdown-hover">
      <button className="btn btn-ghost btn-square btn-xs">
        <DotsVerticalIcon className="w-4 h-4" />
      </button>
      <ul
        tabIndex={0}
        className="overflow-auto p-2 w-64 max-h-96 shadow dropdown-content menu bg-base-100 rounded-box menu-compact min-w-fit"
      >
        {actions.map((a, index) => (
          <li key={index}>
            <button className="text-left" onClick={a.onClick}>
              {a.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectUpdateOverflowMenu
