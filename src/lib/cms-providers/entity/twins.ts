import { GraphQLClient } from 'graphql-request';

const endpoint = "https://graphql.datocms.com/";
const API_TOKEN = process.env.DATOCMS_READ_ONLY_API_TOKEN;

export function fetchCmsEntityAPI(): GraphQLClient {
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      "content-type": "application/json",
      authorization:` Bearer + ${API_TOKEN}` ,
    }
  });

  return graphQLClient;
}