import axios from "axios";

export const getConsumerBalances = async (count = 1000, skip = 0) => {
  const graph_url = "https://api.studio.thegraph.com/query/71642/" + 
  "derand-fee-manager-bsc/version/latest"
  const query = `
    {
      consumerBalances(
        first: ${count}
        skip: ${skip}
      ) {
        consumer
        chainId
        executor
        amount
      }
    }
  `;

  const graph_response = await axios.post(graph_url, {
    query: query
  });

  const {
    data: { data },
    status
  } = graph_response;

  if (status == 200 && data) {
    const {
      consumerBalances,
    } = data;
    return consumerBalances;
  } else {
    console.log(graph_response["data"]["errors"]);
    throw { message: 'INVALID_SUBGRAPH_RESPONSE' };
  }
}