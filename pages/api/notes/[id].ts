import { supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    // includeContent = false,
    query: { id },
  } = req
  const { user } = await getUser({ req, res })

  if (!id) {
    res.status(400).end('No note UID!')
    return
  }

  const uid = id as string

  if (method === 'GET') {
    const note = await supabaseServerClient({ req, res })
      .from('notes')
      .select('*')
      .eq('id', uid)

    if (!note) {
      res.status(401).end('Lesson not found!')
      return
    }

    res.status(200).json(note)
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    if (!(await userCanEditLesson(uid, user.id))) {
      res.status(403).end('You do not own this note!')
      return
    }

    const note = await prismaClient.note.update({
      where: { uid },
      data: JSON.parse(body),
      include: { profiles: true },
    })

    if (!note) {
      res.status(401).end('Update failed!')
      return
    }
    // TODO if (!includeContent) note.content = null

    res.status(200).json(note)
  } else if (method === 'PUT') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const data = JSON.parse(body)

    if (!(await userCanEditLesson(uid, user.id))) {
      res.status(403).end('You do not own this note!')
      return
    }

    const note = await prismaClient.note.update({
      where: { uid },
      data,
      include: { profiles: true },
    })

    if (!note) {
      res.status(401).end('Update failed!')
      return
    }
    // TODO if (!includeContent) note.content = null

    res.status(200).json(note)
  } else if (method === 'DELETE') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    if (!(await userCanEditLesson(uid, user.id))) {
      res.status(403).end('You do not own this note!')
      return
    }

    // Delete things referencing this note first to not violate foriegn key constraints
    await prismaClient.notes.deleteMany({ where: { noteId: uid } })
    await prismaClient.note.delete({ where: { uid } })
    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
}
