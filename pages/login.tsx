import Button from '../components/Button'
import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs'
import { FormEvent, useState } from 'react'
import isValidEmail from '../lib/isValidEmail'
import { useRouter } from 'next/router'
import { dashboard } from '../lib/routes'
import { ApiError, User } from '@supabase/gotrue-js'
import Scrawl from '../components/icons/Scrawl'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await getUser(ctx)
  if (res.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignIn = ({
    user,
    error,
  }: {
    user: User | null
    error: ApiError | null
  }) => {
    if (user) {
      router.push(dashboard)
    } else if (error) {
      setError(`ERROR ${error.status} - ${error.message}`)
    }
  }

  const handleGoogleLogin = async () =>
    await supabaseClient.auth
      .signIn({
        provider: 'google',
      })
      .then(handleSignIn)

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()

    await supabaseClient.auth
      .signIn({
        email,
      })
      .then(handleSignIn)
  }

  return (
    <div className="flex flex-col justify-center py-12 min-h-full sm:px-6 lg:px-">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="flex flex-col gap-8 items-center mt-6 text-3xl text-center font-merriweather text-stone-900">
          <Scrawl size={48} />
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleMagicLink}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700 font-merriweather"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block px-3 py-2 w-full rounded-md border shadow-sm appearance-none placeholder-stone-400 border-stone-300 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center px-4 py-2 w-full text-sm font-medium text-white rounded-md border border-transparent shadow-sm bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 disabled:opacity-50"
                disabled={!(email && isValidEmail(email))}
              >
                Get a magic link
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="flex absolute inset-0 items-center">
                <div className="w-full border-t border-stone-300" />
              </div>
              <div className="flex relative justify-center text-sm">
                <span className="px-2 bg-white text-stone-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex items-center mt-6">
              <Button
                className="justify-center items-center w-full"
                onClick={() => handleGoogleLogin()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
              </Button>
            </div>

            {error && (
              <div className="flex items-center mt-6 text-red">{error}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
