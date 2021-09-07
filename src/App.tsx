import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

export const App = () => (
  <ChakraProvider theme={theme}>
    <h1>Covid stats</h1>
  </ChakraProvider>
)
