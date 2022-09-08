import { JSONContent } from '@tiptap/core'
import { TASK_LIST_TYPE } from '../../components/tiptap/TaskList'
import { TaskList } from '../../interfaces/taskList'

export const trimTasksFromContent = (
  content?: JSONContent[],
  currentNoteDate = '',
  currentProjectName = ''
): { content?: JSONContent[]; taskLists: Partial<TaskList>[] } => {
  const out: { content?: JSONContent[]; taskLists: Partial<TaskList>[] } = {
    content,
    taskLists: [],
  }

  const mapFn = (block: JSONContent) => {
    if (block.type === TASK_LIST_TYPE && block.attrs?.id) {
      if (block.attrs?.noteDate) {
        if (
          (currentNoteDate && block.attrs?.noteDate !== currentNoteDate) ||
          (currentProjectName &&
            block.attrs?.projectName !== currentProjectName)
        ) {
          console.warn(
            `Found block ${
              block.attrs?.id
            } which does not belong with this report: ${JSON.stringify(block)}`
          )
          // If block doesnt belong here, replace it with an empty node.
          return { type: 'paragraph' }
        }
      } else {
        // It's a new list, insert the data.
        block.attrs.noteDate = currentNoteDate
        block.attrs.projectName = currentProjectName
      }
      out.taskLists.push({
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

export const insertTasksIntoContent = (
  content: JSONContent | undefined,
  taskLists: TaskList[]
): JSONContent => {
  const taskListsById: { [key: string]: TaskList } = {}
  for (const u of taskLists) taskListsById[u.id] = u

  const out = content ?? { type: 'doc', content: [] }

  // Traverse all content
  const blocks = [...(content?.content || [])]
  while (blocks.length) {
    const block = blocks.pop()
    if (
      block?.type === TASK_LIST_TYPE &&
      block.attrs?.noteDate &&
      block.attrs?.id &&
      block.attrs?.projectName
    ) {
      if (taskListsById[block.attrs.id]) {
        block.content = taskListsById[block.attrs.id].content
        delete taskListsById[block.attrs.id]
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
  const unusedTasks = Object.values(taskListsById)
  if (unusedTasks.length) {
    if (!out.content) out.content = []
    // Insert the rest of them at the end of the doc
    for (const u of unusedTasks) {
      out.content.push({
        type: TASK_LIST_TYPE,
        attrs: {
          id: u.id,
          noteDate: u.note_date,
          projectName: u.project_name,
        },
        content: u.content,
      })
    }
  }

  return out
}
