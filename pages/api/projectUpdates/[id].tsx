import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { id },
  } = req
  const { user } = await getUser({ req, res })

  if (!id) {
    res.status(400).end('No note UID!')
    return
  }

  const idStr = id as string

  if (method === 'GET') {
    const { data, error } = await supabaseServerClient({ req, res })
      .from('projectUpdates')
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

    const { data, error } = await supabaseServerClient({ req, res })
      .from('projectUpdates')
      .upsert({
        created_at: new Date(),
        ...JSON.parse(body),
        id: idStr,
        owner: user.id,
        upidd_at: new Date(),
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
      .from('projectUpdates')
      .delete()
      .match({ id: idStr, owner: user.id })
    // if (!user) {
    //   res.status(403).end('Not logged in!')
    //   return
    // }

    // if (!(await userCanEditnote(uid, user.id))) {
    //   res.status(403).end('You do not own this note!')
    //   return
    // }
    if (error) {
      res.status(401).end(`Delete failed! ${JSON.stringify(error)}`)
      return
    }

    // // Delete things referencing this note first to not violate foriegn key constraints
    // await prismaClient.notes.deleteMany({ where: { noteId: uid } })
    // await prismaClient.note.delete({ where: { uid } })
    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
