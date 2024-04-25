import React from 'react';
import { Broadcast } from 'phosphor-react';
import { getModuleName } from '../../lib/helpers';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Reusable Section',
  name: 'section',
  type: 'document',
  // eslint-disable-next-line react/display-name
  icon: () => <Broadcast />,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        'Provide a name to reference this section. For internal use only.',
      validation: Rule => Rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        { type: 'grid' },
        { type: 'hero' },
        { type: 'marquee' },
        { type: 'dividerPhoto' }
      ],
      validation: Rule =>
        Rule.length(1).error('You can only have one piece of content')
    }
  ],
  preview: {
    select: {
      name: 'name',
      content: 'content.0'
    },
    prepare({ name, content }) {
      return {
        title: name,
        subtitle: getModuleName(content._type)
      }
    }
  }
}
