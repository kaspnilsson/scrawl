import { NodeViewWrapper, NodeViewContent, Editor } from '@tiptap/react'
import { Project } from '../../../interfaces/project'
import ChooseOrCreateProject from '../../ChooseOrCreateProject'
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
      <div className="grid grid-cols-1 gap-2 py-4 border-t border-b">
        <div
          className="flex items-center justify-between not-prose"
          contentEditable="false"
        >
          <ChooseOrCreateProject
            selectedProjectName={projectName}
            onSelectProject={handleSelectProject}
          />
          <div>{noteDate}</div>
        </div>
        {projectName && noteDate && (
          <NodeViewContent
            className="w-full details-content min-h-6 focus:outline-none"
            contentEditable="true"
          ></NodeViewContent>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
