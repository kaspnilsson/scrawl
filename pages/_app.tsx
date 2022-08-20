import UserProfileProvider from '../contexts/userProfile'
import 'remixicon/fonts/remixicon.css'
import './../styles/globals.css'
import './../styles/styles.scss'
import { AppProps } from 'next/app'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { UserProvider } from '@supabase/auth-helpers-react'
import { Toaster } from 'react-hot-toast'
import { IsHydratedProvider } from '../contexts/isHydrated'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <IsHydratedProvider>
        <UserProfileProvider>
          <Component {...pageProps} />
          <Toaster
            toastOptions={{
              className: '!bg-neutral !text-neutral-content',
              position: 'bottom-center',
            }}
          />
        </UserProfileProvider>
      </IsHydratedProvider>
    </UserProvider>
  )
}
