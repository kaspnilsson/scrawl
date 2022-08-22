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
      <div className="grid grid-cols-1 gap-2 py-4 border-t border-b border-base-300">
        <div className="flex justify-between items-center not-prose">
          <ChooseOrCreateProject
            // contentEditable="false"
            selectedProjectName={projectName}
            onSelectProject={handleSelectProject}
          />
          <div>{noteDate}</div>
        </div>
        {/* {projectName && noteDate && ( */}
        <NodeViewContent className="w-full details-content"></NodeViewContent>
        {/* )} */}
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
