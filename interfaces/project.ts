import { JSONContent } from '@tiptap/core'
import { ProjectUpdate } from './projectUpdate'

/**
 * A project is a long running concept grouping multiple units of work
 * together.
 *
 * - Projects receive updates over time, and may have a ton of work done on
 *   them in one day and then none for a while.
 * - A user should create a different project for every major goal they
 *   would like to accomplish.
 */

export enum ProjectState {
  BACKLOG = 'Backlog',
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived',
  IN_PROGRESS = 'In progress',
  DELETED = 'Deleted',
}

export declare interface Project {
  name: string // unique
  owner: string
  created_at: string // ISO string
  updated_at: string // ISO string
  state: ProjectState
  description: JSONContent | null
  tasks: string[] // IDs of tasks belonging to this project.
  updates?: ProjectUpdate[]
}

export const STATE_TO_SORT_VALUE = {
  [ProjectState.IN_PROGRESS]: 4,
  [ProjectState.BACKLOG]: 3,
  [ProjectState.COMPLETED]: 2,
  [ProjectState.ARCHIVED]: 1,
  [ProjectState.DELETED]: 0,
}

export const sortProjectsForSelection = (a: Project, b: Project) => {
  const aVal = STATE_TO_SORT_VALUE[a.state]
  const bVal = STATE_TO_SORT_VALUE[b.state]
  if (aVal === bVal) {
    // compare updated timestamp if same date
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  }
  return bVal - aVal
}
