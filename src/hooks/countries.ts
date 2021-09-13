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
  DailyCases: number;
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
  return useQuery<CountryDayCases[]>(`country.${countrySlug}`, async () => {
    const countryCases = (await fetchCountryCases(
      countrySlug
    )) as CountryDayCases[];

    // Add a new property to know daily cases (instead of total)
    let casesToDate = 0;
    return countryCases.map((dailyCountryCases) => {
      const result = {
        ...dailyCountryCases,
        DailyCases: dailyCountryCases.Cases - casesToDate,
      };
      casesToDate = dailyCountryCases.Cases;
      return result;
    });
  });
};
