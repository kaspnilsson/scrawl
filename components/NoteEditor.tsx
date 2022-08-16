import { Content } from '@tiptap/react'
import Editor from './Editor'

interface Props {
  debouncedOnUpdate: (content: Content) => void
  content?: Content
}

const NoteEditor = ({ content, debouncedOnUpdate }: Props) => {
  return (
    <Editor
      content={content}
      className="w-full max-w-md px-8 py-2 border rounded-md shadow-md bg-onDark border-border"
      onUpdate={(content) => null}
    />
  )
}

export default NoteEditor
