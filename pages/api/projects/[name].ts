import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ProjectState } from '../../../interfaces/project'

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { name },
  } = req
  const { user } = await getUser({ req, res })

  if (!name) {
    res.status(400).end('No note UID!')
    return
  }

  const nameStr = name as string

  if (method === 'GET') {
    const { data, error } = await supabaseServerClient({ req, res })
      .from('projects')
      .select('*')
      .eq('name', nameStr)
      .eq('owner', user.id)

    if (error) {
      res.status(401).end(`GET failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data[0] || { description: '', name: nameStr })
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const { data, error } = await supabaseServerClient({ req, res })
      .from('projects')
      .upsert({
        created_at: new Date(),
        state: ProjectState.OPEN,
        ...JSON.parse(body),
        name: nameStr,
        owner: user.id,
        updated_at: new Date(),
      })

    if (error) {
      res.status(401).end(`Upname failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data[0])
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
    // const note = await prismaClient.note.upname({
    //   where: { uid },
    //   data,
    //   include: { profiles: true },
    // })
    // if (!note) {
    //   res.status(401).end('Upname failed!')
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
    // await prismaClient.projects.deleteMany({ where: { noteId: uid } })
    // await prismaClient.note.delete({ where: { uid } })
    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
