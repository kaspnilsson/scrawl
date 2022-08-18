import { Content } from '@tiptap/react'

export declare interface Note {
  note_date: string // Just the date str, to query as keys
  created_at: string // ISO string
  updated_at: string // ISO string
  content?: Content
  //   referencedIssues?: string[] // IDs of referenced issues
  owner: string
}
