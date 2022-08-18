import { Content } from '@tiptap/core'
import { Moment } from 'moment'

export const handleFetchErrors = async (res: Response) => {
  if (!res.ok)
    throw Error(`${res.statusText || res.status}: ${await res.text()}`)
  return res
}

export const logoutServerside = async () =>
  fetch('/api/auth/logout').then(handleFetchErrors)

export const getNote = async (dateStr: string) =>
  fetch(`/api/notes/${dateStr}`, { method: 'GET' }).then(handleFetchErrors)

export const postNote = async (dateStr: string, content: Content) =>
  fetch(`/api/notes/${dateStr}`, {
    method: 'POST',
    body: JSON.stringify(content),
  }).then(handleFetchErrors)

export const makeNoteKeyFromMoment = (moment: Moment) =>
  moment.format('YYYY-MM-DD')
