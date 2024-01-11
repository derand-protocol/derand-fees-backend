export const EVM_NETWORKS = {
  80001: {
    rpc_url: "https://rpc.ankr.com/polygon_mumbai",
    coordinator_address: "0x6e3cf66cb5b6F56B2e57849833e02Ac98637eB83",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-mumbai",
    decimals: 18,
    coingecko_id: "matic-network"
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