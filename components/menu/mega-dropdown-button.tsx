import cx from 'classnames';
import { useSiteContext, useToggleMegaNav } from '@lib/context';

interface Props {
  title: string;
  id: string | number;
};

const MegaDropdownButton = ({ title, id }: Props) => {
  const toggleMegaNav = useToggleMegaNav();
  const { meganav } = useSiteContext();

  const isActive = meganav.activeID === id;

  return (
    <button
      className={cx('mega-toggle', { 'is-open': isActive })}
      aria-expanded={isActive}
      aria-controls={`meganav-${id}`}
      // @ts-ignore
      onClick={() => toggleMegaNav(!isActive ? true : 'toggle', id)}
    >
      {title}
    </button>
  );
}

export default MegaDropdownButton;