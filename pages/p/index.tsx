import { PlusIcon, ViewBoardsIcon, TableIcon } from '@heroicons/react/solid'
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import { Project, ProjectState } from '../../interfaces/project'
import { fetcher, postProject } from '../../lib/apiHelpers'
import CreateProjectModal from '../../components/CreateProjectModal'
import { routes } from '../../lib/routes'
import KanbanBoard, { BoardSection } from '../../components/Board/Board'
import { BoardCard } from '../../components/Board/Card'
import Tabs from '../../components/Tabs'
import ProjectTable from '../../components/ProjectTable'
import ProjectStateChip from '../../components/ProjectStateChip'

const TABS_LOCAL_STORAGE_KEY = 'allProjectsViewTabSelection'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

// Sections for the KanbanBoard, in sorted order.
const SECTIONS: BoardSection[] = [
  {
    id: ProjectState.BACKLOG,
    title: <ProjectStateChip state={ProjectState.BACKLOG} />,
  },
  {
    id: ProjectState.IN_PROGRESS,
    title: <ProjectStateChip state={ProjectState.IN_PROGRESS} />,
  },
  {
    id: ProjectState.COMPLETED,
    title: <ProjectStateChip state={ProjectState.COMPLETED} />,
  },
  {
    id: ProjectState.ARCHIVED,
    title: <ProjectStateChip state={ProjectState.ARCHIVED} />,
  },
]

const ProjectsIndex = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [cards, setCards] = useState<BoardCard<Project>[]>([])
  const [initialProjectState, setInitialProjectState] = useState<
    Partial<Project>
  >({})
  const open = () => setShowDialog(true)
  const close = async (project?: Project) => {
    if (project) await mutate([...(data || []), project])
    setShowDialog(false)
  }

  const { data, error, mutate } = useSWR<Project[]>('/api/projects', fetcher)

  useEffect(() => {
    setCards(
      (data || []).map((p) => ({
        title: p.name,
        href: routes.project(p.name),
        sectionId: p.state,
        id: p.name,
        data: p,
        sortBy: new Date(p.updated_at).getTime(),
      }))
    )
  }, [data, mutate])

  const handleCardUpdate = async (card: BoardCard<Project>) => {
    const newProject = {
      ...card.data,
      state: card.sectionId as ProjectState,
    } as Project
    await mutate(
      data?.map((p) => (p.name === newProject.name ? newProject : p))
    )
    await postProject(card.id, newProject)
    setInitialProjectState({})
  }

  const handleAddCard = async (sectionId: string) => {
    setInitialProjectState({ state: sectionId as ProjectState })
    setShowDialog(true)
  }

  return (
    <Layout
      loading={data === undefined}
      error={error}
      noMaxWidth={true}
      headerContent={
        <div className="flex flex-wrap items-center justify-between sm:pl-2">
          <h3 className="flex items-center gap-2 m-0 font-heading">Projects</h3>
          <button
            className="flex items-center gap-2 btn btn-accent btn-sm"
            onClick={open}
          >
            <PlusIcon className="w-4 h-4" />
            Create a project
          </button>
        </div>
      }
    >
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading max-w-none prose-sm sm:prose-md">
        <Tabs
          tabs={[
            { name: 'Board', icon: <ViewBoardsIcon className="w-5 h-5" /> },
            { name: 'Table', icon: <TableIcon className="w-5 h-5" /> },
          ]}
          defaultTabName={'Board'}
          tabChildren={{
            Board: (
              <KanbanBoard
                sections={SECTIONS}
                cards={cards}
                onChange={handleCardUpdate}
                handleAdd={handleAddCard}
              />
            ),
            Table: <ProjectTable data={data || []} />,
          }}
          localStorageKey={TABS_LOCAL_STORAGE_KEY}
        />
      </div>
      <CreateProjectModal
        isOpen={showDialog}
        close={close}
        projects={data || []}
        initialProjectState={initialProjectState}
      />
    </Layout>
  )
}
export default ProjectsIndex
