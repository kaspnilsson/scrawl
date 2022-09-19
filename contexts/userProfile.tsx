import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { User } from '../interfaces/userAndProfile'
import { logoutServerside } from '../lib/apiHelpers'
import { routes } from '../lib/routes'
import { useRouter } from 'next/router'
import { ErrorPayload } from '@supabase/auth-helpers-shared'

export const UserProfileContext = createContext<Props>({
  user: null,
  loading: false,
})

interface Props {
  user: User | null
  loading: boolean
  logout?: () => void
  error?: ErrorPayload
}

const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { user: sessionUser, error } = useUser()
  const [user, setUser] = useState(sessionUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUserProfile = async () => {
      if (sessionUser) {
        setLoading(true)
        try {
          const { data: profile } = await supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', sessionUser.id)
            .single()

          setUser({
            ...sessionUser,
            ...profile,
          })
        } finally {
          setLoading(false)
        }
      } else setUser(null)
    }
    getUserProfile()

    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
      getUserProfile()
    })
  }, [sessionUser])

  const logout = async () => {
    await logoutServerside()
    setUser(null)
    router.push(routes.login)
  }
  const exposed = {
    user,
    loading,
    logout,
    error,
  }

  return (
    <UserProfileContext.Provider value={exposed}>
      {children}
    </UserProfileContext.Provider>
  )
}

export const useUserContext = () => useContext(UserProfileContext)

export default UserProfileProvider
