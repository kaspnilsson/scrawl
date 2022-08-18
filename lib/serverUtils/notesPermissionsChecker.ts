import { Note } from '../../interfaces/note'

export const userCanEditNote = (note: Note, user: string): boolean =>
  !!(note && user && note.owner === user)
