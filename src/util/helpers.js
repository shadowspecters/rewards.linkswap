import Web3 from 'web3';
import moment from 'moment';
import BigNumber from 'bignumber.js';

export const JSONCycle = (object = {}, replacer) => {
  const objects = new WeakMap();

  return (function derez(value, path) {
    var old_path;
    var nu;

    if (replacer !== undefined) {
      value = replacer(value);
    }

    if (
      typeof value === 'object' &&
      value !== null &&
      !(value instanceof Boolean) &&
      !(value instanceof Date) &&
      !(value instanceof Number) &&
      !(value instanceof RegExp) &&
      !(value instanceof String)
    ) {
      old_path = objects.get(value);
      if (old_path !== undefined) {
        return { $ref: old_path };
      }

      objects.set(value, path);

      if (Array.isArray(value)) {
        nu = [];
        value.forEach(function (element, i) {
          nu[i] = derez(element, path + '[' + i + ']');
        });
      } else {
        nu = {};
        Object.keys(value).forEach(function (name) {
          nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
        });
      }
      return nu;
    }
    return value;
  })(object, '$');
};

export const BN = (n = 0) => new BigNumber(n);

export const truncateString = (str = '', start = 6, end = 4) =>
  str ? `${str.substring(0, start)}...${str.substring(str.length - end)}` : null;

export const units = {
  fromWei: (amount = 0, unit = 'ether') => Web3.utils.fromWei(amount.toString(), unit),
  toWei: (amount = 0, unit = 'ether') =>
    !!amount ? Web3.utils.toWei(amount.toString(), unit) : amount,
};

export const format = {
  duration: (val, format = 'milliseconds') =>
    val ? moment.duration(val, 'milliseconds').humanize() : null,
  commas: (val) => new Intl.NumberFormat().format(val),
  decimals: (value, dp = 2) => +parseFloat(value).toFixed(dp),
  currency: (val = 0, props = {}) =>
    Intl.NumberFormat(props.locale || 'en-US', {
      style: 'currency',
      currency: props.currency || 'USD',
      currencyDisplay: 'symbol',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(val || 0),
  maxDB: (value = 0, dp = 2) => +parseFloat(+value).toFixed(dp),
};
