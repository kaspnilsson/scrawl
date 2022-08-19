import { useEditor, EditorContent, Content } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import Image from '@tiptap/extension-image'
import { SlashCommands } from './tiptap/SlashCommands'
import { slashCommands, SlashCommandsList } from './tiptap/InlineMenu'
import { useUserContext } from '../contexts/userProfile'
import { TaskItem } from './tiptap/TaskItem'

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
        }),
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
        SlashCommands.configure({
          commands: slashCommands({ userId: user?.id || '' }),
          component: SlashCommandsList,
        }),
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
    [content, user]
  )

  return <EditorContent className={className} editor={editor} />
}

export default EditorComponent
