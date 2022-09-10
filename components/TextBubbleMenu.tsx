import React from 'react'
import { BubbleMenu, Editor, getTextBetween } from '@tiptap/react'
import 'tippy.js/dist/svg-arrow.css'
import MenuIconButton from './MenuIconButton'
import { CheckCircleIcon } from '@heroicons/react/outline'

interface Props {
  editor: Editor
}

const TextBubbleMenu = ({ editor }: Props) => {
  if (!editor) {
    return null
  }
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        // duration: 200,
        animation: 'shift-away',
        zIndex: 1000,
        maxWidth: '80vw',
      }}
      shouldShow={({ editor, state }) => {
        const { doc, selection } = state
        const { ranges } = selection
        const from = Math.min(...ranges.map((range) => range.$from.pos))
        const to = Math.max(...ranges.map((range) => range.$to.pos))
        const range = { from, to }
        return (
          !!getTextBetween(doc, range) &&
          (editor.isActive('paragraph') || editor.isActive('heading'))
        )
      }}
    >
      <div className="flex overflow-y-scroll rounded-md bg-base-300 not-prose text-bubble-menu">
        <MenuIconButton
          label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<i className="text-lg font-thin ri-bold" />}
        />
        <MenuIconButton
          label="Italicize"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<i className="text-lg font-thin ri-italic" />}
        />
        <MenuIconButton
          label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          icon={<i className="text-lg font-thin ri-underline" />}
        />
        <MenuIconButton
          label="Highlight"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive('highlight')}
          icon={<i className="text-lg font-thin ri-mark-pen-line" />}
        />
        <MenuIconButton
          label="Code (inline)"
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          icon={<i className="text-lg font-thin ri-code-line" />}
        />
        <MenuIconButton
          label="Clear formatting"
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run()
            editor.chain().focus().clearNodes().run()
          }}
          icon={<i className="text-lg font-thin ri-format-clear" />}
        />
        <div className="p-0 mx-0 my-2 divider divider-horizontal"></div>
        <MenuIconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          icon={<i className="text-lg font-thin ri-h-1" />}
          label="Heading"
        />
        <MenuIconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          icon={<i className="text-lg font-thin ri-h-2" />}
          label="Subheading"
        />
        <MenuIconButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          icon={<CheckCircleIcon className="w-5 h-5" />}
          label="Task list"
          isActive={editor.isActive('taskList')}
        />
        <MenuIconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          icon={<i className="font-thin ri-lg ri-list-unordered" />}
          label="Bulleted list"
          isActive={editor.isActive('bulletList')}
        />
        <div className="p-0 mx-0 my-2 divider divider-horizontal"></div>
        <MenuIconButton
          label="Left align"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          icon={<i className="text-lg font-thin ri-align-left" />}
        />
        <MenuIconButton
          label="Center text"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          icon={<i className="text-lg font-thin ri-align-center" />}
        />
        <MenuIconButton
          label="Right align"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          icon={<i className="text-lg font-thin ri-align-right" />}
        />
      </div>
    </BubbleMenu>
  )
}

export default TextBubbleMenu
