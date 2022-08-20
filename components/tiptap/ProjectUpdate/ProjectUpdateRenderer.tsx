import { Editor, NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import { ProjectUpdateAttrs } from './ProjectUpdateAttrs'
import ProjectUpdateEditorComponent from './ProjectUpdateEditorComponent'
import ProjectUpdateComponent from './MutlipleChoiceComponent'

export interface ProjectUpdateRendererProps {
  editor: Editor
  node: {
    attrs: ProjectUpdateAttrs
  }
  updateAttributes: (attr: ProjectUpdateAttrs) => void
}

const ProjectUpdateRenderer = ({
  editor,
  node,
  updateAttributes,
}: ProjectUpdateRendererProps) => (
  <NodeViewWrapper>
    <NodeViewContent>
      <div className="mx-auto">
        <div
          className="p-4 m-8 border shadow-lg rounded-xl multiple-choice"
          data-drag-handle=""
        >
          {editor.isEditable && (
            <ProjectUpdateEditorComponent
              {...node.attrs}
              onUpdate={(attrs) => {
                updateAttributes(attrs)
              }}
            />
          )}
          {!editor.isEditable && <ProjectUpdateComponent {...node.attrs} />}
        </div>
      </div>
    </NodeViewContent>
  </NodeViewWrapper>
)

export default ProjectUpdateRenderer
