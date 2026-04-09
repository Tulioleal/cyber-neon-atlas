import { Country } from '@/types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,borders,cca3,population,flags,area,region,capitalinfo,languages,currencies`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch countries: ${response.statusText}`);
  }

  return response.json();
};

export interface CountrySearchItem {
  name: { common: string };
  cca3: string;
}

export const fetchCountrySearchList = async (): Promise<
  CountrySearchItem[]
> => {
  const response = await fetch(`${BASE_URL}/all?fields=name,cca3`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch country search list: ${response.statusText}`
    );
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
    throw new Error(
      `Failed to fetch countries by region: ${response.statusText}`
    );
  }

  return response.json();
};

export const fetchCountriesByCodes = async (
  codes: string[]
): Promise<CountrySearchItem[]> => {
  if (!codes || codes.length === 0) return [];

  const response = await fetch(
    `${BASE_URL}/alpha?codes=${codes.join(',')}&fields=name,cca3`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch countries by codes: ${response.statusText}`
    );
  }

  return response.json();
};
