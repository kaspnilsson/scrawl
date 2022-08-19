import { Content } from '@tiptap/core'
import classNames from 'classnames'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Project, ProjectState } from '../interfaces/project'
import { postProject } from '../lib/apiHelpers'
import Modal from './Modal'
import SimpleEditorComponent from './SimpleEditor'

interface Props {
  isOpen: boolean
  close: (shouldFetch?: boolean) => void
  projects?: Project[]
}

export const VALID_PROJECT_NAME_REGEX = /[\w-]+/

const CreateProjectModal = ({ isOpen, close, projects = [] }: Props) => {
  const [loading, setLoading] = useState(false)
  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const now = new Date()
    try {
      await postProject(name, {
        name,
        description,
        state: ProjectState.OPEN,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      setName('')
      setDescription('')
      close(true)
    } catch (e: unknown) {
    } finally {
      setLoading(false)
    }
  }

  const [name, setName] = useState('')
  const [description, setDescription] = useState<Content>('')

  const nameIsNonUnique = name && projects.find((p) => p.name === name)
  const nameIsWrongFormat = name && !VALID_PROJECT_NAME_REGEX.test(name)
  const nameIsValid = !!name && !nameIsWrongFormat && !nameIsNonUnique

  const cancel = () => {
    setName('')
    close()
  }

  const ref = useRef<HTMLInputElement>(null)

  // Autofocus on title
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus()
    }
  }, [isOpen, ref])

  return (
    <Modal isOpen={isOpen} close={close} title="Create project">
      <form onSubmit={handleCreateProject}>
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text font-heading">Name</span>
          </label>
          <input
            autoFocus
            ref={ref}
            type="text"
            placeholder="Add project name"
            className={classNames('w-full input input-bordered', {
              'input-error': nameIsNonUnique,
            })}
            value={name}
            onChange={(e) =>
              setName(e.currentTarget.value.replaceAll(/\s/g, '-'))
            }
          />
        </div>
        {!nameIsValid && (
          <label className="label">
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
        )}
        <div className="w-full form-control">
          <label className="label">
            <span className="label-text font-heading">Description</span>
          </label>
          <SimpleEditorComponent onUpdate={setDescription} content={''} />
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={cancel} disabled={loading}>
            Cancel
          </button>
          <button
            className={classNames('btn', { loading: loading })}
            type="submit"
            disabled={!nameIsValid || !description || loading}
          >
            Save project
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateProjectModal
