import { useState } from 'react';
import { PageState, ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import ConfContainer from './conf-container';
import Hero from './hero';
import Form from './form';
import LearnMore from './learn-more';
import { Integrations } from './integrations';

import 'video.js/dist/video-js.css';

type Props = {
  defaultUserData: UserData;
  sharePage?: boolean;
  defaultPageState?: PageState;
};

export default function Conf({
  defaultUserData,
  sharePage,
  defaultPageState = 'registration'
}: Props) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [pageState, setPageState] = useState<PageState>(defaultPageState);

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
        setPageState
      }}
    >
      <ConfContainer>
        <>
          <Hero />
          {/*<Form />
          <LearnMore />*/}
          <Integrations />
        </>
      </ConfContainer>
    </ConfDataContext.Provider>
  );
}