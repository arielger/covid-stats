import { useQuery } from "react-query";

import { fetchCountries } from "../api";

type Country = {
  Country: string;
  Slug: string;
  ISO2: string;
};

export const useCountries = () => {
  return useQuery<Country[]>("countries", async () => {
    const countries: Country[] = await fetchCountries();

    // Sort countries list alphabetically
    return countries.sort((countryA, countryB) => {
      if (countryA.Country < countryB.Country) {
        return -1;
      }
      if (countryA.Country > countryB.Country) {
        return 1;
      }
      return 0;
    });
  });
};
