import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { TASK_ITEM_TYPE } from '../../../components/tiptap/TaskItem'
import { Note } from '../../../interfaces/note'
import { Task } from '../../../interfaces/task'
import { TASK_LIST_TYPE } from '../../../lib/serverUtils/tasks'

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { id, insertIntoNote },
  } = req
  const { user } = await getUser({ req, res })

  if (!id) {
    res.status(400).end('No note UID!')
    return
  }

  const idStr = id as string

  if (method === 'GET') {
    const { data, error } = await supabaseServerClient({ req, res })
      .from('tasks')
      .select('*')
      .eq('id', idStr)
      .eq('owner', user.id)

    if (error) {
      res.status(401).end(`GET failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data[0] || { content: '', id: idStr })
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const newTask: Task = {
      created_at: new Date(),
      ...JSON.parse(body),
      id: idStr,
      owner: user.id,
      updated_at: new Date(),
    }

    const { data, error } = await supabaseServerClient({ req, res })
      .from('tasks')
      .upsert(newTask)

    if (insertIntoNote === 'true' && !newTask.project_name) {
      let noteRes = await supabaseServerClient({ req, res })
        .from<Note>('notes')
        .select('*')
        .eq('note_date', newTask.note_date)
        .eq('owner', user.id)

      if (noteRes.error) {
        res
          .status(401)
          .end(
            `Update failed when fetching note! ${JSON.stringify(noteRes.error)}`
          )
        return
      }
      const content = noteRes.data[0].content || { type: 'doc', content: [] }

      if (!content.content) content.content = []
      content.content?.push({
        type: TASK_LIST_TYPE,
        content: [
          {
            type: TASK_ITEM_TYPE,
            attrs: { id: newTask.id, note_date: newTask.note_date },
          },
        ],
      })

      noteRes = await supabaseServerClient({ req, res })
        .from<Note>('notes')
        .upsert({
          owner: user.id,
          note_date: newTask.note_date,
          content,
          updated_at: new Date().toISOString(),
        })

      if (noteRes.error) {
        res
          .status(401)
          .end(
            `Update failed when updating note! ${JSON.stringify(noteRes.error)}`
          )
        return
      }
    }

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
    // const note = await prismaClient.note.upid({
    //   where: { uid },
    //   data,
    //   include: { profiles: true },
    // })
    // if (!note) {
    //   res.status(401).end('Upid failed!')
    //   return
    // }
    // // TODO if (!includeContent) note.content = null
    // res.status(200).json(note)
  } else if (method === 'DELETE') {
    const { error } = await supabaseServerClient({ req, res })
      .from('tasks')
      .delete()
      .match({ id: idStr, owner: user.id })

    if (error) {
      res.status(401).end(`Delete failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
