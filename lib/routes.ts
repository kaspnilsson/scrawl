import { Moment } from 'moment'

export const routes = {
  index: '/',
  today: '/notes/today',
  projects: '/p',
  calendar: '/c',
  login: '/login',
  notesForDate: (dateStr: string) => `/notes/${dateStr}`,
  notesForMoment: (moment: Moment) => `/notes/${moment.format('YYYY-MM-DD')}`,
}

export const PUBLIC_BASE_URL = 'https://www.scrawl.day'
