import { mergeAttributes, Command, Attribute, Node } from '@tiptap/core'

import { ReactNodeViewRenderer } from '@tiptap/react'
import { ProjectUpdateAttrs } from './ProjectUpdateAttrs'
import ProjectUpdateRenderer from './ProjectUpdateRenderer'

declare module '@tiptap/core' {
  interface Commands {
    projectUpdate: {
      addProjectUpdate: (attrs?: ProjectUpdateAttrs) => Command
    }
  }
}

type ExtensionAttrs = { [key in keyof ProjectUpdateAttrs]: Partial<Attribute> }

export const ProjectUpdate = Node.create({
  name: 'projectUpdate',
  content: 'block*',
  group: 'block',
  defining: true,
  isolating: true,

  addOptions() {
    return {
      inline: false,
    }
  },

  addAttributes() {
    return {
      projectName: { default: '' },
      noteDate: { default: '' },
      id: { default: '' },
    } as ExtensionAttrs
  },

  renderHTML({ HTMLAttributes }) {
    return ['project-update', mergeAttributes(HTMLAttributes)]
  },

  parseHTML() {
    return [
      {
        tag: 'project-update',
      },
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ProjectUpdateRenderer)
  },

  addCommands() {
    return {
      addProjectUpdate:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: 'projectUpdate',
              attrs,
              content: [
                {
                  type: 'paragraph',
                },
              ],
            },
            { type: 'paragraph' },
          ]),
    }
  },
})
