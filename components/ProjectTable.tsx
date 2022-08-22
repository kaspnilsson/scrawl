import moment from 'moment'
import Link from 'next/link'
import { Project } from '../interfaces/project'
import { makeNoteKeyFromMoment } from '../lib/apiHelpers'
import { routes } from '../lib/routes'
import ProjectStateChip from './ProjectStateChip'

interface Props {
  data: Project[]
}

const ProjectTable = ({ data }: Props) => (
  <div className="flex items-center mt-4 w-full not-prose">
    <div className="overflow-hidden w-full md:rounded-lg">
      <table
        className="table min-w-full text-sm border-separate"
        style={{ borderSpacing: 0 }}
      >
        <thead className="text-sm bg-base-200">
          <tr>
            <th scope="col" className="sticky top-0 z-10 text-left">
              Name
            </th>
            <th scope="col" className="font-semibold text-left">
              Created
            </th>
            <th scope="col" className="font-semibold text-left">
              Updated
            </th>
            <th scope="col" className="font-semibold text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {(data || [])
            .sort(
              (a: Project, b: Project) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
            )
            .map((d, index) => (
              <tr className="hover" key={index}>
                <Link passHref href={routes.project(d.name)}>
                  <td className="whitespace-nowrap link">{d.name}</td>
                </Link>
                <td className="whitespace-nowrap">
                  {d.created_at
                    ? makeNoteKeyFromMoment(moment(d.created_at))
                    : 'Unknown'}
                </td>
                <td className="whitespace-nowrap">
                  {d.updated_at ? moment(d.updated_at).fromNow() : 'Unknown'}
                </td>
                <td className="whitespace-nowrap">
                  <ProjectStateChip state={d.state} />
                </td>
              </tr>
            ))}
          {!data?.length && (
            <tr className="placeholder">
              <td>No projects!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default ProjectTable
