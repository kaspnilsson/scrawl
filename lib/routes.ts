import { Moment } from 'moment'
import { makeNoteKeyFromMoment } from './apiHelpers'

export const routes = {
  index: '/',
  today: '/n/today',
  projects: '/p',
  calendar: '/c',
  tasks: '/t',
  login: '/login',
  notesForDate: (dateStr: string) => `/n/${dateStr}`,
  notesForMoment: (moment: Moment) => `/n/${makeNoteKeyFromMoment(moment)}`,
  project: (name: string) => `/p/${name}`,
  task: (id: string) => `/t/${id}`,
}

export const PUBLIC_BASE_URL = 'https://www.scrawl.day'
