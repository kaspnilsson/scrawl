import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
// import Document from '@tiptap/extension-document'
import { useUserContext } from '../contexts/userProfile'
import { TaskItem } from './tiptap/TaskItem'
import TaskList from '@tiptap/extension-task-list'
import { slashCommands, SlashCommandsList } from './tiptap/InlineMenu'
import { SlashCommands } from './tiptap/SlashCommands'
import { ProjectUpdate } from './tiptap/ProjectUpdate/ProjectUpdate'
import AutoId from './tiptap/AutoId'

interface Props {
  content?: JSONContent | null
  onUpdate: (content: JSONContent) => void
  projectName?: string
  noteDate?: string
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
  placeholder?: string
}

const ProjectUpdateEditor = ({
  content,
  onUpdate,
  projectName,
  noteDate,
  onFocus = () => null,
  onBlur = () => null,
  className = '',
  placeholder = '',
}: Props) => {
  const { user } = useUserContext()
  const editor = useEditor(
    {
      extensions: [
        Image.extend({
          addAttributes() {
            return {
              ...this.parent?.(),
              loading: {
                default: false,
                renderHTML: (attributes) => {
                  if (attributes.loading) {
                    return {
                      'data-loading': attributes.loading,
                    }
                  }
                },
              },
              id: {
                default: false,
                renderHTML: () => ({}),
              },
            }
          },
        }).configure({ HTMLAttributes: { class: 'rounded-xl' } }),
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder || 'Add project details',
          includeChildren: true,
        }),
        TaskItem.configure({
          nested: true,
          // HTMLAttributes: { class: 'checkbox' },
        }),
        TaskList,
        SlashCommands.configure({
          commands: slashCommands({
            userId: user?.id || '',
            simple: true,
            projectName,
            noteDate,
          }),
          component: SlashCommandsList,
        }),
        ProjectUpdate,
        AutoId,
      ],
      content,
      onUpdate: ({ editor }) => {
        onUpdate(editor.getJSON())
      },
      editorProps: {
        attributes: {
          class:
            'prose prose-stone prose-headings:m-0 prose-headings:font-heading max-w-none w-full focus:outline-none',
        },
      },
      onFocus,
      onBlur,
    },
    [content, user]
  )

  return <EditorContent className={className} editor={editor} />
}

export default ProjectUpdateEditor
