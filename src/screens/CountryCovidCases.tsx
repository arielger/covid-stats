import * as React from "react";
import {
  Container,
  Flex,
  Spinner,
  Text,
  Heading,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";

import { useCountry } from "../hooks/countries";

type LocationState = {
  countryName?: string;
};

export const CountryCovidCases = () => {
  const location = useLocation<LocationState>();
  const { country: countrySlug } = useParams<{ country: string }>();
  const { data: casesByDay, isLoading, isError } = useCountry(countrySlug);

  const countryName =
    location?.state?.countryName || (casesByDay && casesByDay?.[0]?.Country);

  return (
    <Container py="10">
      <Heading mb="4">{countryName}</Heading>
      <Flex direction="column">
        {isLoading ? (
          <Spinner my="12" color="gray.300" alignSelf="center" />
        ) : isError ? (
          <Text>There was an error fetching the country cases information</Text>
        ) : (
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th isNumeric>Cases</Th>
              </Tr>
            </Thead>
            <Tbody>
              {casesByDay?.map((dayInformation) => {
                const formattedDate = new Date(
                  dayInformation.Date
                ).toLocaleDateString();

                return (
                  <Tr key={formattedDate}>
                    <Td>{formattedDate}</Td>
                    <Td isNumeric>
                      {new Intl.NumberFormat().format(dayInformation.Cases)}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Flex>
    </Container>
  );
};
