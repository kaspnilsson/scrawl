interface Props {
  error: Error
}

const ErrorView = ({ error }: Props) => (
  <div className="flex p-16 m-auto">{JSON.stringify(error)}</div>
)

export default ErrorView
