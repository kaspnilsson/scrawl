import { Content } from '@tiptap/core'
import { startOfToday } from 'date-fns'
import moment, { Moment } from 'moment'
import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { makeNoteKeyFromMoment, postNote } from '../lib/apiHelpers'
import CalendarWeek from './CalendarWeek'
import Editor from './Editor'
import Layout from './Layout'
import { debounce } from 'lodash'
import { Note } from '../interfaces/note'
import ErrorView from './Error'

interface Props {
  date: Moment
}

const NoteView = ({ date }: Props) => {
  const noteKey = makeNoteKeyFromMoment(date)

  const [saving, setSaving] = useState(false)
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR<Note>(`/api/notes/${noteKey}`, fetcher)

  const today = moment(startOfToday())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostNote = useCallback(
    debounce(async (value: Content) => {
      setSaving(true)
      await postNote(noteKey, value)
      setSaving(false)
    }, 500),
    []
  )

  const handleUpdate = (content: Content) => {
    debouncedPostNote(content)
  }

  return (
    <Layout headerContent={<CalendarWeek selectedDate={date} />}>
      {!data && (
        <div className="flex p-16 m-auto loading btn btn-ghost">Loading</div>
      )}
      {!!error && <ErrorView error={error} />}
      {data && (
        <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading">
          <div>
            <div className="flex items-center text-sm font-semibold uppercase">
              {date.format('dddd')}
              {date.isSame(today) && (
                <>
                  <div className="w-2 h-3 mx-1 my-auto divider-horizontal divider"></div>
                  <span className="text-primary-content">today</span>
                </>
              )}
            </div>
            <h1 className="flex items-center gap-2 font-heading">
              {date.format('MMMM Do, YYYY')}
              {saving && (
                <button className="min-h-0 opacity-50 btn loading btn-ghost no-animation text-neutral-content h-fit">
                  Saving...
                </button>
              )}
            </h1>
          </div>
          <div className="flex items-center w-full mt-4">
            <Editor
              className="w-full min-h-[400px]"
              content={data?.content || ''}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default NoteView
