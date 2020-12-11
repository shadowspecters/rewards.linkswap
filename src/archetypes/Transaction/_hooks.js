import React, { useState, useEffect } from 'react';
import { Transaction } from '@archetypes';
import AppStore from '@app/App.Store';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

const State = {
  INITIALIZED: {
    status: 'INITIALIZED',
    message: null,
  },
  UNAPPROVED: {
    status: 'UNAPPROVED',
    message: 'Waiting for approval',
  },
  UNCONFIRMED: {
    status: 'UNCONFIRMED',
    message: 'Waiting for confirmation',
  },
  SUCCESS: {
    status: 'SUCCESS',
    message: 'Transaction success',
  },
  ERROR: {
    status: 'ERROR',
    message: 'Transaction error',
  },
};

export const useTokenTransaction = ({
  abi,
  address,
  method,
  params = [],
  controls,
  txMessage,
  onSuccess = () => {},
}) => {
  const appStore = AppStore();

  const [sender, setSender] = useState(appStore.state?.account?.address);
  const [status, setStatus] = useState(State.INITIALIZED);
  const [message, setMessage] = useState();
  const [error, setError] = useState();
  const [hash, setHash] = useState();
  const [_controls, setControls] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [_params, setParams] = useState({});

  // get sender address on init
  useEffect(() => {
    const sub = appStore.subscribe('account.address', setSender);
    return () => sub.unsubscribe();
  }, []);

  // define controls
  useEffect(() => {
    setControls(
      <Transaction.Controls
        {...controls}
        status={status.status}
        onSubmit={() => execute(_params)}
      />,
    );
  }, [status, _params]);

  // define status message
  useEffect(() => {
    setStatusMessage(
      <Transaction.Status
        status={status}
        message={message}
        error={error}
        hash={hash}
        info={txMessage(_params)}
      />,
    );
  }, [status, message, error, hash]);

  const setState = (state) => {
    setStatus(state?.status);
    setMessage(state?.message);
  };

  const setParam = (key, value) => {
    if (params.includes(key)) {
      setParams((state) => {
        state[key] = value;
        return { ...state };
      });
    }
  };

  const getContract = async () => {
    if (!abi) throw new Error('Contract ABI is not set');
    if (!address) throw new Error('Contract Address is not set');
    if (!sender) throw new Error('Sender address is not set');
    return new web3.eth.Contract(abi, address);
  };

  const execute = async (aaa) => {
    try {
      const contract = await getContract();
      setState(State.UNCONFIRMED);

      const paramArray = params.map((_p) => _params[_p]);
      const tx = contract.methods[method](...paramArray);
      await tx.call({ from: sender });
      const transaction = await tx.send({ from: sender }).on('transactionHash', setHash);

      // status & hash
      setState(State.SUCCESS);
      setHash(transaction.transactionHash);
      onSuccess();
    } catch (e) {
      setState(State.ERROR);
      setError(e.message);
    }
  };

  return {
    status,
    message,
    error,
    hash,
    execute,
    controls: _controls,
    statusMessage,
    params: _params,
    setParam,
  };
};
