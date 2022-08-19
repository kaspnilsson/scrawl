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
  const { method } = req
  const { user } = await getUser({ req, res })

  if (method === 'GET') {
    const { data, error, status } = await supabaseServerClient({ req, res })
      .from('projects')
      .select('*')
      .eq('owner', user.id)

    if (error) {
      res.status(status).end(error)
    }

    res.status(status).json(data)
    return
  } else {
    res.status(405).end(`Method ${method} Not Allowed`)
  }
})
