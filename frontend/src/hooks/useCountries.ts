import { useQuery } from '@tanstack/react-query';
import {
  fetchAllCountries,
  fetchCountryByCode,
  fetchCountriesByRegion,
  fetchCountrySearchList,
  type CountrySearchItem,
} from '@/services/api';
import { Country } from '@/types/country';

export const useAllCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ['countries', 'all'],
    queryFn: fetchAllCountries,
    staleTime: 3600000,
  });
};

export const useCountry = (code: string | null) => {
  return useQuery<Country, Error>({
    queryKey: ['country', code],
    queryFn: () => fetchCountryByCode(code!),
    enabled: !!code,
    staleTime: 3600000,
  });
};

export const useCountriesByRegion = (region: string | null) => {
  return useQuery<Country[], Error>({
    queryKey: ['countries', 'region', region],
    queryFn: () => fetchCountriesByRegion(region!),
    enabled: !!region,
    staleTime: 3600000,
  });
};

export const useCountrySearchList = () => {
  return useQuery<CountrySearchItem[], Error>({
    queryKey: ['countries', 'search'],
    queryFn: fetchCountrySearchList,
    staleTime: 3600000,
  });
};
