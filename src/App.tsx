import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { Router } from "./Router";

import { AuthProvider } from "./modules/auth";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
