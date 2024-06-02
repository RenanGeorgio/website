import React from 'react';
import { Stack, Text, Flex, Heading, List, ListItem } from '@chakra-ui/react';
import Page from '@components/page';
import { META_DESCRIPTION } from '@assets/constants';

export default function AboutPage() {
  const meta = {
    title: 'Sobre - Saiba mais sobre a Diamondbigger',
    description: META_DESCRIPTION
  };
  
  return (
    <Page meta={meta}>
      <div className="flex flex-col items-center w-full overflow-x-hidden ">
        <Stack
          spacing={10}
          mx="auto"
          maxW="3xl"
          my="20"
          fontSize="17px"
          textAlign="justify"
        >
          <Flex w="full">
            <Heading as="h1">Sobre a DiamondBigger:</Heading>
          </Flex>
          <Text>
            Bem-vindo à DiamondBigger Supply Chain, sua parceira de confiança 
            em otimização logística e gestão da cadeia de suprimentos. Somos 
            especialistas em transformar operações logísticas complexas em sistemas 
            eficientes e ágeis, utilizando a mais avançada tecnologia de inteligência 
            artificial.
          </Text>
          <Text>
            Em um mundo onde a rapidez e a precisão são essenciais, nossa missão é 
            capacitar empresas a alcançarem excelência operacional e competitividade 
            no mercado. Com uma equipe de especialistas altamente qualificados e uma 
            abordagem inovadora, desenvolvemos soluções personalizadas que atendem às 
            necessidades específicas de cada cliente.{''}
          </Text>
          <Text>Nossa Abordagem:</Text>
          <Text>
            Utilizamos inteligência artificial e machine learning para analisar vastas 
            quantidades de dados e identificar padrões que otimizam todas as etapas da 
            cadeia de suprimentos. Nossos serviços abrangem:
          </Text>
          <List listStyleType="initial">
            <ListItem>
              Gestão de Inventário: 
              Monitoramento em tempo real para manter níveis de estoque ideais, reduzindo custos e evitando rupturas.
            </ListItem>
            <ListItem>
              Previsão de Demanda: 
              Modelos preditivos avançados que ajudam a planejar com precisão as necessidades futuras, minimizando desperdícios.
            </ListItem>
            <ListItem>
              Otimização de Transporte: 
              Roteirização inteligente que reduz tempos de entrega e custos operacionais, melhorando a eficiência do transporte.
            </ListItem>
            <ListItem>
              Automação de Armazéns: 
              Implementação de sistemas automatizados para as atividades de put-away e picking, aumentando a produtividade e a precisão.
            </ListItem>
          </List>
          <Text>
            Por que Escolher a DiamondBigger?
          </Text>
          <List listStyleType="initial">
            <ListItem>
              Tecnologia de Ponta: 
              Integramos as mais recentes inovações em IA e big data para oferecer soluções de alta performance.
            </ListItem>
            <ListItem>
              Experiência e Conhecimento: 
              Nossa equipe é composta por profissionais com vasta experiência em logística e supply chain, prontos para enfrentar qualquer desafio.
            </ListItem>
            <ListItem>
              Soluções Personalizadas: 
              Entendemos que cada negócio é único. Por isso, adaptamos nossas soluções para atender às suas necessidades específicas.
            </ListItem>
            <ListItem>
              Resultados Comprovados: 
              Ajudamos empresas de diversos setores a reduzir custos, aumentar a eficiência e melhorar a satisfação dos clientes.
            </ListItem>
          </List>
          <Text>Compromisso com a Excelência</Text>
          <Text>
            Na DiamondBigger, nosso compromisso é entregar resultados tangíveis que impulsionem o 
            sucesso dos nossos clientes. Estamos constantemente inovando e aprimorando nossas soluções 
            para manter nossa posição na vanguarda da tecnologia logística.
          </Text>
          <Text>
            Explore nosso site para saber mais sobre como podemos transformar sua operação logística e 
            proporcionar uma vantagem competitiva duradoura. Entre em contato conosco hoje mesmo para 
            descobrir como podemos ajudar sua empresa a alcançar novos patamares de eficiência e sucesso.{''}
          </Text>
          <Text>
            DiamondBigger Supply Chain – A revolução da logística e supply chain começa aqui.
          </Text>
        </Stack>
      </div>
    </Page>
  );
}