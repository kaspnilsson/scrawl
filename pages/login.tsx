import { getUser, supabaseClient } from '@supabase/auth-helpers-nextjs'
import { FormEvent, useState } from 'react'
import isValidEmail from '../lib/isValidEmail'
import { ApiError } from '@supabase/gotrue-js'
import Scrawl from '../components/icons/Scrawl'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PUBLIC_BASE_URL, routes } from '../lib/routes'
import classNames from 'classnames'
import toast from 'react-hot-toast'

const makeRedirectUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_APP_URL || PUBLIC_BASE_URL}${path}`

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const res = await getUser(ctx)
  if (res.user) {
    return {
      redirect: {
        destination: makeRedirectUrl(routes.today),
        permanent: false,
      },
    }
  }

  return { props: {} }
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSignIn = ({ error }: { error: ApiError | null }) => {
    if (error) {
      setError(`ERROR ${error.status} - ${error.message}`)
    }
    setLoading(false)
    return error
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    return await supabaseClient.auth
      .signIn(
        {
          provider: 'google',
        },
        { redirectTo: makeRedirectUrl(routes.today) }
      )
      .then(handleSignIn)
  }

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await supabaseClient.auth
      .signIn(
        {
          email,
        },
        { redirectTo: makeRedirectUrl(routes.today) }
      )
      .then(handleSignIn)
      .then((error) => {
        if (!error) {
          toast.success('Check your email for a magic link!')
        }
      })
  }

  return (
    <div className="flex flex-col justify-center py-12 min-h-full sm:px-6 lg:px-12 bg-base-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="flex flex-col gap-8 items-center mt-6 text-3xl text-center font-heading">
          <Scrawl size={48} />
          Sign in to your account
        </h2>
      </div>

      <div className="px-4 py-8 mt-8 sm:shadow-lg shadow-base-content/10 sm:rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md sm:bg-base-200">
        <form className="space-y-6" onSubmit={handleMagicLink}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium font-heading"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                disabled={loading}
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full input input-bordered"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={classNames(
                'flex justify-center px-4 py-2 w-full btn',
                { loading: loading }
              )}
              disabled={!(email && isValidEmail(email)) || loading}
            >
              Get a magic link
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="divider">Or continue with</div>

          <div className="flex items-center mt-6">
            <button
              className={classNames('justify-center items-center w-full btn', {
                loading: loading,
              })}
              disabled={loading}
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
            </button>
          </div>

          {error && (
            <div className="flex items-center p-4 mt-6 rounded-md bg-error text-error-content">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
