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

interface Option {
  label: string
  callback: () => void
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
    callback: () => onSelectProject(p),
  }))

  const createOption = {
    label: '+ Create a new project',
    callback: () => setShowDialog(true),
  }

  return (
    <>
      <ComboboxComponent<Option>
        loading={dataLoading}
        onChange={(o) => o?.callback()}
        options={[...dataOptions, createOption]}
        renderOption={(o) => o?.label}
        autoFocus
        placeholder="Choose a project..."
      ></ComboboxComponent>
      <CreateProjectModal isOpen={showDialog} close={handleCreateProject} />
    </>
  )
}

export default ChooseOrCreateProject
