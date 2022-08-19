import { Content } from '@tiptap/core'

export enum ProjectState {
  OPEN,
  CLOSED,
}

export declare interface Project {
  name: string // unique
  owner: string
  created_at: string // ISO string
  updated_at: string // ISO string
  state: ProjectState
  description: Content
  // issues: string[] // IDs of referenced issues
  // notes: string[] // IDs of referenced notes
}
