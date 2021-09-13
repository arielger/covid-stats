import { useQuery } from "react-query";

import { fetchCountries, fetchCountryCases } from "../api";

type Country = {
  Country: string;
  Slug: string;
  ISO2: string;
};

type CountryDayCases = {
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: number;
  Status: string;
  Date: string;
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

export const useCountry = (countrySlug: string) => {
  return useQuery<CountryDayCases[]>(`country.${countrySlug}`, () =>
    fetchCountryCases(countrySlug)
  );
};
