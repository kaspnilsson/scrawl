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

interface Props {
  date: Moment
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const NoteView = ({ date }: Props) => {
  const router = useRouter()
  const noteKey = makeNoteKeyFromMoment(date)

  const [initialContent, setInitialContent] = useState<Content>('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

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

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setError(undefined)
        setLoading(true)
        const res = await fetcher(`/api/notes/${noteKey}`)
        setInitialContent(res.content || '')
      } catch (e: unknown) {
        setError(e as Error)
        setInitialContent('')
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
                <button className="hidden min-h-0 opacity-50 btn loading btn-ghost no-animation text-neutral-content h-fit sm:flex">
                  Saving...
                </button>
              )}
            </h1>
          </div>
          <div className="flex items-center w-full mt-4">
            <Editor
              className="w-full min-h-[400px]"
              content={initialContent}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}
export default NoteView
