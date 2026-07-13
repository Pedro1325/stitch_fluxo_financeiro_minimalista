import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * ============================================================================
 *  PONTO DE INTEGRAÇÃO COM A API — é aqui que a URL do backend entra.
 * ============================================================================
 *
 * TODO(BACKEND): quando a API .NET + HotChocolate (README, passo 8) existir,
 * crie um arquivo `frontend/.env` (não versionado — veja .env.example) com:
 *
 *   VITE_GRAPHQL_ENDPOINT=http://localhost:5000/graphql
 *
 * Até lá, todas as páginas usam dados mockados em `src/mocks/` e este
 * client não é chamado por ninguém. Para ligar uma página na API real:
 *   1. Escreva a query/mutation em `src/graphql/queries` ou `mutations`;
 *   2. Troque o `import { ... } from "../../mocks/financialData"` da
 *      página por `useQuery(A_QUERY)` (de "@apollo/client/react");
 *   3. Remova o mock que não for mais usado.
 */
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT ?? "http://localhost:5000/graphql",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
