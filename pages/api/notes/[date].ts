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
    query: { date },
  } = req
  const { user } = await getUser({ req, res })

  if (!date) {
    res.status(400).end('No note UID!')
    return
  }

  const dateStr = date as string

  if (method === 'GET') {
    const { data, error } = await supabaseServerClient({ req, res })
      .from('notes')
      .select('*')
      .eq('note_date', dateStr)
      .eq('owner', user.id)

    if (error) {
      res.status(401).end(`GET failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data[0] || { content: '', note_date: dateStr })
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const { data, error } = await supabaseServerClient({ req, res })
      .from('notes')
      .upsert({
        note_date: dateStr,
        content: JSON.parse(body),
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
}
