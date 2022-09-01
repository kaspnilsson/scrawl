import moment from './moment'
import { Note } from '../interfaces/note'
import { Project } from '../interfaces/project'

export const fetcher = (url: string) =>
  fetch(url)
    .then(handleFetchErrors)
    .then((res) => res.json())

export const handleFetchErrors = async (res: Response) => {
  if (!res.ok)
    throw Error(`${res.statusText || res.status}: ${await res.text()}`)
  return res
}

export const logoutServerside = async () =>
  fetch('/api/auth/logout').then(handleFetchErrors)

export const getProjects = async () =>
  fetch(`/api/projects`, { method: 'GET' }).then(handleFetchErrors)

export const getNote = async (dateStr: string) =>
  fetch(`/api/notes/${dateStr}`, { method: 'GET' }).then(handleFetchErrors)

export const postNote = async (dateStr: string, note: Partial<Note>) =>
  fetch(`/api/notes/${dateStr}`, {
    method: 'POST',
    body: JSON.stringify(note),
  }).then(handleFetchErrors)

export const postProject = async (name: string, project: Partial<Project>) =>
  fetch(`/api/projects/${name}`, {
    method: 'POST',
    body: JSON.stringify(project),
  }).then(handleFetchErrors)

export const deleteProject = async (name: string) =>
  fetch(`/api/projects/${name}`, {
    method: 'DELETE',
  }).then(handleFetchErrors)

export const makeNoteKeyFromMoment = (moment: moment.Moment) =>
  moment.format('YYYY-MM-DD')

export const deleteProjectUpdate = (id: string) =>
  fetch(`/api/projectUpdates/${id}`, {
    method: 'DELETE',
  }).then(handleFetchErrors)
