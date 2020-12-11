import Index from './List';
import Row from './Row';
import Name from './Name';
import Symbol from './Symbol';
import Stake from './Stake';
import Unstake from './Unstake';
import Claim from './Claim';
import * as hooks from './_hooks';

export default {
  Index,
  Row,
  Name,
  Symbol,
  Stake,
  Unstake,
  Claim,
  ...hooks,
};
