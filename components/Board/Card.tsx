import Link from '../Link'

export interface BoardCard<T> {
  title: string
  href?: string
  id: string
  sectionId: string // enum
  data?: T
  sortBy?: number // bigger => higher
}

const Card = <T extends object>({ title, href }: BoardCard<T>) => (
  <div className="p-2 text-sm rounded-lg shadow-lg bg-base-100">
    {!!href && <Link href={href}>{title}</Link>}
    {!href && <div className="">{title}</div>}
  </div>
)

export default Card