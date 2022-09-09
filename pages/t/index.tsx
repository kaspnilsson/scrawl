import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import useSWR from 'swr'
import AccordionPanel from '../../components/AccordionPanel'
import Layout from '../../components/Layout'
import TaskTable from '../../components/TaskTable'
import { Task } from '../../interfaces/task'
import { deleteTask, fetcher, postTask } from '../../lib/apiHelpers'

export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    // Access the user object
    const res = await getUser(ctx)
    return { props: { email: res.user?.email || '' } }
  },
})

const NO_PROJECT_LABEL = 'No project'

const TasksIndex = () => {
  const { data, error, mutate } = useSWR<Task[]>('/api/tasks', fetcher)

  const updateTask = async (t: Task) => {
    await mutate(
      data?.map((task) => (task.id === t.id ? t : task)),
      false
    )
    await postTask(t.id, t)
  }

  const clearAllCompletedTasks = async () => {
    await mutate(
      data?.filter((t) => !t.checked),
      false
    )
    const promises = []
    for (const t of data || []) {
      if (t.checked) {
        promises.push(deleteTask(t.id))
      }
    }
    await Promise.all(promises)
  }

  const dataByProject: { [label: string]: Task[] } = { '': [] }

  for (const t of data || []) {
    if (!dataByProject[t.project_name]) dataByProject[t.project_name] = []
    dataByProject[t.project_name].push(t)
  }

  return (
    <Layout
      loading={data === undefined}
      error={error}
      noMaxWidth={true}
      headerContent={
        <div className="flex flex-wrap justify-between items-center md:pl-2">
          <h3 className="flex gap-2 items-center m-0 font-heading">Tasks</h3>
          <button
            className="flex gap-2 items-center btn btn-accent btn-sm"
            onClick={clearAllCompletedTasks}
          >
            Clear all completed
          </button>
        </div>
      }
    >
      <div className="m-auto prose prose-headings:!m-0 prose-headings:font-heading max-w-none">
        {Object.keys(dataByProject).map((name) => (
          <AccordionPanel
            key={name}
            defaultOpen
            title={<h3>{name || NO_PROJECT_LABEL}</h3>}
            className="!p-0 w-full"
          >
            <TaskTable data={dataByProject[name]} updateTask={updateTask} />
          </AccordionPanel>
        ))}
      </div>
    </Layout>
  )
}
export default TasksIndex
