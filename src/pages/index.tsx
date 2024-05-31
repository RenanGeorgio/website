import { useEffect, useRef  } from 'react';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { META_DESCRIPTION } from '@assets/constants';
import Page from '@components/page';
import ConfContent from '@components/index';
import Container from '@components/container';
import { Obj } from '@types';

interface Props {
  site?: Obj;
  page?: Obj;
  children?: React.ReactNode;
}

function Home(data: Props) {
  const { site, page } = data;
  const { query } = useRouter();

  const currentSite = useRef(site);
  const currentPage = useRef(page);

  const meta = {
    title: 'Demo - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };
  
  const ticketNumber = query.ticketNumber?.toString();
  
  const defaultUserData = {
    id: query.id?.toString(),
    ticketNumber: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString()
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (currentSite?.current == undefined) {
      currentSite.current = meta;
    }

    if (currentPage?.current == undefined) {
      currentPage.current = meta;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Page site={currentSite.current} page={currentPage.current}>
      <SkipNavContent />
      <Container>
        <ConfContent
          defaultUserData={defaultUserData}
          defaultPageState={'registration'}
        />
      </Container>
    </Page>
  );
}

export default Home