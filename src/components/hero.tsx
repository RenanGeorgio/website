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
        Saiba como nos da
        <br className={styleUtils['show-on-desktop']} /> podemos lhe ajudar
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
        <p>{BRAND_NAME}</p>
        <div className={styles['description-separator']} />
        <p>
          <strong>Produto certo na hora certa</strong>
        </p>
      </div>
    </div>
  );
}