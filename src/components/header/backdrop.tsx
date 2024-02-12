import cx from 'classnames';

export const HeaderBackdrop = ({ isActive, onClick }) => {
  return (
    <div
      className={cx('header--backdrop', {
        'is-active': isActive,
      })}
      onClick={onClick}
    />
  )
}