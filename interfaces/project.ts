import { JSONContent } from '@tiptap/core'

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
}

export declare interface Project {
  name: string // unique
  owner: string
  created_at: string // ISO string
  updated_at: string // ISO string
  state: ProjectState
  description: JSONContent
  tasks: string[] // IDs of tasks belonging to this project.
}
