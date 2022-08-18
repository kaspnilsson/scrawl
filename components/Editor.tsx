import { useEditor, EditorContent, Content } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

interface Props {
  content?: Content
  onUpdate: (content: Content) => void
  className?: string
  onFocus?:
    | ((props: {
        editor: Editor
        event: FocusEvent
        transaction: Transaction
      }) => void)
    | undefined
  onBlur?:
    | ((props: {
        editor: Editor
        event: FocusEvent
        transaction: Transaction
      }) => void)
    | undefined
}

const EditorComponent = ({
  content,
  onUpdate,
  onFocus = () => null,
  onBlur = () => null,
  className = '',
}: Props) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder:
            'Capture notes, plan daily tasks, or log journal entries.',
        }),
        TaskItem.configure({
          nested: true,
          // HTMLAttributes: { class: 'checkbox' },
        }),
        TaskList,
      ],
      content,
      onUpdate: ({ editor }) => {
        onUpdate(editor.getJSON())
      },
      editorProps: {
        attributes: {
          class: 'focus:outline-none',
        },
      },
      onFocus,
      onBlur,
    },
    [content]
  )

  return <EditorContent className={className} editor={editor} />
}

export default EditorComponent
