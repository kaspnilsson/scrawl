import { JSONContent } from '@tiptap/core'

export declare interface Task {
  id: string
  owner: string
  created_at: string // ISO string
  updated_at: string // ISO string
  content?: JSONContent[]
  note_date: string
  project_name: string
}
