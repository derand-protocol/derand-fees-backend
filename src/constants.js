export const EVM_NETWORKS = {
  80001: {
    rpc_url: "https://rpc.ankr.com/polygon_mumbai",
    coordinator_address: "0x7C7DA3d2a57fb63936fB4824a88Dc7C581c9bA6D",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-mumbai",
    decimals: 18,
    coingecko_id: "matic-network"
  },
  97: {
    rpc_url: "https://bsc-testnet.publicnode.com",
    coordinator_address: "0xc251Ec1ab514Aa8842B4f437b7e5c6cF4abE56Aa",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-bsc-testnet",
    decimals: 18,
    coingecko_id: "binancecoin"
  },
  11155111: {
    rpc_url: "https://rpc.ankr.com/eth_sepolia",
    coordinator_address: "0xcfF6Cd4ddb0AF2f27F670f53018b5099Fd674370",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-sepolia",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  5: {
    rpc_url: "https://rpc.ankr.com/eth_goerli",
    coordinator_address: "0x14157aa3B1aA584813c41511B3A34CD40774665E",
    graph_url: "https://api.thegraph.com/subgraphs/name/shayanshiravani/derand-goerli",
    decimals: 18,
    coingecko_id: "ethereum"
  },
  43113: {
    rpc_url: "https://rpc.ankr.com/avalanche_fuji",
    coordinator_address: "0xd8108Dc8d8675c84c8E7377Fc790E188c05f07A0",
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