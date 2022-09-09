import { useEditor, EditorContent } from '@tiptap/react'
import { Content } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  content?: Content
  className?: string
}

const TaskItemRenderer = ({ content, className = '' }: Props) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content,
      editorProps: {
        attributes: {
          class:
            'prose prose-stone prose-headings:m-0 prose-headings:font-heading max-w-none w-full focus:outline-none prose-p:!m-0',
        },
      },
    },
    [content]
  )

  return <EditorContent editor={editor} readOnly className={className} />
}

export default TaskItemRenderer
