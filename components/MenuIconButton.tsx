import classNames from 'classnames'

interface Props {
  onClick: () => void
  icon: React.ReactNode
  label: string
  isActive?: boolean
  disabled?: boolean
}

const MenuIconButton = ({
  onClick,
  icon,
  label,
  isActive,
  disabled,
}: Props) => {
  return (
    <div className="tooltip" data-tip={label}>
      <button
        disabled={disabled}
        className={classNames('btn !btn-square btn-ghost', {
          'text-accent': isActive,
          'btn-disabled': disabled,
        })}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  )
}

export default MenuIconButton
