import { mergeAttributes, Attribute, Node } from '@tiptap/core'

import { ReactNodeViewRenderer } from '@tiptap/react'
import { ProjectUpdateAttrs } from './ProjectUpdateAttrs'
import ProjectUpdateRenderer from './ProjectUpdateRenderer'

export const PROJECT_UPDATE_TYPE = 'projectUpdate'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    [PROJECT_UPDATE_TYPE]: {
      addProjectUpdate: (attrs?: ProjectUpdateAttrs) => ReturnType
    }
  }
}

type ExtensionAttrs = { [key in keyof ProjectUpdateAttrs]: Partial<Attribute> }

export const ProjectUpdate = Node.create({
  name: PROJECT_UPDATE_TYPE,
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

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-p': () => this.editor.commands.addProjectUpdate(),
    }
  },

  addCommands() {
    return {
      addProjectUpdate:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent([
            {
              type: PROJECT_UPDATE_TYPE,
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
