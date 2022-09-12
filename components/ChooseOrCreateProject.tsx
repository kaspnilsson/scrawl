import { useState } from 'react'
import useSWR from 'swr'
import { Project } from '../interfaces/project'
import { fetcher } from '../lib/apiHelpers'
import ComboboxComponent from './Combobox'
import CreateProjectModal from './CreateProjectModal'

interface Props {
  onSelectProject: (p?: Project) => void
  selectedProjectName?: string
}

const ChooseOrCreateProject = ({ onSelectProject }: Props) => {
  const { data, error } = useSWR<Project[]>('/api/projects', fetcher)
  const [showDialog, setShowDialog] = useState(false)

  const handleCreateProject = (p?: Project) => {
    setShowDialog(false)
    onSelectProject(p)
  }

  const dataLoading = data === undefined || !!error

  const dataOptions = (data || []).map((p) => ({
    label: p.name,
    renderLabel: p.name,
    value: () => onSelectProject(p),
  }))

  const createOption = {
    label: '+ Create a new project',
    renderLabel: '+ Create a new project',
    value: () => setShowDialog(true),
    disableFiltering: true,
  }

  return (
    <>
      <ComboboxComponent<() => void>
        loading={dataLoading}
        onChange={(o) => {
          if (o) o()
        }}
        options={[...dataOptions, createOption]}
        autoFocus
        placeholder="Choose a project..."
      ></ComboboxComponent>
      <CreateProjectModal isOpen={showDialog} close={handleCreateProject} />
    </>
  )
}

export default ChooseOrCreateProject
