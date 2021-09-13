import * as React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Text,
  Heading,
  Container,
  Image,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";

import { useCountries } from "../hooks/countries";

export const Countries = () => {
  const { data: countries, isLoading, isError } = useCountries();

  return (
    <Container py="10">
      <Heading mb="4">Countries</Heading>
      <Flex direction="column">
        {isLoading ? (
          <Spinner my="12" color="gray.300" alignSelf="center" />
        ) : isError ? (
          <Text>There was an error fetching the countries list</Text>
        ) : (
          countries?.map((country) => (
            <Link key={country.Slug} to={`/countries/${country.Slug}`}>
              <Flex
                role="group"
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
                <Icon
                  as={BsArrowRightShort}
                  boxSize="6"
                  color="gray.400"
                  ml="auto"
                  _groupHover={{ color: "gray.600" }}
                />
              </Flex>
            </Link>
          ))
        )}
      </Flex>
    </Container>
  );
};
