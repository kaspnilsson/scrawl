import { JSONContent } from '@tiptap/core'
import { PROJECT_UPDATE_TYPE } from '../../components/tiptap/ProjectUpdate/ProjectUpdate'
import { ProjectUpdate } from '../../interfaces/projectUpdate'

export const trimUpdatesFromContent = (
  content?: JSONContent[],
  currentNoteDate = '',
  currentProjectName = ''
): { content?: JSONContent[]; updates: Partial<ProjectUpdate>[] } => {
  const out: { content?: JSONContent[]; updates: Partial<ProjectUpdate>[] } = {
    content,
    updates: [],
  }

  const mapFn = (block: JSONContent) => {
    if (
      block.type === PROJECT_UPDATE_TYPE &&
      block.attrs?.noteDate &&
      block.attrs?.id &&
      block.attrs?.projectName
    ) {
      if (
        (currentNoteDate && block.attrs?.noteDate !== currentNoteDate) ||
        (currentProjectName && block.attrs?.projectName !== currentProjectName)
      ) {
        console.warn(
          `Found block ${
            block.attrs?.id
          } which does not belong with this report: ${JSON.stringify(block)}`
        )
        // If block doesnt belong here, replace it with an empty node.
        return { type: 'paragraph' }
      }
      out.updates.push({
        id: block.attrs.id,
        note_date: block.attrs.noteDate,
        project_name: block.attrs?.projectName,
        content: block.content,
      })
      block.content = undefined
    } else {
      if (block.content) {
        block.content = (block.content || []).map(mapFn)
      }
    }
    return block
  }

  out.content = out.content?.map(mapFn)

  return out
}

export const insertUpdatesIntoContent = (
  content: JSONContent | undefined,
  updates: ProjectUpdate[]
): { content: JSONContent; unusedUpdateIds: string[] } => {
  const updatesById: { [key: string]: ProjectUpdate } = {}
  for (const u of updates) updatesById[u.id] = u

  const out = content ?? { type: 'doc', content: [] }

  // Traverse all content
  const blocks = [...(out?.content || [])]
  while (blocks.length) {
    const block = blocks.pop()
    if (
      block?.type === PROJECT_UPDATE_TYPE &&
      block.attrs?.noteDate &&
      block.attrs?.id &&
      block.attrs?.projectName
    ) {
      if (updatesById[block.attrs.id]) {
        block.content = updatesById[block.attrs.id].content
        delete updatesById[block.attrs.id]
      } else {
        console.error(
          `no project update found with id ${block.attrs.id}, but referenced in content.`
        )
        delete block.attrs
        block.content = []
        block.type = 'paragraph'
      }
    }
  }
  // const unusedUpdates = Object.values(updatesById)
  // if (unusedUpdates.length) {
  //   if (!out.content) out.content = []
  //   // Insert the rest of them at the end of the doc
  //   for (const u of unusedUpdates) {
  //     out.content.push({
  //       type: PROJECT_UPDATE_TYPE,
  //       attrs: {
  //         id: u.id,
  //         noteDate: u.note_date,
  //         projectName: u.project_name,
  //       },
  //       content: u.content,
  //     })
  //   }
  // }
  return { content: out, unusedUpdateIds: Object.keys(updatesById) }
}
