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
      <div className="px-4 py-2 sm:py-4 rounded-xl bg-base-200">
        <div className="flex flex-wrap items-center justify-between gap-1 not-prose">
          <ChooseOrCreateProject
            selectedProjectName={projectName}
            onSelectProject={handleSelectProject}
          />
          <div className="text-sm deemphasized">{noteDate}</div>
        </div>
        {/* {projectName && noteDate && ( */}
        <NodeViewContent className="w-full details-content"></NodeViewContent>
        {/* )} */}
      </div>
    </NodeViewWrapper>
  )
}

export default ProjectUpdateWrapper
