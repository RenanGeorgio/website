import React from 'react';
import cn from 'classnames';
import { Heading, VStack, HStack, Box, Container as Chakrainer, SimpleGrid, Stack } from '@chakra-ui/react';
import { COPYRIGHT_HOLDER, SITE_NAME, CODE_OF_CONDUCT, LEGAL_URL, TERMS_URL, LINKEDING_PAGE, INSTAGRAM_PAGE, FACEBOOK_PAGE } from '@assets/constants';
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
                  <VStack align={'flex-start'}>
                    <HStack>
                      <IconCompany />
                      <Heading as="p" fontSize="sm">
                        DiamondBigger Supply Chain
                      </Heading>
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
                  <ListHeader>Veja:</ListHeader>
                  <TextLink href="/about">Sobre</TextLink>
                  <TextLink href="mailto:contato@diamondbigger.com">Contatar</TextLink>
                  <TextLink href={'/terms-of-service'}>Termos de Uso</TextLink>
                  <TextLink href={'/privacy-policies'}>Política de Privacidade</TextLink>
                  <TextLink href={CODE_OF_CONDUCT}>Codigo de Conduta</TextLink>
                </Stack>
            
                <Stack align={'flex-start'}>
                  <ListHeader>Redes sociais:</ListHeader>
                  <TextLink href={LINKEDING_PAGE} isExternal>
                    LinkedIn
                  </TextLink>
                  <TextLink href={INSTAGRAM_PAGE} isExternal>
                    Instagram
                  </TextLink>
                  <TextLink href={FACEBOOK_PAGE} isExternal>
                    Facebook
                  </TextLink> 
                </Stack>

                <Stack align={'flex-start'}>
                  <ListHeader>Uma empresa do Grupo Diamondbigger</ListHeader>
                  <Text>CNPJ: 37.828.054/0001-50</Text>
                </Stack>
     
              </SimpleGrid>
            </Chakrainer>
          </Box>
         
          <div className="footer--extras">
            <HostedByDiamondbigger /> 
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