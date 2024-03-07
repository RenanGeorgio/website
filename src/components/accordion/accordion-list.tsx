import { useState } from 'react';
import Accordion from './accordion';
import { BlockContent } from '@components/block';
import { AccordionsProps } from '@typograph/types/queries';

const AccordionList: React.FC<any> = (data: AccordionsProps) => {
  const { items } = data;

  const [activeAccordion, setActiveAccordion] = useState<number | undefined>(undefined);

  const onToggle = (id?: number | string, status?: boolean) => {
    // @ts-ignore
    setActiveAccordion(status ? id : null);
  }

  return (
    <div className="accordion-group">
      {items.map((accordion, key) => {
        return (
          <Accordion
            key={key}
            id={accordion.id}
            isOpen={accordion.id === activeAccordion}
            onToggle={onToggle}
            title={accordion?.title}
          >
            <BlockContent blocks={accordion?.content} />
          </Accordion>
        )
      })}
    </div>
  );
}

export default AccordionList;