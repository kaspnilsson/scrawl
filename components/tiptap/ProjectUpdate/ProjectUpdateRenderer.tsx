import { NodeViewWrapper, NodeViewContent, Editor } from '@tiptap/react'
import { Project } from '../../../interfaces/project'
import { routes } from '../../../lib/routes'
import ChooseOrCreateProject from '../../ChooseOrCreateProject'
import Link from '../../Link'
import ProjectUpdateOverflowMenu from '../../ProjectUpdateOverflowMenu'
import { ProjectUpdateAttrs } from './ProjectUpdateAttrs'

export interface ProjectUpdateRendererProps {
  editor: Editor
  node: {
    attrs: ProjectUpdateAttrs
  }
  updateAttributes: (attr: ProjectUpdateAttrs) => void
}

const ProjectUpdateWrapper = ({
  node,
  updateAttributes,
}: ProjectUpdateRendererProps) => {
  const { projectName, noteDate } = node.attrs

  const handleSelectProject = (p?: Project) => {
    const newName = p?.name || ''
    updateAttributes({ ...node.attrs, projectName: newName })
  }

  return (
    <NodeViewWrapper>
      <div className="px-4 py-2 my-2 rounded-xl sm:py-4 bg-base-200">
        <div
          className="flex flex-wrap items-center justify-between gap-1 not-prose"
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
          <div className="flex items-center gap-1">
            <div className="text-sm deemphasized">{noteDate}</div>
            <ProjectUpdateOverflowMenu attrs={node.attrs} />
          </div>
        </div>
        <NodeViewContent className="w-full"></NodeViewContent>
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
