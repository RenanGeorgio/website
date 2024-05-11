import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TalkCard from './talk-card';
import { SHORT_DATE } from '@assets/constants';
import { Stage } from '@types';

import styles from './schedule-sidebar.module.css';

type Props = {
  allStages: Stage[];
};

export default function ScheduleSidebar({ allStages }: Props) {
  const router = useRouter();
  const [currentStageSlug, setCurrentStageSlug] = useState(router.query.slug);
  const currentStage = allStages.find((s: Stage) => s.slug === currentStageSlug);

  useEffect(() => {
    setCurrentStageSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className={styles.schedule}>
      <h3 className={styles.header}>Schedule</h3>
      <p>{SHORT_DATE}</p>

      <div className={styles.talks}>
        {currentStage?.schedule.map(talk => (
          <TalkCard key={talk.title} talk={talk} showTime />
        ))}
      </div>
    </div>
  );
}