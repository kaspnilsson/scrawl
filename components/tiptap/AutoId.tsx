import { Node } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import { generateRandomId } from '../../lib/randomId'

/**
 * Types that should have an ID in them
 */
export const types = new Set(['heading', 'projectUpdate', 'taskItem'])

/**
 * Adds a unique ID to each type in [types]
 */
const AutoId = Node.create({
  name: 'autoId',

  addGlobalAttributes() {
    return [
      {
        types,
        attributes: {
          id: {
            default: null,
            keepOnSplit: false,
          },
        },
      },
    ]
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
          const existingIds = new Set<string>()
          // no changes
          if (newState.doc === oldState.doc) {
            return
          }
          const tr = newState.tr

          newState.doc.descendants((node, pos) => {
            // Check for duplicate IDs
            let id = node.attrs.id
            if (id && existingIds.has(id)) {
              id = ''
            } else if (id) {
              existingIds.add(id)
            }
            if (node.isBlock && !id && types.has(node.type.name)) {
              id = generateRandomId()
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                id,
              })
            }
          })

          return tr
        },
      }),
    ]
  },
})

export default AutoId
