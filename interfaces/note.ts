import { Content } from '@tiptap/react'

export declare interface Note {
  id: string
  name: string // usually the date
  createdDate: string // Just the date str, to query as keys
  createdAt: string // ISO string
  updatedAt: string // ISO string
  content?: Content
  referencedIssues: string[] // IDs of referenced issues
}
