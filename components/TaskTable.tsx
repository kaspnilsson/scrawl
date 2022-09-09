import classNames from 'classnames'
import { Task } from '../interfaces/task'
import TaskItemRenderer from './TaskItemRenderer'

interface Props {
  data: Task[]
  updateTask: (t: Task) => void
}

const taskSort = (a: Task, b: Task) => {
  // Checked in the back, then sort by created date
  if (a.checked && !b.checked) return 1
  if (b.checked && !a.checked) return -1
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
}

const TaskTable = ({ data, updateTask }: Props) => {
  return (
    <div className="">
      {data.sort(taskSort).map((t, index) => (
        <div
          key={index}
          className="flex gap-2 items-center mb-2 transition-all"
        >
          <label
            className={classNames('justify-start cursor-pointer label !p-0', {
              'opacity-60': t.checked,
            })}
          >
            <button
              className={classNames(
                'checkbox checkbox-accent mr-3 checkbox-sm border-2 hover:bg-accent',
                { 'checked-checkbox': t.checked }
              )}
              onClick={() =>
                updateTask({
                  ...t,
                  checked: !t.checked,
                  updated_at: new Date().toISOString(),
                })
              }
            />
            <TaskItemRenderer
              content={{ type: 'doc', content: t.content }}
              className={classNames({ 'line-through': t.checked })}
            />
          </label>
          <div className="">
            <button></button>
            <button></button>
          </div>
        </div>
      ))}
      {!data?.length && 'No tasks yet!'}
    </div>
  )
}

export default TaskTable
