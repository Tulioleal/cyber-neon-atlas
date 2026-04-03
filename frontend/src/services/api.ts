import { Country } from '@/types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,capital,currencies,alpha,cca3`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  return response.json();
};

export const fetchCountryByCode = async (code: string): Promise<Country> => {
  const response = await fetch(`${BASE_URL}/alpha/${code}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch country: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
};

export const fetchCountriesByRegion = async (
  region: string
): Promise<Country[]> => {
  const response = await fetch(`${BASE_URL}/region/${region}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch countries by region: ${response.statusText}`);
  }

  return response.json();
};
