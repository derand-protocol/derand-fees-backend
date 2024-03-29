export const EVM_NETWORKS = {
  // 56: {
  //   rpc_url: "https://rpc.ankr.com/bsc",
  //   coordinator_address: "0x24092A71ae67b6773F6ecdc56a9E153e5C57D2E7",
  //   graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-bsc",
  //   decimals: 18,
  //   coingecko_id: "binancecoin"
  // },
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
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-optimism",
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