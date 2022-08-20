import { Content } from '@tiptap/core'

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
  OPEN,
  CLOSED,
}

export const STATE_DISPLAY_STRINGS = {
  [ProjectState.OPEN]: 'Open',
  [ProjectState.CLOSED]: 'Open',
}

export declare interface Project {
  name: string // unique
  owner: string
  created_at: string // ISO string
  updated_at: string // ISO string
  state: ProjectState
  description: Content
  tasks: string[] // IDs of tasks belonging to this project.
}
