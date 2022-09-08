import { Attribute, mergeAttributes, Node } from '@tiptap/core'

export const TASK_LIST_TYPE = 'taskList'

export interface TaskListOptions {
  itemTypeName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    taskList: {
      /**
       * Toggle a task list
       */
      toggleTaskList: () => ReturnType
    }
  }
}

interface TaskListAttrs {
  projectName?: string
  noteDate: string
  id: string
}

type ExtensionAttrs = { [key in keyof TaskListAttrs]: Partial<Attribute> }

export const TaskList = Node.create<TaskListOptions>({
  name: TASK_LIST_TYPE,

  addOptions() {
    return {
      itemTypeName: 'taskItem',
      HTMLAttributes: {},
    }
  },

  group: 'block list',

  content() {
    return `${this.options.itemTypeName}+`
  },

  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ]
  },

  addAttributes() {
    return {
      projectName: { default: '' },
      noteDate: { default: '' },
      id: { default: '' },
    } as ExtensionAttrs
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      toggleTaskList:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName)
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-9': () => this.editor.commands.toggleTaskList(),
    }
  },
})
