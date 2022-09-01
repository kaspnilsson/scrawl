import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { Project, ProjectState } from '../../../interfaces/project'
import { ProjectUpdate } from '../../../interfaces/projectUpdate'

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { name, withUpdates },
  } = req
  const { user } = await getUser({ req, res })

  if (!name) {
    res.status(400).end('No note UID!')
    return
  }

  const nameStr = name as string

  if (method === 'GET') {
    const { data, error } = await supabaseServerClient({ req, res })
      .from<Project>('projects')
      .select('*')
      .eq('name', nameStr)
      .eq('owner', user.id)

    if (error) {
      res.status(401).end(`GET failed! ${JSON.stringify(error)}`)
      return
    }

    const project = data[0]
    if (!project) {
      res.status(404).end(`GET failed! ${JSON.stringify(error)}`)
    }

    if (withUpdates) {
      const { data: updates, error } = await supabaseServerClient({ req, res })
        .from<ProjectUpdate>('projectUpdates')
        .select('*')
        .eq('project_name', nameStr)
        .eq('owner', user.id)
        .order('note_date', { ascending: false })

      if (error) {
        res
          .status(401)
          .end(`GET failed fetching project updates! ${JSON.stringify(error)}`)
        return
      }

      project.updates = updates || []
    }

    res.status(200).json(project)
  } else if (method === 'POST') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const { data, error } = await supabaseServerClient({ req, res })
      .from<Project>('projects')
      .upsert({
        created_at: new Date(),
        state: ProjectState.BACKLOG,
        ...JSON.parse(body),
        name: nameStr,
        owner: user.id,
        updated_at: new Date(),
      })

    if (error) {
      res.status(401).end(`Post failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).json(data[0])
  } else if (method === 'PUT') {
    // TODO
  } else if (method === 'DELETE') {
    if (!user) {
      res.status(403).end('Not logged in!')
      return
    }

    const { error } = await supabaseServerClient({ req, res })
      .from<Project>('projects')
      .update({
        state: ProjectState.DELETED,
      })
      .match({
        name: nameStr,
        owner: user.id,
      })

    if (error) {
      res.status(401).end(`Delete failed! ${JSON.stringify(error)}`)
      return
    }

    res.status(200).end()
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
