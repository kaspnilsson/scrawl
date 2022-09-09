import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'
import { PostgrestError, PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { Note } from '../../../interfaces/note'
import { ProjectUpdate } from '../../../interfaces/projectUpdate'
import { Task } from '../../../interfaces/task'
import {
  insertUpdatesIntoContent,
  trimUpdatesFromContent,
} from '../../../lib/serverUtils/projectUpdates'
import {
  insertTasksIntoContent,
  insertTasksIntoUpdate,
  trimTasksFromContent,
} from '../../../lib/serverUtils/tasks'

const extractErrorsFromPromises = async (
  promises: PostgrestFilterBuilder<unknown>[]
): Promise<PostgrestError | null> => {
  const arr = await Promise.all(promises)
  for (const res of arr) {
    if (res.error) return res.error
  }
  return null
}

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { date },
  } = req
  const { user, error } = await getUser({ req, res })

  if (error) {
    res.status(error.status).end(`Fetch user failed! ${JSON.stringify(error)}`)
    return
  }

  if (!date) {
    res.status(400).end('No note UID!')
    return
  }

  const dateStr = date as string

  if (method === 'GET') {
    const notePromise = supabaseServerClient({ req, res })
      .from<Note>('notes')
      .select('*')
      .eq('note_date', dateStr)
      .eq('owner', user.id)

    const updatesPromise = supabaseServerClient({ req, res })
      .from<ProjectUpdate>('projectUpdates')
      .select('*')
      .eq('note_date', dateStr)
      .eq('owner', user.id)

    const tasksPromise = supabaseServerClient({ req, res })
      .from<Task>('tasks')
      .select('*')
      .eq('note_date', dateStr)
      .eq('owner', user.id)

    const [note, updates, tasks] = await Promise.all([
      notePromise,
      updatesPromise,
      tasksPromise,
    ])

    if (note.error || updates.error || tasks.error) {
      res
        .status(
          parseInt(
            note.error?.code || updates.error?.code || tasks.error?.code || 'no'
          ) || 401
        )
        .end(
          `GET failed! ${JSON.stringify(
            note.error || updates.error || tasks.error
          )}`
        )
      return
    }

    const out = note.data[0] || { content: '', note_date: dateStr }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promises: PostgrestFilterBuilder<any>[] = []
    updates.data.map((update) => {
      const { unusedTaskIds } = insertTasksIntoUpdate(
        update,
        tasks.data.filter((t) => t.project_name === update.project_name)
      )
      if (unusedTaskIds) {
        promises.push(
          supabaseServerClient({ req, res })
            .from<Task>('tasks')
            .delete({ returning: 'minimal' })
            .match({ owner: user.id })
            .in('id', unusedTaskIds)
        )
      }
    })
    const { unusedUpdateIds } = insertUpdatesIntoContent(
      out.content,
      updates.data
    )
    if (unusedUpdateIds) {
      promises.push(
        supabaseServerClient({ req, res })
          .from<ProjectUpdate>('projectUpdates')
          .delete({ returning: 'minimal' })
          .match({ owner: user.id })
          .in('id', unusedUpdateIds)
      )
    }
    const { unusedTaskIds } = insertTasksIntoContent(
      out.content,
      tasks.data.filter((t) => t.note_date === dateStr && !t.project_name)
    )
    if (unusedTaskIds) {
      promises.push(
        supabaseServerClient({ req, res })
          .from<ProjectUpdate>('tasks')
          .delete({ returning: 'minimal' })
          .match({ owner: user.id })
          .in('id', unusedTaskIds)
      )
    }

    const err = await extractErrorsFromPromises(promises)
    if (err) {
      res
        .status(parseInt(err.code) || 401)
        .end(`GET failed! ${JSON.stringify(err)}`)
      return
    }

    res.status(200).json(out)
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const partialNote = JSON.parse(body) as Partial<Note>

    if (partialNote.content?.content) {
      // Get updates out, then get tasks out of updates, then get tasks out of note.
      const trimmedUpdates = trimUpdatesFromContent(
        partialNote.content.content,
        dateStr
      )
      partialNote.content.content = trimmedUpdates.content
      if (trimmedUpdates.updates.length) {
        const promises = []
        for (const update of trimmedUpdates.updates) {
          const trimmedTasks = trimTasksFromContent(
            update.content,
            dateStr,
            update.project_name
          )
          update.content = trimmedTasks.content
          if (trimmedTasks.tasks.length) {
            promises.push(
              await supabaseServerClient({ req, res })
                .from('tasks')
                .upsert(
                  trimmedTasks.tasks.map((u) => ({
                    created_at: new Date(),
                    ...u,
                    owner: user.id,
                    updated_at: new Date(),
                  }))
                )
            )
          }
        }

        promises.push(
          supabaseServerClient({ req, res })
            .from('projectUpdates')
            .upsert(
              trimmedUpdates.updates.map((u) => ({
                created_at: new Date(),
                ...u,
                owner: user.id,
                updated_at: new Date(),
              }))
            )
        )

        const responses = await Promise.all(promises)
        for (const r of responses) {
          if (r.error) {
            res.status(401).end(`Update failed! ${JSON.stringify(r.error)}`)
            return
          }
        }
      }

      const trimmedTasks = trimTasksFromContent(
        partialNote.content.content,
        dateStr
      )
      partialNote.content.content = trimmedTasks.content
      if (trimmedTasks.tasks.length) {
        await supabaseServerClient({ req, res })
          .from('tasks')
          .upsert(
            trimmedTasks.tasks.map((u) => ({
              created_at: new Date(),
              ...u,
              owner: user.id,
              updated_at: new Date(),
            }))
          )
      }
    }

    const { data, error } = await supabaseServerClient({ req, res })
      .from('notes')
      .upsert({
        created_at: new Date(),
        ...partialNote,
        note_date: dateStr,
        owner: user.id,
        updated_at: new Date(),
      })

    if (error) {
      res.status(401).end(`Update failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data)
  } else if (method === 'PUT') {
    // if (!user) {
    //   res.status(403).end('Not logged in!')
    //   return
    // }
    // const data = JSON.parse(body)
    // if (!(await userCanEditnote(uid, user.id))) {
    //   res.status(403).end('You do not own this note!')
    //   return
    // }
    // const note = await prismaClient.note.update({
    //   where: { uid },
    //   data,
    //   include: { profiles: true },
    // })
    // if (!note) {
    //   res.status(401).end('Update failed!')
    //   return
    // }
    // // TODO if (!includeContent) note.content = null
    // res.status(200).json(note)
  } else if (method === 'DELETE') {
    // if (!user) {
    //   res.status(403).end('Not logged in!')
    //   return
    // }

    // if (!(await userCanEditnote(uid, user.id))) {
    //   res.status(403).end('You do not own this note!')
    //   return
    // }

    // // Delete things referencing this note first to not violate foriegn key constraints
    // await prismaClient.notes.deleteMany({ where: { noteId: uid } })
    // await prismaClient.note.delete({ where: { uid } })
    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
