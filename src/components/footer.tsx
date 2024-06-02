import React from 'react';
import cn from 'classnames';
import { Heading, VStack, HStack, Box, Container as Chakrainer, SimpleGrid, Stack } from '@chakra-ui/react';
import { COPYRIGHT_HOLDER, SITE_NAME, CODE_OF_CONDUCT, LEGAL_URL, TERMS_URL } from '@assets/constants';
import Newsletter from '@components/newsletter';
import { Menu } from '@components/menu';
import { Icon, IconCompany } from '@components/icons';
import { Obj } from '@types';
import { SiteParams } from '@interfaces';

import styles from './footer.module.css';
import { TextLink } from './common/TextLink';
import Container from './container';

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
          
          
          <Box w="full">
            <Chakrainer as={Stack} maxW='full' py={10}>
              <SimpleGrid columns={[1, 2, 4]} spacing={8} px={2}>
              <Stack spacing={6}>
                <VStack>
                  <HStack>
                    <IconCompany />
                    <Heading as="p" fontSize="lg">
                      DiamondBigger Supply Chain
                    </Heading>
                    <HostedByDiamondbigger /> 
                  </HStack>
                  
                  <VStack align={'flex-start'}>
                    <ListHeader>(27) 3325-7208</ListHeader>
                    <ListHeader>contato@ignai.com.br</ListHeader>              
                    <ListHeader>Rua Olympio R, 116 - Jabour</ListHeader>                
                    <ListHeader>Vitória - ES</ListHeader>
                  </VStack>
                </VStack>
            </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <TextLink href={'/pricing'} isExternal>
              Status
            </TextLink>
            <TextLink href={'/pricing'} isExternal>
              Documentation
            </TextLink>
            <TextLink href={'/pricing'} isExternal>
              Roadmap
            </TextLink>
            <TextLink href={'/pricing'}>Pricing</TextLink>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Community</ListHeader>
            <TextLink href={'/pricing'} isExternal>
              Discord
            </TextLink>
            <TextLink href={'/pricing'} isExternal>
              GitHub repository
            </TextLink>
            <TextLink href={'/pricing'} isExternal>
              Twitter
            </TextLink>
            <TextLink href={'/pricing'} isExternal>
              LinkedIn
            </TextLink>
            <TextLink href="/oss-friends">OSS Friends</TextLink>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <TextLink href="/about">About</TextLink>
            <TextLink href="mailto:support@typebot.io">Contact</TextLink>
            <TextLink href={'/terms-of-service'}>Terms of Service</TextLink>
            <TextLink href={'/privacy-policies'}>Privacy Policy</TextLink>
          </Stack>










                <div className={styles['footer-legal']}>
                  <div className={styles['footer-center-group']}>
                    {LEGAL_URL && (
                      <>
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
                  </div>
                </div>
                
                
                <div className={styles['footer-center-group']}>
                  <p className={styles['footer-paragraph']}>
                    <TextLink href="/about">Sobre</TextLink>
                  </p>
                  <div className={styles['footer-separator']} />
                  <p className={styles['footer-paragraph']}>
                    <TextLink href="mailto:contato@diamondbigger.com">Contatar</TextLink>
                  </p>
                </div>
                
                
                
              </SimpleGrid>
            </Chakrainer>
          </Box>
         
          <div className="footer--extras">
            <div className="footer--disclaimer">
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