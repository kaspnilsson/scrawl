import { Content } from '@tiptap/react'

export declare interface Project {
  id: string
  name: string // usually the date
  createdDate: string // Just the date str, to query as keys
  createdAt: string // ISO string
  updatedAt: string // ISO string
  content?: Content
  issues: string[] // IDs of referenced issues
  notes: string[] // IDs of referenced notes
  owner: string
}
