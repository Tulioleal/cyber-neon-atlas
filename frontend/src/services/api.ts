import { Country } from '@/types/country';

const BASE_URL = 'https://restcountries.com/v4';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchAllCountries(): Promise<Country[]> {
  return fetchWithErrorHandling<Country[]>(`${BASE_URL}/all?fields=name,cca2,cca3,flags,maps,population,area,region,subregion,capital,continents,tld,idd,capitalInfo`);
}

export async function fetchCountryByCode(code: string): Promise<Country | Country[]> {
  const data = await fetchWithErrorHandling<Country | Country[]>(`${BASE_URL}/alpha/${code}`);
  return data;
}

export async function fetchByRegion(region: string): Promise<Country[]> {
  return fetchWithErrorHandling<Country[]>(`${BASE_URL}/region/${region}`);
}
