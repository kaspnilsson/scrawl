import { Content } from '@tiptap/core'
import { startOfToday } from 'date-fns'
import moment, { Moment } from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { makeNoteKeyFromMoment, postNote } from '../lib/apiHelpers'
import CalendarWeek from './CalendarWeek'
import Editor from './Editor'
import Layout from './Layout'
import { debounce } from 'lodash'
import Datepicker from './Datepicker'
import { useRouter } from 'next/router'
import { routes } from '../lib/routes'
import { Note } from '../interfaces/note'

interface Props {
  date: Moment
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const NoteView = ({ date }: Props) => {
  const router = useRouter()
  const noteKey = makeNoteKeyFromMoment(date)

  const [note, setNote] = useState<Note | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const today = moment(startOfToday())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedPostNote = useCallback(
    debounce(async (content: Content) => {
      setSaving(true)
      await postNote(noteKey, { ...note, content })
      setSaving(false)
    }, 500),
    []
  )

  const handleUpdate = (content: Content) => {
    debouncedPostNote(content)
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setError(undefined)
        setLoading(true)
        const res = await fetcher(`/api/notes/${noteKey}`)
        setNote(res)
      } catch (e: unknown) {
        setError(e as Error)
        setNote(null)
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [noteKey])

  return (
    <Layout
      headerContent={<CalendarWeek selectedDate={date} />}
      loading={loading}
      error={error}
    >
      {!loading && !error && (
        <div className="m-auto prose prose-stone prose-headings:m-0 prose-headings:font-heading">
          <div>
            <div className="flex items-center text-sm font-semibold uppercase">
              {date.format('dddd')}
              {date.isSame(today) && (
                <>
                  <div className="w-2 mx-1">-</div>
                  <span className="">today</span>
                </>
              )}
            </div>
            <h1 className="flex flex-wrap items-center gap-3 font-heading">
              {date.format('MMM D, YYYY')}
              <Datepicker
                selectedDate={date.toDate()}
                onDateSelect={(date) =>
                  router.push(routes.notesForMoment(moment(date)))
                }
              />
              {saving && (
                <button className="hidden min-h-0 opacity-50 btn loading btn-ghost no-animation text-neutral-content h-fit">
                  Saving...
                </button>
              )}
            </h1>
          </div>
          <div className="flex items-center w-full mt-4">
            <Editor
              className="w-full min-h-[400px]"
              content={note?.content || ''}
              onUpdate={handleUpdate}
              noteDate={noteKey}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default NoteView
