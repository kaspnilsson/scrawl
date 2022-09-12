import { TrashIcon } from '@heroicons/react/solid'
import { NodeViewWrapper, NodeViewContent, Editor } from '@tiptap/react'
import { Project } from '../../../interfaces/project'
import { routes } from '../../../lib/routes'
import ChooseOrCreateProject from '../../ChooseOrCreateProject'
import Link from '../../Link'
import { ProjectUpdateAttrs } from './ProjectUpdateAttrs'

export interface ProjectUpdateRendererProps {
  editor: Editor
  node: {
    attrs: ProjectUpdateAttrs
  }
  deleteNode: () => void
  updateAttributes: (attr: ProjectUpdateAttrs) => void
}

const ProjectUpdateWrapper = ({
  node,
  updateAttributes,
  deleteNode,
}: ProjectUpdateRendererProps) => {
  const { projectName, noteDate } = node.attrs

  const handleSelectProject = (p?: Project) => {
    const newName = p?.name || ''
    updateAttributes({ ...node.attrs, projectName: newName })
  }

  const handleDelete = () => {
    deleteNode()
  }

  return (
    <NodeViewWrapper>
      <div className="px-4 py-2 my-2 rounded-xl sm:py-4 bg-base-200">
        <div
          className="flex flex-wrap gap-1 justify-between items-center not-prose"
          spellCheck={false}
        >
          {!projectName && (
            <ChooseOrCreateProject onSelectProject={handleSelectProject} />
          )}
          {projectName && (
            <Link href={routes.project(projectName)}>
              <h3 className="font-heading line-clamp-1">{projectName}</h3>
            </Link>
          )}
          <div className="flex gap-1 items-center">
            <div className="text-sm deemphasized">{noteDate}</div>
            <button
              className="btn btn-ghost btn-square btn-xs deemphasized"
              onClick={handleDelete}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <NodeViewContent className="w-full"></NodeViewContent>
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
