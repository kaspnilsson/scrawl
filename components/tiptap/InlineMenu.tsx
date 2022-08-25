import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { Editor, findChildren } from '@tiptap/core'
import classNames from 'classnames'
import moment from 'moment'
import { makeNoteKeyFromMoment } from '../../lib/apiHelpers'
import { generateRandomId } from '../../lib/randomId'
import { resizeImage } from '../../lib/resizeImage'
import { SlashCommandsCommand } from './SlashCommands'
import { getCurrentlySelectedNodes as getHierarchyFromPos } from '../../lib/prosemirror'

// import { EditorView } from 'prosemirror-view'

// const oldUpdateState = EditorView.prototype.updateState

// // Total hack to make image uploads work, see https://github.com/ueberdosis/tiptap/issues/1451#issuecomment-1160802996
// EditorView.prototype.updateState = function updateState(state) {
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   if (!this.docView) return // This prevents the matchesNode error on hot reloads
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   oldUpdateState.call(this, state)
// }

const SUPABASE_STORAGE_BUCKET_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`

const resizeAndUploadImage = async (
  image: File,
  name: string
): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(image)

    reader.addEventListener('load', async () => {
      // Resize the image client side for faster upload and to save storage space
      // We skip resizing gif as it turns them into a single image
      let blob: Blob | File = image
      if (image.type !== 'image/gif') {
        blob = await resizeImage(image, { maxWidth: 2000 })
      }

      const { data, error } = await supabaseClient.storage
        .from('images')
        .upload(name, blob, { cacheControl: '31536000' })

      if (error) {
        throw error
      }
      if (!data?.Key) {
        throw new Error('no url received for upload!')
      }

      resolve(`${SUPABASE_STORAGE_BUCKET_URL}${data.Key}`)
    })
  })
}

// // https://stackoverflow.com/questions/68146588/tiptap-insert-node-below-at-the-end-of-the-current-one
// const forceNewBlock = (editor: Editor) => {
//   const pos = editor.state.selection.$from.after(1)
//   // editor.chain().insertContentAt(pos, { type: 'paragraph' }).run()
//   editor.commands.focus(pos)
// }

export const slashCommands = ({
  userId,
  projectName = '',
  noteDate = '',
  simple = false,
}: {
  userId: string
  projectName?: string
  noteDate?: string
  simple?: boolean
}): SlashCommandsCommand[] => {
  const out: SlashCommandsCommand[] = [
    {
      icon: <i className="font-thin ri-lg ri-h-1" />,
      title: 'Big Heading',
      description: 'Big section Heading',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleHeading({ level: 2 }).run()
          return
        }

        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-h-2" />,
      title: 'Small Heading',
      description: 'Small section Heading',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleHeading({ level: 3 }).run()
          return
        }

        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-task-line" />,
      title: 'Task list',
      description: 'Create a task list',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleTaskList().run()
          return
        }
        editor
          .chain()
          .focus()
          // Use deleteRange to clear the text from command chars "/bu" etc..
          .deleteRange(range)
          .toggleTaskList()
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-list-unordered" />,
      title: 'Bulleted list',
      description: 'Create a bulleted list',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleBulletList().run()
          return
        }
        editor
          .chain()
          .focus()
          // Use deleteRange to clear the text from command chars "/bu" etc..
          .deleteRange(range)
          .toggleBulletList()
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-list-ordered" />,
      title: 'Numbered list',
      description: 'Create a numbered list',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleOrderedList().run()
          return
        }

        editor
          .chain()
          .focus()
          // Use deleteRange to clear the text from command chars "/q" etc..
          .deleteRange(range)
          .toggleOrderedList()
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-double-quotes-l" />,
      title: 'Quote',
      description: 'Create a quote',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().toggleBlockquote().run()
          return
        }

        editor
          .chain()
          .focus()
          // Use deleteRange to clear the text from command chars "/q" etc..
          .deleteRange(range)
          .toggleBlockquote()
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-divide-line" />,
      title: 'Divider',
      description: 'Create a divider',
      command: ({ editor, range }) => {
        let chainCommands = editor.chain().focus()
        if (range) {
          chainCommands = chainCommands.deleteRange(range)
        }
        chainCommands
          .setHorizontalRule()
          // Here we insert a paragraph after the divider that will be removed directly to fix
          // an issue with TipTap where the isActive('paragraph') function is returning
          // false.
          .insertContent({
            type: 'paragraph',
          })
          .deleteNode('paragraph')
          .run()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-image-line" />,
      title: 'Image',
      description: 'Upload from your computer',
      command: ({ editor, range }) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/jpeg,image/png,image/gif'

        input.onchange = async (e) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const file: File | undefined = (e.target as any)?.files?.[0]
          if (!file) return
          const [mime] = file.type.split('/')
          if (mime !== 'image') return

          // We show a preview of  the image image as uploading can take a while...
          const preview = URL.createObjectURL(file)
          const id = generateRandomId()
          let chainCommands = editor.chain().focus()
          if (range) {
            chainCommands = chainCommands.deleteRange(range)
          }
          chainCommands
            .setImage({ src: preview })
            .updateAttributes('image', { loading: true, id })
            .run()

          const name = `${userId}/${id}`
          const imageUrl = await resizeAndUploadImage(file, name)

          // Preload the new image so there is no flicker
          const uploadedImage = new Image()
          uploadedImage.src = imageUrl
          uploadedImage.onload = () => {
            // When an image finished being uploaded, the selection of the user might have changed
            // so we need to find the right image associated with the ID in order to update it.
            editor
              .chain()
              .focus()
              .command(({ tr }) => {
                const doc = tr.doc
                const images = findChildren(
                  doc,
                  (node) => node.type.name === 'image' && node.attrs.id === id
                )
                const image = images[0]
                if (!image || images.length > 1) {
                  return false
                }

                tr.setNodeMarkup(image.pos, undefined, {
                  ...image.node.attrs,
                  src: imageUrl,
                  loading: false,
                })
                return true
              })
              .run()

            // Create a new paragraph so user can continue writing
            editor.commands.createParagraphNear()
          }
        }

        input.click()
      },
    },
    {
      icon: <i className="font-thin ri-lg ri-code-s-slash-line" />,
      title: 'Code',
      description: 'Create a code snippet',
      command: ({ editor, range }) => {
        if (!range) {
          editor.chain().focus().setCodeBlock().run()
          return
        }

        editor.chain().focus().deleteRange(range).setCodeBlock().run()
      },
    },
  ]

  if (simple) return out

  if (noteDate || projectName) {
    out.push({
      icon: <i className="font-thin ri-lg ri-add-box-line" />,
      title: 'Project update',
      description: 'Create a project update',
      command: async ({ editor, range }) => {
        const attrs = {
          noteDate: noteDate || makeNoteKeyFromMoment(moment(new Date())),
          projectName,
        }
        if (!range) {
          editor.commands.focus()
          editor.commands.addProjectUpdate(attrs)
          return
        }
        editor
          .chain()
          .focus()
          // Use deleteRange to clear the text from command chars "/bu" etc..
          .deleteRange(range)
          .run()
        editor.commands.addProjectUpdate(attrs)
      },
      isEnabled: (editor?: Editor) => {
        if (!editor) return false

        const nodes = getHierarchyFromPos(editor.state.selection.$anchor)
        for (const n of nodes) {
          if (n.type.name === 'projectUpdate') {
            return false
          }
        }
        return true
      },
    })
  }

  return out
}

export const SlashCommandsList = (props: {
  items: SlashCommandsCommand[]
  selectedIndex: number
  selectItem: (index: number) => void
}) => {
  const { items, selectedIndex, selectItem } = props

  return (
    <div className="gap-1 p-2 w-48 shadow-lg menu not-prose rounded-box bg-base-200">
      {items.map(({ title, icon }, idx) => (
        <li key={idx} onClick={() => selectItem(idx)}>
          <div
            className={classNames('hover:active flex gap-2 items-center p-2', {
              active: selectedIndex === idx,
            })}
          >
            {icon}
            <span className="text-sm">{title}</span>
          </div>
        </li>
      ))}
      {!items.length && <li className="p-2 text-sm opacity-50">No results</li>}
    </div>
  )
}
