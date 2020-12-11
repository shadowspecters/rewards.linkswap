import React from 'react';
import { find } from 'lodash';

import { ReactComponent as IconQuestion } from '@icon/question.svg';
import { ReactComponent as IconCheck } from '@icon/check.svg';
import { ReactComponent as IconWrong } from '@icon/wrong.svg';
import { ReactComponent as IconSpinner } from '@icon/spinner.svg';

const statusMappings = [
  {
    options: ['success', 'ok', 'connected'],
    color: 'var(--color-status-success, green)',
    contrastColor: 'var(--color-light, black)',
    icon: <IconCheck />,
  },
  {
    options: ['concern', 'warning', 'warn', 'connecting', 'processing'],
    color: 'rgba(238, 203, 112, 0.3)',
    contrastColor: '#EECB70',
    icon: <IconCheck />,
  },
  {
    options: ['failure', 'error'],
    color: 'var(--color-status-failure, red)',
    contrastColor: 'var(--color-status-dark, black)',
    icon: <IconWrong />,
  },
  {
    options: ['disconnected'],
    color: 'var(--color-grey-100, grey)',
    contrastColor: 'var(--color-status-dark, black)',
    icon: <IconWrong />,
  },
  {
    options: ['initialized', 'loading', 'disconnected'],
    color: 'var(--color-grey-100, grey)',
    contrastColor: 'var(--color-status-dark, black)',
    icon: <IconSpinner />,
  },
  {
    options: ['gradient'],
    color: 'var(--color-gradient-purp)',
    contrastColor: 'var(--color-status-light, white)',
    icon: null,
  },
  {
    options: ['neutral', 'default'],
    color: 'var(--color-status-neutral, lightblue)',
    contrastColor: 'var(--color-status-light, white)',
    icon: <IconQuestion />,
  },
];

/*
	status options for styled components
	pass in property & status to return the status color

	eg: ${({status}) => statusColor('color', status)}
*/
export const statusColor = (property = 'color', status) => {
  const mapping = find(statusMappings, ({ options }) => options.includes(status?.toLowerCase()));

  if (property === 'background') {
    return (
      mapping?.color &&
      `
			${property}: ${mapping?.color};
			color: ${mapping?.contrastColor};
		`
    );
  } else {
    return mapping?.color && `${property}: ${mapping?.color};`;
  }
};

/*
	icon options for react
	pass in status to return the status icon

	eg: const icons = statusColor(status)
*/
export const statusIcon = (status = 'default', props = {}) => {
  const mapping = find(statusMappings, ({ options }) => options.includes(status.toLowerCase()));
  return mapping?.icon ? React.cloneElement(mapping?.icon, props) : null;
};
