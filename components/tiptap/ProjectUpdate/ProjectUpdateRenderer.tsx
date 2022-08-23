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
      <div className="grid grid-cols-1 gap-2 py-4 border-t border-b border-normal">
        <div className="flex items-center justify-between not-prose">
          <ChooseOrCreateProject
            // contentEditable="false"
            selectedProjectName={projectName}
            onSelectProject={handleSelectProject}
          />
          <div className="deemphasized">{noteDate}</div>
        </div>
        {/* {projectName && noteDate && ( */}
        <NodeViewContent className="w-full details-content"></NodeViewContent>
        {/* )} */}
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
