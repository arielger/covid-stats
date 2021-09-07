import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import { Router } from "./Router";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
)
