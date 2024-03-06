import cx from 'classnames';

interface Props {
  avatar?: any;
  label: string;
  icon: any;
  title: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

const Chip = ({ 
  avatar,
  label,
  icon,
  title,
  onClick = () => {},
  className,
  children,
}: Props) => {
  if (!children) return null

  const handleClick = () => {
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      title={title}
      className={cx('chip', className)}
    >
      {avatar && <span className="chip--avatar">{icon}</span>}
      <span className="chip--label">{children}</span>
      {icon && <span className="chip--icon">{icon}</span>}
    </button>
  );
}

export default Chip;