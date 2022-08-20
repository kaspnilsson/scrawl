import useSWR from 'swr'
import { Project } from '../interfaces/project'
import { fetcher } from '../lib/apiHelpers'
import CreateProjectModal from './CreateProjectModal'

interface Props {
  onSelectProject: (p: Project) => void
  selectedProject?: Project
  isOpen: boolean
}

const ChooseOrCreateProject = ({
  onSelectProject,
  selectedProject,
  isOpen,
}: Props) => {
  const { data, error, mutate } = useSWR<Project[]>('/api/projects', fetcher)

  return (
    <>
      <CreateProjectModal isOpen={false} close={onSelectProject} />
    </>
  )
}

export default ChooseOrCreateProject
