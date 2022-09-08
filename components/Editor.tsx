import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import { Editor } from '@tiptap/core'
import { Transaction } from 'prosemirror-state'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { SlashCommands } from './tiptap/SlashCommands'
import { slashCommands, SlashCommandsList } from './tiptap/InlineMenu'
import { useUserContext } from '../contexts/userProfile'
import { TaskItem } from './tiptap/TaskItem'
import { ProjectUpdate } from './tiptap/ProjectUpdate/ProjectUpdate'
import AutoId from './tiptap/AutoId'
import { TaskList } from './tiptap/TaskList'

interface Props {
  content?: JSONContent
  onUpdate: (content: JSONContent) => void
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
  noteDate?: string
  projectName?: string
}

const EditorComponent = ({
  content,
  onUpdate,
  onFocus = () => null,
  onBlur = () => null,
  className = '',
  projectName = '',
  noteDate = '',
}: Props) => {
  const handleUpdate = ({ editor }: { editor: Editor }) => {
    onUpdate(editor.getJSON())
  }
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
          includeChildren: true,
          placeholder: 'Capture notes or log project updates.',
        }),
        TaskItem.configure({
          // nested: true,
          // HTMLAttributes: { class: 'checkbox' },
        }),
        TaskList,
        SlashCommands.configure({
          commands: slashCommands({
            userId: user?.id || '',
            projectName,
            noteDate,
          }),
          component: SlashCommandsList,
        }),
        ProjectUpdate,
        // ProjectUpdateContent,
        AutoId,
      ],
      content,
      onUpdate: handleUpdate,
      editorProps: {
        attributes: {
          class: 'focus:outline-none',
        },
      },
      onFocus: onFocus || handleUpdate,
      onBlur: onBlur || handleUpdate,
    },
    [content, user]
  )

  return <EditorContent className={className} editor={editor} />
}

export default EditorComponent
