import { Content } from '@tiptap/react'

export declare interface Issue {
  id: string
  name: string // usually the date
  createdDate: string // Just the date str, to query as keys
  createdAt: string // ISO string
  updatedAt: string // ISO string
  content?: Content
  referencedNotes: string[] // IDs of referenced notes
  projectId: string[] // Project IDs for this issue
  owner: string
}
