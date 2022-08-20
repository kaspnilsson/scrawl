import { Node } from '@tiptap/core'

export default Node.create({
  name: 'projectUpdateContent',
  content: 'block*',
  selectable: false,

  parseHTML() {
    return [
      {
        tag: '*',
        consuming: false,
        context: 'projectUpdate/',
        priority: 100,
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes, 0]
  },

  addKeyboardShortcuts() {
    return {
      //   Enter: () => this.editor.commands.splitListItem('projectUpdateContent'),
      //   'Shift-Tab': () => this.editor.commands.liftListItem('projectUpdateContent'),
    }
  },
})
