import React from 'react';
import cn from 'classnames';
import { Heading, Stack } from '@chakra-ui/react';
import { COPYRIGHT_HOLDER, SITE_NAME, CODE_OF_CONDUCT, LEGAL_URL, TERMS_URL } from '@assets/constants';
import Newsletter from '@components/newsletter';
import ThemeSwitch from '@components/theme-switch';
import { Menu } from '@components/menu';
import { Icon, IconCompany, PlatformLogo } from '@components/icons';
import Container from './container';
import { Obj } from '@types';
import { SiteParams } from '@interfaces';

import styles from './footer.module.css';
import { TextLink } from './common/TextLink';

const footerObj: SiteParams["footer"] = {
  blocks: [] as Obj[]
}

export function HostedByDiamondbigger() {
  return (
    <a
      href="https://www.diamondbigger.com"
      className={cn(styles['footer-link'], styles['footer-logo'])}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles['secondary-text']}>Criado por </div>
      <IconCompany />
      <p>
        DiamondBigger Supply Chain
      </p>
    </a>
  );
}

const Footer: React.FC<any> = (data: typeof footerObj): JSX.Element => {
  const { blocks } = data; 

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200" role="contentinfo">
      <div className="footer--grid">
        <Container>
          {blocks?.map((block, key) => (
            <div key={key} className="footer--block">
              {block.title && <p className="is-h3">{block.title}</p>}

              {block.menu?.items && (
                <Menu items={block.menu.items} className="menu-footer" />
              )}

              {block.newsletter && <Newsletter data={block.newsletter} />}

              {block.social && (
                <div className="menu-social">
                  {block.social?.map((link: Obj, key: string | number) => {
                    return (
                      <a
                        key={key}
                        href={link?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name={link?.icon} />
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
          <div className={styles['footer-legal']}>
            <div className={styles['footer-center-group']}>
            
              <p className={styles['footer-paragraph']}>
                <a
                  href={CODE_OF_CONDUCT}
                  className={styles['footer-link']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Codigo de Conduta
                </a>
              </p>
              {LEGAL_URL && (
                <>
                  <div className={styles['footer-separator']} />
                  <p className={styles['footer-paragraph']}>
                    <a
                      href={LEGAL_URL}
                      className={styles['footer-link']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Politica de Privacidade
                    </a>
                  </p>
                </>
              )}
              {TERMS_URL && (
                <>
                  <div className={styles['footer-separator']} />
                  <p className={styles['footer-paragraph']}>
                    <a
                      href={TERMS_URL}
                      className={styles['footer-link']}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Termos de Serviço
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="footer--extras">
            <div className={styles['footer-center-group']}>
              <p className={styles['footer-paragraph']}>
                <a>
                  <TextLink href="/about">Sobre</TextLink>
                </a>
              </p>
              <div className={styles['footer-separator']} />
              <p className={styles['footer-paragraph']}>
                <a>
                  <TextLink href="mailto:contato@diamondbigger.com">Contatar</TextLink>
                </a>
              </p>
            </div>
            <div className="footer--disclaimer">
              <div className={styles['footer-hostedby']}>
                <HostedByDiamondbigger />
                <div className={styles['footer-separator']} />
              </div>
              <div className={styles['footer-copyright']}>
                Copyright © {`${new Date().getFullYear()} `} {COPYRIGHT_HOLDER || `${SITE_NAME}.`} All
                rights reserved.
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Heading>
  );
}

export default Footer;