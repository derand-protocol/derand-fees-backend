export const EVM_NETWORKS = {
  56: {
    rpc_url: "https://rpc.ankr.com/bsc",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-bsc/version/latest",
    decimals: 18,
    coingecko_id: "binancecoin"
  },
  59144: {
    rpc_url: "https://rpc.linea.build",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/21879/derand-linea/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  10: {
    rpc_url: "https://rpc.ankr.com/optimism",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-optimism/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  8453: {
    rpc_url: "https://rpc.ankr.com/base",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-base/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  534352: {
    rpc_url: "https://rpc.scroll.io",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-scroll/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  7001: {
    rpc_url: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://subgraph.satsuma-prod.com/96389a812495/shayans-team--869747/derand-zeta-testnet/api",
    decimals: 18,
    coingecko_id: "zetachain"
  },
  7000: {
    rpc_url: "https://zetachain-evm.blockpi.network/v1/rpc/public",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://subgraph.satsuma-prod.com/96389a812495/shayans-team--869747/derand-zeta/api",
    decimals: 18,
    coingecko_id: "zetachain"
  },
  42161: {
    rpc_url: "https://arbitrum.llamarpc.com",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-arbitrum-one/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  42170: {
    rpc_url: "https://nova.arbitrum.io/rpc",
    coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
    graph_url: "https://api.studio.thegraph.com/query/71642/derand-arbitrum-nova/version/latest",
    decimals: 18,
    coingecko_id: "ethereum"
  }
}

export const FULFILL_LOG_ABI = [
  {
    indexed: true,
    name: "requestId",
    type: "uint256"
  },
  {
    indexed: true,
    name: "consumer",
    type: "address"
  },
  {
    indexed: true,
    name: "executor",
    type: "address"
  },
  {
    indexed: false,
    name: "outputSeed",
    type: "uint256"
  },
  {
    indexed: false,
    name: "success",
    type: "bool"
  }
]