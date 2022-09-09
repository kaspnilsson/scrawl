import { JSONContent } from '@tiptap/core'
import { TASK_ITEM_TYPE } from '../../components/tiptap/TaskItem'
import { Task } from '../../interfaces/task'

const TASK_LIST_TYPE = 'taskList'

// Iterate through content.
// When we find a task list, grab each task out of it and save it to the DB similar to project lists.
// Nested disabled for now.
export const trimTasksFromContent = (
  content?: JSONContent[],
  currentNoteDate = '',
  currentProjectName = ''
): { content?: JSONContent[]; tasks: Partial<Task>[] } => {
  const out: { content?: JSONContent[]; tasks: Partial<Task>[] } = {
    content,
    tasks: [],
  }

  const mapFn = (block: JSONContent) => {
    if (block.type === TASK_LIST_TYPE && block.content) {
      for (const child of block.content) {
        if (!child.attrs?.id) continue
        // Verify task item type is correct
        if (child.type !== TASK_ITEM_TYPE) {
          console.warn(
            `Found unexpected child of type ${
              child.type
            } inside task list: ${JSON.stringify(child)}`
          )
          continue
        }
        if (!child.content) continue
        // Verify that the task belongs here (things can get fucked up when copied / pasted, for example)
        if (child.attrs?.noteDate || child.attrs?.projectName) {
          if (
            child.attrs.noteDate !== currentNoteDate ||
            child.attrs.projectName !== currentProjectName
          ) {
            // dunno what to do here yet. Delete?
            console.warn(
              `Found unexpected child with wrong data inside task list: ${JSON.stringify(
                child
              )}`
            )
          }
        }

        out.tasks.push({
          id: child.attrs.id,
          note_date: currentNoteDate,
          project_name: currentProjectName,
          checked: child.attrs.checked,
          content: child.content,
        })
        child.content = undefined
      }
    } else {
      // Recurse
      if (block.content) {
        block.content = (block.content || []).map(mapFn)
      }
    }
    return block
  }

  out.content = out.content?.map(mapFn)

  return out
}

// Crawl through all content.
// When we find a task list, go into it and check IDs of each task within
export const insertTasksIntoContent = (
  content: JSONContent | undefined,
  tasks: Task[]
): JSONContent => {
  const tasksById: { [key: string]: Task } = {}
  for (const u of tasks) tasksById[u.id] = u

  const out = content ?? { type: 'doc', content: [] }

  // Traverse all content
  const blocks = [...(out?.content || [])]
  while (blocks.length) {
    const block = blocks.pop()
    if (block?.type === TASK_LIST_TYPE && block.content) {
      // Iterate over children
      for (let i = 0; i < block.content?.length || 0; i++) {
        const child = block.content[i]
        if (tasksById[child.attrs?.id]) {
          const { content, note_date, project_name, checked } =
            tasksById[child.attrs?.id]
          child.content = content
          if (!child.attrs) child.attrs = {}
          child.attrs.noteDate = note_date
          child.attrs.projectName = project_name
          child.attrs.checked = checked
          delete tasksById[child.attrs?.id]
          block.content[i] = child
        } else {
          console.warn(
            `No task found with id ${child.attrs?.id}, but referenced in content.`
          )
          block.content.splice(i, 1)
          i--
        }
      }
    }
  }
  const unusedTasks = Object.values(tasksById)
  if (unusedTasks.length) {
    if (!out.content) out.content = []
    // Insert the rest of them at the end of the doc
    // TODO do we actually want this tho
    // const newTaskList = {
    //   type: TASK_LIST_TYPE,
    //   content: [] as JSONContent[],
    // }
    // for (const u of unusedTasks) {
    //   newTaskList.content.push({
    //     type: TASK_ITEM_TYPE,
    //     attrs: {
    //       id: u.id,
    //       noteDate: u.note_date,
    //       projectName: u.project_name,
    //       checked: u.checked,
    //     },
    //     content: u.content,
    //   })
    // }
    // out.content.push(newTaskList)
  }

  return out
}
