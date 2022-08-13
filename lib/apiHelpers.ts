export const handleFetchErrors = async (res: Response) => {
  if (!res.ok)
    throw Error(`${res.statusText || res.status}: ${await res.text()}`)
  return res
}

export const logoutServerside = async () =>
  fetch('/api/auth/logout').then(handleFetchErrors)
