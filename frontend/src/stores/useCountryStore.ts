import { create } from 'zustand';
import { Country } from '@/types/country';

interface CountryStore {
  selectedCountry: Country | null;
  comparedCountries: Country[];
  setSelectedCountry: (country: Country | null) => void;
  addComparedCountry: (country: Country) => void;
  removeComparedCountry: (country: Country) => void;
  clearComparison: () => void;
}

export const useCountryStore = create<CountryStore>(set => ({
  selectedCountry: null,
  comparedCountries: [],
  setSelectedCountry: country => set({ selectedCountry: country }),
  addComparedCountry: country =>
    set(state => ({
      comparedCountries:
        state.comparedCountries.length < 2
          ? [...state.comparedCountries, country]
          : state.comparedCountries,
    })),
  removeComparedCountry: country =>
    set(state => ({
      comparedCountries: state.comparedCountries.filter(
        c => c.cca3 !== country.cca3
      ),
    })),
  clearComparison: () => set({ comparedCountries: [] }),
}));
