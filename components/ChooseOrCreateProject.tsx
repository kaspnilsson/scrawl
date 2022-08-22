import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useIsHydrated } from '../contexts/isHydrated'
import { Project } from '../interfaces/project'
import { fetcher } from '../lib/apiHelpers'
import CreateProjectModal from './CreateProjectModal'

interface Props {
  onSelectProject: (p?: Project) => void
  selectedProjectName?: string
}

const ChooseOrCreateProject = ({
  onSelectProject,
  selectedProjectName,
}: Props) => {
  const isHydrated = useIsHydrated()
  const { data, error } = useSWR<Project[]>('/api/projects', fetcher)
  const [showDialog, setShowDialog] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (isHydrated && !selectedProjectName) {
      // open the dropdown
      setShowMenu(true)
    }
  }, [isHydrated, selectedProjectName])

  const handleCreateProject = (p?: Project) => {
    setShowDialog(false)
    setShowMenu(!p)
    onSelectProject(p)
  }

  const dataLoading = data === undefined || !!error
  return (
    <>
      <div
        className={classNames('dropdown dropdown-hover', {
          'dropdown-open': showMenu,
        })}
      >
        <label
          tabIndex={0}
          className={classNames(
            'btn btn-sm normal-case flex items-center gap-2',
            {
              loading: dataLoading,
            }
          )}
          onClick={(e) => {
            e.stopPropagation()
            setShowMenu(!showMenu)
          }}
        >
          {selectedProjectName || 'Choose a project...'}
          <ChevronDownIcon className="w-4 h-4" />
        </label>
        <ul
          tabIndex={0}
          className="w-64 p-2 shadow dropdown-content menu bg-base-100 rounded-box menu-compact min-w-fit"
        >
          {(data || []).map((p) => (
            <li key={p.name}>
              <button
                onClick={() => {
                  setShowMenu(false)
                  onSelectProject(p)
                }}
              >
                {p.name}
              </button>
            </li>
          ))}
          {!!data && <div className="m-0 divider" />}
          <li>
            <button
              onClick={() => setShowDialog(true)}
              className="flex items-center gap-2 btn-accent text-accent-content"
            >
              <PlusIcon className="w-4 h-4" />
              New project
            </button>
          </li>
        </ul>
      </div>
      <CreateProjectModal isOpen={showDialog} close={handleCreateProject} />
    </>
  )
}

export default ChooseOrCreateProject
