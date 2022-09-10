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
import TaskList from '@tiptap/extension-task-list'
import { DependencyList } from 'react'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextBubbleMenu from './TextBubbleMenu'
import TextAlign from '@tiptap/extension-text-align'
import BubbleMenu from '@tiptap/extension-bubble-menu'

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
  deps?: DependencyList
}

const EditorComponent = ({
  content,
  onUpdate,
  onFocus = () => null,
  onBlur = () => null,
  className = '',
  projectName = '',
  noteDate = '',
  deps = [],
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
          placeholder: "Capture notes or type '/'",
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
        AutoId,
        Highlight,
        Underline,
        Link,
        TextAlign.configure({
          alignments: ['left', 'center', 'right'],
          types: ['heading', 'paragraph'],
        }),
        BubbleMenu.configure({
          pluginKey: 'text-bubble-menu',
          element: document.querySelector('.text-bubble-menu') as HTMLElement,
        }),
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
    [user, noteDate, projectName, ...deps]
  )

  return (
    <>
      {editor && <TextBubbleMenu editor={editor} />}
      <EditorContent className={className} editor={editor} />
    </>
  )
}

export default EditorComponent
