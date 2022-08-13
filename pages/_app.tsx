import UserProfileProvider from '../contexts/userProfile'
import './../styles/globals.css'
import '../lib/colorTheme'
import { AppProps } from 'next/app'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <UserProfileProvider>
        <Component {...pageProps} />
      </UserProfileProvider>
    </UserProvider>
  )
}
