import { useEditor, EditorContent, Content } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'

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
  onFocus,
  onBlur,
  className = '',
}: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    // onFocus,
    // onBlur,
  })

  return <EditorContent className={className} editor={editor} />
}

export default EditorComponent
