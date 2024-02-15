import BN from 'bn.js';

export const bn = (value) => new BN(value);

export const ONE_BN = bn(1);
export const exponentBN = (base, power) => bn(base).pow(bn(power));