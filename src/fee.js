import { EVM_NETWORKS } from "./constants.js";
import axios from 'axios';
import { bn } from "./utils.js";
import Web3 from 'web3';

export const convertWeiToMuon = async (chainId, weiAmount) => {
  const network = EVM_NETWORKS[chainId];

  const coingecko_url = "https://api.coingecko.com/api/v3/simple/price?ids="
  + `${network.coingecko_id}&vs_currencies=usd`;

  const muon_url = "https://app.muon.net/stats/data.json";

  const price_api_ressponses = await Promise.all([
    axios.get(muon_url),
    axios.get(coingecko_url)
  ]);

  const { pion_price } = price_api_ressponses[0].data;

  const {
    [network.coingecko_id]: { usd: token_price }
  } = price_api_ressponses[1].data;
  
  // TOKEN/PION
  const pion_per_token = Web3.utils.toWei(
    token_price/pion_price, "ether"
  );

  const tokenExponent = bn(10).pow(
    bn(network.decimals)
  );
  
  return weiAmount.mul(bn(pion_per_token)).div(tokenExponent);
}