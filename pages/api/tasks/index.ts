import { NextApiRequest, NextApiResponse } from 'next'
import {
  supabaseServerClient,
  getUser,
  withApiAuth,
} from '@supabase/auth-helpers-nextjs'

export default withApiAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { projectName },
  } = req
  const { user } = await getUser({ req, res })

  if (method === 'GET') {
    const query = supabaseServerClient({ req, res })
      .from('tasks')
      .select('*')
      .eq('owner', user.id)
      .order('created_at')
    if (projectName) {
      query.eq('project_name', projectName)
    }
    const { data, error, status } = await query

    if (error) {
      res.status(status).end(error)
    }

    res.status(status).json(data)
    return
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
