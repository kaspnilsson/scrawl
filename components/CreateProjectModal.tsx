import { JSONContent } from '@tiptap/core'
import classNames from 'classnames'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Project, ProjectState } from '../interfaces/project'
import { postProject } from '../lib/apiHelpers'
import Modal from './Modal'
import SimpleEditorComponent from './SimpleEditor'

interface Props {
  isOpen: boolean
  close: (newProject?: Project) => void
  projects?: Project[]
}

export const VALID_PROJECT_NAME_REGEX = /[\w-]+/

const CreateProjectModal = ({ isOpen, close, projects = [] }: Props) => {
  const [loading, setLoading] = useState(false)
  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault()
    if (!name) return
    setLoading(true)
    const now = new Date()
    try {
      const res = await postProject(name, {
        name,
        description,
        state: ProjectState.BACKLOG,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      setName('')
      setDescription(undefined)
      close((await res.json()) as unknown as Project)
    } catch (e: unknown) {
    } finally {
      setLoading(false)
    }
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState<JSONContent | undefined>()

  const nameIsNonUnique = name && projects.find((p) => p.name === name)
  const nameIsWrongFormat = name && !VALID_PROJECT_NAME_REGEX.test(name)
  const nameIsValid = !!name && !nameIsWrongFormat && !nameIsNonUnique

  // const cancel = () => {
  //   setName('')
  //   close()
  // }

  const ref = useRef<HTMLInputElement>(null)

  // Autofocus on title
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus()
    }
  }, [isOpen, ref])

  // Reset state on open
  useEffect(() => {
    if (!isOpen) return
    setName('')
    setDescription(undefined)
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} close={close} title="Create project">
      <form onSubmit={handleCreateProject} className="mt-4">
        <>
          <div className="w-full prose form-control prose-stone">
            <input
              autoFocus
              ref={ref}
              type="text"
              placeholder="Add project name"
              className={classNames(
                'w-full input input-ghost text-base text-inherit border-none focus:ring-0 focus:shadow-none focus:outline-none p-0 transition-none h-fit',
                {
                  'input-error': nameIsNonUnique,
                }
              )}
              value={name}
              onChange={(e) =>
                setName(
                  e.currentTarget.value
                    .replaceAll(/\s/g, '-')
                    .toLocaleLowerCase()
                )
              }
            />
          </div>
          {nameIsNonUnique ||
            (nameIsWrongFormat && (
              <label className="px-0 label">
                {nameIsNonUnique && (
                  <span className="label-text-alt text-error">
                    Project name must be unique!
                  </span>
                )}
                {nameIsWrongFormat && (
                  <span className="label-text-alt text-error">
                    Project name can only contain letters, numbers, _, and -!
                  </span>
                )}
              </label>
            ))}
          <div className="w-full form-control">
            <SimpleEditorComponent
              onUpdate={setDescription}
              content={''}
              className=""
              placeholder="Add project description (optional)"
            />
          </div>
          <div className="modal-action">
            {/* <button className="btn btn-ghost" onClick={cancel} disabled={loading}>
            Cancel
          </button> */}
            <button
              className={classNames('btn', { loading: loading })}
              type="submit"
              disabled={!nameIsValid || loading}
            >
              Save project
            </button>
          </div>
        </>
      </form>
    </Modal>
  )
}

export default CreateProjectModal
