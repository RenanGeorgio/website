import cn from 'classnames';
import Player from './player/player';
import PlayerCSS from './player/player-css';
import { BRAND_NAME, DATE, SITE_DESCRIPTION } from '@assets/constants';

import styleUtils from './utils.module.css';
import styles from './hero.module.css';

export default function Hero() {
  const videoJsOptions = {
    techOrder: ["youtube"],
    autoplay: false,
    controls: true,
    sources: [
      {
        src: "https://www.youtube.com/watch?v=IxQB14xVas0",
        type: "video/youtube",
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-mobile'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <h1 className={cn(styleUtils.appear, styleUtils['appear-third'], styles.hero)}>
        Welcome to the
        <br className={styleUtils['show-on-desktop']} /> {BRAND_NAME} conference
      </h1>
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styleUtils['show-on-tablet'],
          styles.description
        )}
      >
        {SITE_DESCRIPTION}
      </h2>
      <div className={cn(styleUtils.appear, styleUtils['appear-fourth'], styles.info)}>
        {/*<Player {...videoJsOptions} />
        <PlayerCSS />*/}
        <p>{DATE}</p>
        <div className={styles['description-separator']} />
        <p>
          <strong>Online</strong>
        </p>
      </div>
    </div>
  );
}