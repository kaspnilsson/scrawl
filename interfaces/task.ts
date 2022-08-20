import { Content } from '@tiptap/core'

export declare interface Task {
  creation_date?: string // Just the date str, to query as keys. Always populated with the date of creation of the task.
  created_at: string // ISO string
  updated_at: string // ISO string
  due_date?: string // ISO string, optional
  description?: Content
  proejct_name?: string // Project name as key for querying. May not exist, e.g. if the task is not part of a project.
  name: string
  owner: string
}
