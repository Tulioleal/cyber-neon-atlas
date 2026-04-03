import { useMemo } from 'react';
import { useAllCountries } from '@/hooks/useCountries';
import { useFilterStore } from '@/stores/useFilterStore';
import { Country } from '@/types/country';

export function useFilteredCountries(): { countries: Country[]; isLoading: boolean; error: Error | null } {
  const { data: allCountries, isLoading, error } = useAllCountries();
  const { regions, subregion, languages, currencies } = useFilterStore();

  const filteredCountries = useMemo(() => {
    if (!allCountries) return [];

    return allCountries.filter((country) => {
      if (regions.length > 0) {
        if (!country.region || !regions.includes(country.region)) {
          return false;
        }
      }

      if (subregion) {
        if (country.subregion !== subregion) {
          return false;
        }
      }

      if (languages.length > 0) {
        const countryLanguages = country.languages ? Object.keys(country.languages) : [];
        const hasMatchingLanguage = languages.some((lang) => countryLanguages.includes(lang));
        if (!hasMatchingLanguage) {
          return false;
        }
      }

      if (currencies.length > 0) {
        const countryCurrencies = country.currencies ? Object.keys(country.currencies) : [];
        const hasMatchingCurrency = currencies.some((cur) => countryCurrencies.includes(cur));
        if (!hasMatchingCurrency) {
          return false;
        }
      }

      return true;
    });
  }, [allCountries, regions, subregion, languages, currencies]);

  return { countries: filteredCountries, isLoading, error };
}