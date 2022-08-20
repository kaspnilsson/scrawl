import { Content } from '@tiptap/react'

/**
 * A note is intended to serve as a daily log for the user. SOme days may not be populated, there is at most one note per day.
 */

export declare interface Note {
  note_date: string // Just the date str, to query as keys
  created_at: string // ISO string
  updated_at: string // ISO string
  content?: Content
  owner: string
}
