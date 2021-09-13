import { useState, useMemo } from "react";
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
  Select,
  IconButton,
} from "@chakra-ui/react";
import { useLocation, useParams } from "react-router-dom";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";

import { useCountry } from "../hooks/countries";

type LocationState = {
  countryName?: string;
};

type OrderByTypes = "Date" | "DailyCases" | "Cases";

export const CountryCovidCases = () => {
  const location = useLocation<LocationState>();
  const { country: countrySlug } = useParams<{ country: string }>();
  const [orderByKey, setOrderByKey] = useState<OrderByTypes>("Date");
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("ASC");
  const { data: casesByDay, isLoading, isError } = useCountry(countrySlug);

  const countryName =
    location?.state?.countryName || (casesByDay && casesByDay?.[0]?.Country);

  const sortedCases = useMemo(
    () =>
      casesByDay?.sort((a, b) => {
        // Swap elements to change order from ascending to descending
        const [casesByDayA, casesByDayB] =
          orderDirection === "ASC" ? [a, b] : [b, a];

        if (orderByKey === "Cases")
          return casesByDayA.Cases - casesByDayB.Cases;
        if (orderByKey === "DailyCases")
          return casesByDayA.DailyCases - casesByDayB.DailyCases;
        if (orderByKey === "Date")
          return (
            new Date(casesByDayA.Date).getTime() -
            new Date(casesByDayB.Date).getTime()
          );
        return 0;
      }),
    [casesByDay, orderByKey, orderDirection]
  );

  return (
    <Container py="10">
      <Heading mb="4">{countryName}</Heading>
      <Flex direction="column">
        {isLoading ? (
          <Spinner my="12" color="gray.300" alignSelf="center" />
        ) : isError ? (
          <Text>There was an error fetching the country cases information</Text>
        ) : (
          <Flex direction="column">
            <Flex
              mb="6"
              justifyContent="center"
              alignItems="center"
              alignSelf="flex-end"
            >
              <Text whiteSpace="nowrap" mr="2">
                Order by
              </Text>
              <Select
                mr="2"
                value={orderByKey}
                onChange={(e) => setOrderByKey(e.target.value as OrderByTypes)}
                isDisabled={isLoading || isError}
                size="sm"
              >
                <option value="Date">Date</option>
                <option value="DailyCases">New cases</option>
                <option value="Cases">Total cases</option>
              </Select>
              <IconButton
                icon={
                  orderDirection === "ASC" ? (
                    <HiSortAscending />
                  ) : (
                    <HiSortDescending />
                  )
                }
                onClick={() =>
                  setOrderDirection((orderDirection) =>
                    orderDirection === "ASC" ? "DESC" : "ASC"
                  )
                }
                aria-label="Change order direction"
                size="sm"
              />
            </Flex>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th isNumeric>New cases</Th>
                  <Th isNumeric>Total cases</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedCases?.map((dayInformation) => {
                  const formattedDate = new Date(
                    dayInformation.Date
                  ).toLocaleDateString();

                  return (
                    <Tr key={formattedDate}>
                      <Td>{formattedDate}</Td>
                      <Td isNumeric>
                        {new Intl.NumberFormat().format(
                          dayInformation.DailyCases
                        )}
                      </Td>
                      <Td isNumeric>
                        {new Intl.NumberFormat().format(dayInformation.Cases)}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Flex>
        )}
      </Flex>
    </Container>
  );
};
