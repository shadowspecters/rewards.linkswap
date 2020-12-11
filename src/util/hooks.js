import { useState, useEffect } from 'react';
import moment from 'moment';

export const useBit = (initial = false) => {
  const [bit, setBit] = useState(initial);

  const flipBit = () => {
    setBit(!bit);
  };

  return [bit, flipBit];
};

export const useMounted = () => {
  const [val, set] = useState(false);
  useEffect(() => {
    setTimeout(() => set(true), Math.floor(Math.random() * 300) + 1);
  }, []);
  return val;
};

export const useCountdown = (to) => {
  const [val, set] = useState(false);

  let then = null;

  const calc = () => {
    set(moment(then - moment()).unix());
  };

  useEffect(() => {
    then = moment.unix(to);
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [to]);

  return val;
};

export const useCounter = (val = 0) => {
  const [count, setCount] = useState(val);
  const increment = () => setCount((state) => state + 1);
  const decrement = () => setCount((state) => state - 1);

  return {
    count,
    increment,
    decrement,
  };
};
