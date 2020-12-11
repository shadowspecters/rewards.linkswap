import React, { Fragment, useState, useEffect } from 'react';
import { Token } from '@archetypes';
import { Button } from '@components';
import { useCounter } from '@util/hooks';
import { ReactComponent as IconSuccess } from '@icon/check_outline.svg';

const ApprovalButton = ({ token, contract, onApproved }) => {
  const {
    status,
    approve,
    //unapprove
  } = Token.useApproval(token, contract);

  useEffect(() => {
    if (status === 'APPROVED') {
      onApproved();
    }
  }, [status]);

  return (
    <Button
      disabled={status === 'APPROVED'}
      loading={status === 'PENDING'}
      status="success"
      onClick={approve}
    >
      {status === 'APPROVED' ? (
        <Fragment>
          Approved <IconSuccess />
        </Fragment>
      ) : status === 'PENDING' ? (
        'Approving'
      ) : (
        'Approve'
      )}
    </Button>
  );
};

export default ({ name = 'Confirm', approvals = [], status, onSubmit = () => {} }) => {
  const { count, increment } = useCounter(0);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    setApproved(count === approvals.length);
  }, [count]);

  return (
    <Fragment>
      {approvals.map((approval) => (
        <ApprovalButton {...approval} onApproved={increment} />
      ))}

      <Button
        disabled={!approved}
        loading={['UNCONFIRMED'].includes(status)}
        status="neutral"
        onClick={onSubmit}
      >
        {name}
      </Button>
    </Fragment>
  );
};
