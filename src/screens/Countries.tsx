import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Heading, Container, Image } from "@chakra-ui/react";

import countries from "./countries.json";

export const Countries = () => {
  // @TODO: Add loading state

  return (
    <Container py="10">
      <Heading mb="4">Countries</Heading>
      <Box>
        {countries.map((country) => (
          <Link key={country.Slug} to={`/countries/${country.Slug}`}>
            <Flex
              alignItems="center"
              p="2"
              backgroundColor="gray.50"
              mb="2"
              borderRadius="4"
              _hover={{
                backgroundColor: "gray.100",
              }}
            >
              <Image
                src={`https://www.countryflags.io/${country.ISO2.toLowerCase()}/flat/64.png`}
                boxSize="30px"
                mr="4"
                alt={`${country.Country} flag`}
              />

              <Text fontSize="lg">{country.Country}</Text>
              <Text fontSize="sm" ml="2" color="gray.500">
                ({country.ISO2})
              </Text>
            </Flex>
          </Link>
        ))}
      </Box>
    </Container>
  );
};
