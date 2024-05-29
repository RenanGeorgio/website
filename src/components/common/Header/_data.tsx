import * as React from 'react';
import { GithubIcon } from '@assets/icons';
import { DocIcon, MapIcon, PeopleCircleIcon } from '@components/icons';

export const links = [
  {
    label: 'Resources',
    children: [
      {
        label: 'GitHub repository',
        description: 'Check out the entire source code of the project',
        href: 'https://github.com/baptisteArno/typebot.io',
        icon: <GithubIcon fill="blue.300" />,
      },
      {
        label: 'Documentation',
        description:
          "Everything you need to know about how to use Typebot's builder",
        href: 'https://docs.typebot.io',
        icon: <DocIcon />,
      },
      {
        label: 'Roadmap',
        description:
          "Follow the development and make suggestions for which features you'd like to see",
        href: 'https://feedback.typebot.io/roadmap',
        icon: <MapIcon />,
      },
      {
        label: 'Community',
        description:
          'Join the Discord server and learn about chatbots best practices and get help from the community',
        href: '/discord',
        icon: <PeopleCircleIcon />,
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]