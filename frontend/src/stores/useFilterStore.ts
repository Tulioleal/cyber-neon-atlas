import { create } from 'zustand';
import { Country } from '@/types/country';

export interface FilterState {
  regions: string[];
  subregion: string | null;
  languages: string[];
  currencies: string[];
  filteredCountries: Country[];
  setRegions: (regions: string[]) => void;
  setSubregion: (subregion: string | null) => void;
  toggleLanguage: (language: string) => void;
  toggleCurrency: (currency: string) => void;
  setFilteredCountries: (countries: Country[]) => void;
  resetFilters: () => void;
  hasActiveFilters: () => boolean;
}

const initialState = {
  regions: [],
  subregion: null,
  languages: [],
  currencies: [],
  filteredCountries: [],
};

export const useFilterStore = create<FilterState>((set, get) => ({
  ...initialState,
  setRegions: (regions) => set({ regions }),
  setSubregion: (subregion) => set({ subregion }),
  toggleLanguage: (language) => set((state) => {
    const exists = state.languages.includes(language);
    return {
      languages: exists
        ? state.languages.filter((l) => l !== language)
        : [...state.languages, language],
    };
  }),
  toggleCurrency: (currency) => set((state) => {
    const exists = state.currencies.includes(currency);
    return {
      currencies: exists
        ? state.currencies.filter((c) => c !== currency)
        : [...state.currencies, currency],
    };
  }),
  setFilteredCountries: (countries) => set({ filteredCountries: countries }),
  resetFilters: () => set(initialState),
  hasActiveFilters: () => {
    const state = get();
    return (
      state.regions.length > 0 ||
      state.subregion !== null ||
      state.languages.length > 0 ||
      state.currencies.length > 0
    );
  },
}));
