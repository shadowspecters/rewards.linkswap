import { useState, useEffect, useMemo } from 'react';
import AppStore from '@app/App.Store';

export const useConnected = () => {
  const { state, subscribe } = AppStore();
  const [connected, setConnected] = useState(state.account?.status === 'CONNECTED');

  useEffect(() => {
    let sub = subscribe(`account.status`, (status) => {
      setConnected(status === 'CONNECTED');
    });
    return () => sub.unsubscribe();
  }, []); // eslint-disable-line

  return useMemo(() => connected, [connected]);
};
