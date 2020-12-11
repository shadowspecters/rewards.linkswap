import React, { useState, useEffect } from 'react';
import { Status } from '@components';
import { truncateString } from '@util/helpers';
import AppStore from '@app/App.Store';
import { ReactComponent as Logo } from '@logo/yflink.svg';
import { ReactComponent as IconSuccess } from '@icon/check_outline.svg';
import { ReactComponent as IconWarning } from '@icon/warning_outline.svg';
import { ReactComponent as IconArrow } from '@icon/arrow_right.svg';

const Component = ({ status, message, error, hash, info, ...props }) => {
  const { state } = AppStore();

  const [visible, setVisible] = useState(false);
  const [icon, setIcon] = useState();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [_hash, setHash] = useState();

  useEffect(() => {
    setVisible(status !== 'INITIALIZED');

    //icon
    switch (status) {
      case 'UNCONFIRMED':
        setIcon(<Logo animate="logospin" />);
        setTitle(message);
        setText(info);
        setHash(hash);
        break;
      case 'SUCCESS':
        setIcon(<IconSuccess />);
        setTitle(message);
        setText(info);
        setHash(hash);
        break;
      case 'ERROR':
        setIcon(<IconWarning />);
        setTitle(message);
        setText(truncateString(error, 26, 0));
        setHash(hash);
        break;
      case 'INITIALIZED':
      default:
        setIcon(null);
        setTitle(null);
        setText(null);
        setHash(null);
        break;
    }
  }, [status, message, error, hash, info]);

  return visible === true ? (
    <Status
      className="transaction-status"
      icon={icon}
      title={title}
      info={text}
      link={
        _hash && (
          <a href={`${state?.network?.preview_url}/tx/${_hash}`} target="_blank" rel="noreferrer">
            View transaction
            <IconArrow style={{ verticalAlign: 'bottom' }} />
          </a>
        )
      }
      {...props}
    />
  ) : null;
};

export default Component;
