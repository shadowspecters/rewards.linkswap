import { useState, useEffect } from 'react';

const _rates = {};

const coinGeckoMapper = {
  weth: 'ethereum',
  link: 'chainlink',
  yfl: 'yflink',
  dpi: 'defipulse-index',
  busd: 'binance-usd',
  masq: 'masq',
  gswap: 'gameswap-org',
  usdc: 'usd-coin',
  usdt: 'tether',
  cel: 'celsius-degree-token',
  yax: 'yaxis',
};

const useRate = (from, to) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (!!from && !!to) {
      const _rate = _rates[`${from}_${to}`];

      if (from === 'masq') {
        setRate(-1);
      } else if (!_rate) {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinGeckoMapper[from]}`)
          .then((r) => r.json())
          .then(({ market_data }) => {
            if (market_data?.current_price) {
              const { current_price } = market_data;
              let result = current_price.usd;
              _rates[`${from}_${to}`] = result;
              setRate(result);
            } else {
              setRate(0);
            }
          });
      } else {
        setRate(_rate);
      }
    }
  }, [from, to]);

  return rate;
};

export const useConversion = (amount, from, to) => {
  const rate = useRate(from?.toLowerCase(), to?.toLowerCase());

  return amount * rate;
};
