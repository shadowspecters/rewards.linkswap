import { useState, useEffect } from 'react';
import AppStore from '@app/App.Store';
import { ERC20 } from '@util/contracts';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
const maxWei = '1000000000000000000000000000';

const Status = {
  PENDING: 'PENDING',
  UNAPPROVED: 'UNAPPROVED',
  APPROVED: 'APPROVED',
};

export const useApproval = (tokenAddress, contractAddress) => {
  const appStore = AppStore();
  const [status, setStatus] = useState(Status.PENDING);
  const [accountAddress, setAccountAddress] = useState();

  useEffect(() => {
    const sub = appStore.subscribe('account.address', setAccountAddress);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    accountAddress && checkAllowance();
  }, [accountAddress]);

  const getContract = async () => {
    if (!tokenAddress) throw new Error('Contract Address is not set');
    return await new web3.eth.Contract(ERC20, tokenAddress);
  };

  const checkAllowance = async () => {
    try {
      const contract = await getContract();
      const allowance = await contract.methods.allowance(accountAddress, contractAddress).call();
      const balance = await contract.methods.balanceOf(accountAddress).call();
      setStatus(+allowance > +balance ? Status.APPROVED : Status.UNAPPROVED);
    } catch (e) {
      setStatus(Status.UNAPPROVED);
    }
  };

  const approve = async () => {
    setStatus(Status.PENDING);
    try {
      const contract = await getContract();
      const approvalAmount = maxWei;
      await contract.methods
        .approve(contractAddress, approvalAmount)
        .send({ from: accountAddress });
      setStatus(Status.APPROVED);
    } catch (e) {
      setStatus(Status.UNAPPROVED);
    }
  };

  const unapprove = async () => {
    try {
      await approve(0);
      setStatus(Status.UNAPPROVED);
    } catch (e) {
      setStatus(Status.APPROVED);
    }
  };

  return {
    status,
    approve,
    unapprove,
  };
};
