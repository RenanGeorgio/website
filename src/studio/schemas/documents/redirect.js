import React from 'react'
import { Shuffle } from 'phosphor-react'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Redirect',
  name: 'redirect',
  type: 'document',
  // eslint-disable-next-line react/display-name
  icon: () => <Shuffle />,
  fields: [
    {
      title: 'From (slug)',
      name: 'from',
      type: 'string',
      description: (
        <>
          Do not include the full domain or leading slash. For example:{' '}
          <code>old-page</code>
        </>
      )
    },
    {
      title: 'To (slug)',
      name: 'to',
      type: 'string',
      description: (
        <>
          Do not include the full domain or leading slash. For example:{' '}
          <code>new-page</code>
        </>
      )
    },
    {
      title: 'Is this a permanent redirect (301)?',
      name: 'isPermanent',
      type: 'boolean'
    }
  ],
  initialValue: {
    isPermanent: true
  },
  preview: {
    select: {
      to: 'to',
      from: 'from',
      isPermanent: 'isPermanent'
    },
    prepare({ from, to, isPermanent }) {
      return {
        title: from && to ? `(${from}) → (${to})` : 'New Redirect',
        subtitle: isPermanent ? '301' : '302'
      }
    }
  }
}
