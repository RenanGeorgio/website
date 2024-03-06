import cx from 'classnames';

interface Props {
  isActive: boolean;
  onClick: () => void;
};

export const HeaderBackdrop = ({ isActive, onClick }: Props) => {
  return (
    <div
      className={cx('header--backdrop', {
        'is-active': isActive,
      })}
      onClick={onClick}
    />
  )
}