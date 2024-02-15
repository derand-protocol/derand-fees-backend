export const EVM_NETWORKS = {
  80001: {
    rpc_url: "https://rpc.ankr.com/polygon_mumbai",
    coordinator_address: "0x3abAAD56d723b0aBEC11d5e8a2F1918AaaFbf698",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-mumbai",
    decimals: 18,
    coingecko_id: "matic-network"
  },
  97: {
    rpc_url: "https://bsc-testnet.publicnode.com",
    coordinator_address: "0x78208AfF3976165feF81EE46DEE50eb72cf24834",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-bsc-testnet",
    decimals: 18,
    coingecko_id: "binancecoin"
  },
  11155111: {
    rpc_url: "https://rpc.ankr.com/eth_sepolia",
    coordinator_address: "0xa7b7A5ACB18825a2599156FEa1FA98f4ebD292C2",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-sepolia",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  5: {
    rpc_url: "https://rpc.ankr.com/eth_goerli",
    coordinator_address: "0xe8E36D3FbB933f4aa45ED0B1c3D8Ae942535a529",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-goerli",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  43113: {
    rpc_url: "https://rpc.ankr.com/avalanche_fuji",
    coordinator_address: "0xB01496ed0171dc66aB743B4604671D57c00C6182",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-avalanche-fuji",
    decimals: 18,
    coingecko_id: "avalanche-2"
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