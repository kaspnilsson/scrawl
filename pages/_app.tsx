import UserProfileProvider from '../contexts/userProfile'
import './../styles/globals.css'
import './../styles/styles.scss'
import { AppProps } from 'next/app'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <UserProfileProvider>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            className: '!bg-neutral !text-neutral-content',
            position: 'bottom-center',
          }}
        />
      </UserProfileProvider>
    </UserProvider>
  )
}
