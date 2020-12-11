import React from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { useCountdown } from '@util/hooks';

momentDurationFormatSetup(moment);

export default ({ to, format = 'DD[d] HH[h] mm[m] ss[s]', prefix, className }) => {
  const remaining = useCountdown(to);

  return (
    <span className={className}>
      {to == 0
        ? 'NOT STARTED'
        : prefix +
          (!!remaining && remaining >= 0
            ? moment.duration(remaining, 'seconds').format(format)
            : 'EXPIRED')}
    </span>
  );
};
